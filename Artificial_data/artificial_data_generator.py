from random import random
from random import seed
from datetime import datetime
import pandas as pd

seed(42)

def get_date():
    date_now = datetime.now()
    return date_now.strftime("%x")

def get_magnitude(min_magnitude, max_magnitude):
    return (min_magnitude + random() * (max_magnitude - min_magnitude))

def get_latitude():
    return randint(-180, 180)

def get_longitude():
    return randint(-180, 180)

n_rows = 100
data = dict()
data["Lat"] = []
data["Long"] = []
data["Magnitude"] = []
data["Date"] = []

for _ in range(n_rows):
    data["Magnitude"].append(get_magnitude(0, 10))
    data["Lat"].append(get_magnitude(0, 10))
    data["Long"].append(get_magnitude(0, 10))
    data["Date"].append(get_date())

df = pd.DataFrame(data)

df.to_csv("artificial_moonquakes.csv", index = False)


