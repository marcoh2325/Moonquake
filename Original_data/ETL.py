#Extraction Transform and Load

import pandas as pd
import datetime

#January, February, March, April, May, June, July, August, September, October, November, December
def get_day_month(year, day):
    """
    Gets the number of day and month given a the day of the year
    inputs: year, day of the year
    returns: year, month, day
    """
    days_per_month = list([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])

    if(year % 400 == 0):
        days_per_month[1] += 1
    elif(year % 100 != 0 and year % 4 == 0):
        days_per_month[1] += 1
    for i in range(len(days_per_month)):
        if(day > days_per_month[i]):
            day -= days_per_month[i]
        else:
            month = i + 1
    return (year, month, day)

"""Code to clean nakamura_1979_sm_locations.csv data"""
df = pd.read_csv("nakamura_1979_sm_locations.csv")
df.drop("Comments", axis = 1, inplace=True)

dates = []

for i in df.index:
    year, month, day = get_day_month(df['Year'][i], df['Day'][i])
    date_event = datetime.datetime(year, month, day, df['H'][i], df['M'][i], df['S'][i])
    dates.append(date_event.strftime("%d/%m/%Y"))

df["Dates"] = dates
df.drop(['Year', 'Day', 'H', 'M', 'S'], axis = 1, inplace = True)

#There is not nan values in columns: Dates, Magnitude
#There is one row with nan values on Lat and Long
#print(df.isna().sum())

df = df.dropna()
df.to_csv("nakamura_1979_sm_locations_cleaned.csv", index = False)

"""Code to clean nakamura_1983_ai_locations.csv"""
df = pd.read_csv("nakamura_1983_ai_locations.csv")
#Doesn't contain nan values
#print(df.isna().sum())

dates = []

for i in df.index:
    year, month, day = get_day_month(df['Y'][i], df['JD'][i])
    date_event = datetime.datetime(year, month, day, df['Hour'][i], df['Min'][i], int(df['Sec'][i]))
    dates.append(date_event.strftime("%d/%m/%Y"))
df["Dates"] = dates
df.drop(['Y', 'JD', 'Hour', 'Min', 'Sec'], axis = 1, inplace = True)

#df.drop("AI", axis = 1, inplace=True)

df.to_csv("nakamura_1983_ai_locations_cleaned.csv", index = False)

"""Code to clean nakamura_1983_sm_arrivals.csv"""
# df = pd.read_csv("nakamura_1983_sm_arrivals.csv")

# """We get rid of the data without date"""
# nan_in_date = df[['Year', 'Day', 'Hour']].isna().sum()
# n_rows = df.shape[0]
# print((n_rows - nan_in_date)/ n_rows)

# To check what happens after removing nan values
# print(df.head())
# df = df.dropna()
# print(df.head())

#All rows contain nan values
# dates = []
# df.to_csv("nakamura_1983_sm_arrivals_cleaned.csv", index = False)

"""Code to clean nakamura_2005_dm_locations.csv"""
df = pd.read_csv("nakamura_2005_dm_locations.csv")

#There are not nan values in this dataset
#df.isna().sum()
df.to_csv("nakamura_2005_dm_locations_cleaned.csv", index = False)

"""Code to clean and prepare data in gagnepian_2006_catalog.csv for the API"""
df = pd.read_csv("gagnepian_2006_catalog.csv")    
df = df.drop(["Date", "Delta-a", "Delta-b", "Depth_err","Phi", "Type", \
                      "YN_Depth", "YN_Lat", "YN_Lon", "Depth"], axis=1)
df.to_csv("gagnepian_2006_catalog_cleaned.csv", index = False)

"""Code to clean and prepare data in xa.s11..att.1969.202.0.a.csv"""
df = pd.read_csv("xa.s11..att.1969.202.0.a.csv")
df.to_csv("xa.s11..att.1969.202.0.a_cleaned.csv", index = False)