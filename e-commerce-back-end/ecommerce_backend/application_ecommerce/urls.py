from django.urls import path
from .views import get_cart, add_product, delete_item, finish_order

urlpatterns = [
    path('cart/', get_cart),
    path('add_item/<int:num>/', add_product),
    path('delete_item/<int:num>/', delete_item),
    path('finishorder/', finish_order)
]