import psycopg2

def get_product_on_the_cart():

    id_product_allowed = [0, 1, 2, 3]

    connection = psycopg2.connect(

        host="localhost",
        database="data_base_ecommerce",
        user="admin",
        password="admin"
    )

    cursor = connection.cursor()

    select_query = "SELECT id_product FROM cart;"

    cursor.execute(select_query)

    rows = cursor.fetchall()
    all_items_organized = []
    for row in rows:

        if row[0] in id_product_allowed:
            all_items_organized += [row[0]]

    cursor.close()
    connection.close()

    return(all_items_organized)


def insert_product(id_product):

    id_product_allowed = [0, 1, 2, 3]
    
    if(id_product in id_product_allowed ):
        connection = psycopg2.connect(

            host="localhost",
            database="data_base_ecommerce",
            user="admin",
            password="admin"
        )

        cursor = connection.cursor()


        insert_query = """
            INSERT INTO cart (id_product)
            VALUES (%s);
        """


        data = (id_product,)
        cursor.execute(insert_query, data)
        connection.commit()
        cursor.close()
        connection.close()    


def delete_product(id_product):
    connection = psycopg2.connect(

        host="localhost",
        database="data_base_ecommerce",
        user="admin",
        password="admin"
    )

    cursor = connection.cursor()

    delete_query = """
        WITH cte AS (
            SELECT id
            FROM cart
            WHERE id_product = %s
            LIMIT 1
        )
        DELETE FROM cart
        WHERE id IN (SELECT id FROM cte);
    """

    cart_id_to_delete = (id_product,)

    cursor.execute(delete_query, cart_id_to_delete)

    connection.commit()

    cursor.close()
    connection.close()    