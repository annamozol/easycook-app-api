const recipes = [
    {
        "id": 1,
        "title": "Spaghetti Bolognese",
        "time_minutes": 40,
        "price": "20.00",
        "link": "example.com/spaghetti-bolognese",
        "tags": [
            {
                "id": 1,
                "name": "dinner"
            }
        ],
        "ingredients": [
            {
                "id": 1,
                "name": "spaghetti",
                "quantity": 180,
                "measurement": "grams"
            }
        ],
        "description": "Recipe steps of a classic Italian pasta dish with rich, meaty sauce.",
        "image": "/images/Spaghetti_Bolognese.jpg"
    },
    {
        "id": 2,
        "title": "Pasta Primavera",
        "time_minutes": 30,
        "price": "18.00",
        "link": "example.com/pasta-primavera",
        "tags": [
            {
                "id": 2,
                "name": "lunch"
            }
        ],
        "ingredients": [
            {
                "id": 2,
                "name": "pasta",
                "quantity": 150,
                "measurement": "grams"
            },
            {
                "id": 3,
                "name": "mixed vegetables",
                "quantity": 100,
                "measurement": "grams"
            }
        ],
        "description": "A light and fresh pasta dish with seasonal vegetables and a hint of garlic.",
        "image": "/images/PastaPrimavera.jpg"
    }
]

export default recipes;
