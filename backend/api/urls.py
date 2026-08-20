from django.urls import path
from .views import product_list, product_detail, predict_review

urlpatterns = [
    path("products/", product_list),
    path("products/<int:product_id>/", product_detail),
    path("predict/", predict_review),
]