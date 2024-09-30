from rest_framework.decorators import api_view
from rest_framework.response import Response
from .data_base import get_product_on_the_cart, insert_product, delete_product
from pprint import pprint

@api_view(['GET'])
def get_cart(request):
    products_on_the_cart = get_product_on_the_cart()

    return Response( products_on_the_cart )



@api_view(['POST'])
def add_product(request, num):
    insert_product(num)
    products_on_the_cart = get_product_on_the_cart()
    return Response( products_on_the_cart )



@api_view(['DELETE'])
def delete_item(request, num):
    delete_product(num)
    products_on_the_cart = get_product_on_the_cart()
    return Response( products_on_the_cart )


@api_view(['DELETE'])
def finish_order(request):
    products_on_the_cart = get_product_on_the_cart()
    for item in products_on_the_cart:
        delete_product(item)

    products_on_the_cart = get_product_on_the_cart()
    return Response( products_on_the_cart )
