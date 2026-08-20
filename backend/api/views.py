import os
import pickle

from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404

@api_view(["GET"])
def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    serializer = ProductSerializer(product)

    return Response(serializer.data)


@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def predict_review(request):
    review_text = request.data.get("review")

    if not review_text:
        return Response(
            {"error": "Review text is required."},
            status=400
        )

    model_path = os.path.join(
        settings.BASE_DIR,
        "ml_model",
        "model.pkl"
    )

    vectorizer_path = os.path.join(
        settings.BASE_DIR,
        "ml_model",
        "vectorizer.pkl"
    )

    with open(model_path, "rb") as f:
        model = pickle.load(f)

    with open(vectorizer_path, "rb") as f:
        vectorizer = pickle.load(f)

    text_vector = vectorizer.transform([review_text])
    prediction = model.predict(text_vector)[0]

    if prediction == 0:
        result = "Fake Review ❌"
    else:
        result = "Genuine Review ✅"

    return Response({
        "review": review_text,
        "prediction": result
    })
    
    