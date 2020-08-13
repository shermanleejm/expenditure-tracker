import json 
from random import randrange

result = []
items_and_categories = {
    "Food": ["Lasagne", "Maccas", "KFC", "2 Man Bagel House"],
    "Keyboard": ["Holy Pandas Switches", "Enjoy PBT keycaps", "GK61", "Gateron Browns"],
    "Electronic Devices": [
        "iPad",
        "iPhone",
        "Macbook Pro 16-inch",
        "Surface",
        "Google Pixel 4a",
    ],
    "Pets": ["treats", "food", "toys"],
    "Household": ["douche", "trash bags", "kleenex"],
    "Transport": ["gas", "ez-link"],
    "Personal Care": ["therapy"],
    "Insurance": ["health", "car", "house"],
    "Clothing": ["END", "ASOS", "Zalora", "Champion", "Supreme"],
    "Medical": ["drugs"],
    "Others": ["others", "rent-a-family"],
}
day = 1
month = 1
year = 2020
amountToSpend = randrange(3800, 4200, 10)

# For 1 year
for i in range(365):

    if day < 10:
        dayString = "0" + str(day)
    else:
        dayString = str(day)

    if month < 10:
        monthString = "0" + str(month)
    else:
        monthString = str(month)

    date = f"{str(year)}-{monthString}-{dayString}"
    
    # add salary
    if day == 1:
        result.append(
            {
                "amount": 10000,
                "category": "Salary",
                "itemName": "salary",
                "transactionType": "debit",
                "date": date,
            }
        )

    # decide how many transactions in a day
    for i in range(randrange(1, 6)):
        # choose random category
        category = list(items_and_categories.keys())[
            randrange(len(items_and_categories))
        ]

        item = items_and_categories[category][
            randrange(len(items_and_categories[category]))
        ]

        if amountToSpend > 10:
            amount = randrange(10, 100)
            amountToSpend -= amount

            result.append(
                {
                    "amount": amount,
                    "category": category,
                    "itemName": item,
                    "transactionType": "credit",
                    "date": date,
                }
            )
            # print (result[-1])

    # reset day if need
    if month == 2 and day > 28:
        day = 1
        month = 3
        amountToSpend = randrange(3000, 4200, 10)
    elif month in [1, 3, 5, 7, 8, 10, 12] and day > 31:
        month += 1
        day = 1
        amountToSpend = randrange(3000, 4200, 10)
    elif month in [4, 6, 9, 11] and day > 30:
        month += 1
        day = 1
        amountToSpend = randrange(3000, 4200, 10)
    else:
        day += 1

print (len(result))

with open("./src/test/sample_data.json", "w+") as fp:
    json.dump(result, fp, indent=2)