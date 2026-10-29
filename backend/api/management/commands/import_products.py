
import csv
import os
from decimal import Decimal, InvalidOperation
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import connection, transaction

from api.models import Product


class Command(BaseCommand):
    help = "Safely import sample products into production PostgreSQL."

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str)
        parser.add_argument("--confirm-production", action="store_true")
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        if not options["confirm_production"]:
            raise CommandError(
                "Add --confirm-production only after verifying the target database."
            )

        if not os.environ.get("DATABASE_URL"):
            raise CommandError(
                "DATABASE_URL is missing. Import cancelled."
            )

        if connection.vendor != "postgresql":
            raise CommandError(
                "Target is not PostgreSQL. Import cancelled for safety."
            )

        self.stdout.write(
            f"Database vendor: {connection.vendor}\n"
            f"Database name: {connection.settings_dict.get('NAME')}\n"
            f"Database host: {connection.settings_dict.get('HOST')}"
        )

        csv_path = Path(options["csv_file"])
        if not csv_path.is_file():
            raise CommandError(f"CSV file not found: {csv_path}")

        required = {"name", "description", "price", "category"}
        products = []
        seen_names = set()

        with csv_path.open("r", encoding="utf-8-sig", newline="") as file:
            reader = csv.DictReader(file)

            if not reader.fieldnames or not required.issubset(reader.fieldnames):
                raise CommandError(
                    "CSV must contain: name, description, price, category."
                )

            for line_number, row in enumerate(reader, start=2):
                name = (row.get("name") or "").strip()
                if not name:
                    raise CommandError(
                        f"Missing product name on CSV line {line_number}."
                    )

                try:
                    price = Decimal((row.get("price") or "").strip())
                    if not price.is_finite() or price < 0:
                        raise InvalidOperation
                except InvalidOperation:
                    raise CommandError(
                        f"Invalid price on CSV line {line_number}."
                    )

                key = name.casefold()
                if key in seen_names:
                    continue
                seen_names.add(key)

                products.append({
                    "name": name,
                    "description": (row.get("description") or "").strip(),
                    "price": price,
                    "category": (row.get("category") or "").strip(),
                    "image": (row.get("image") or "").strip(),
                })

        existing = set(
            Product.objects.filter(
                name__in=[p["name"] for p in products]
            ).values_list("name", flat=True)
        )

        # Compare names without case sensitivity too.
        existing_lower = {name.casefold() for name in existing}
        new_products = [
            p for p in products
            if p["name"].casefold() not in existing_lower
        ]

        self.stdout.write(f"CSV products: {len(products)}")
        self.stdout.write(f"Already present: {len(products) - len(new_products)}")
        self.stdout.write(f"New products to add: {len(new_products)}")

        if options["dry_run"]:
            self.stdout.write(self.style.WARNING(
                "DRY RUN: no database records were created."
            ))
            return

        with transaction.atomic():
            for product in new_products:
                Product.objects.create(**product)

        self.stdout.write(self.style.SUCCESS(
            f"Import complete. Added {len(new_products)} products."
        ))
