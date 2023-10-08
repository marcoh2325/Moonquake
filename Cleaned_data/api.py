from flask import Flask, request, jsonify
import pandas as pd

"""API that will supply the Web from data to represent the moonquakes.
The API uses the cleaned data (data that contains date, latitude and longitude
obligatory)"""

app = Flask(__name__)

@app.route('/hola')
def hello():
    return 'Hola, test'

@app.route('/nak1')
def quake1():
    data = pd.read_csv("nakamura_1979_sm_locations_cleaned.csv")
    nak1 = data.to_dict(orient='records')
    return nak1

@app.route('/nak2')
def quake2():
    data = pd.read_csv("nakamura_1983_ai_locations_cleaned.csv")    
    nak2 = data.to_dict(orient = 'records')
    return nak2

# Too few data
# @app.route('/nak3')
# def quake3():
#     data = pd.read_csv("nakamura_1983_sm_arrivals_cleaned.csv")
#     nak3 = data.to_dict(orient = 'records')
#     return nak3

@app.route('/nak4')
def quake4():
    data = pd.read_csv("nakamura_2005_dm_locations_cleaned.csv")
    nak4 = data.to_dict(orient = 'records')
    return nak4

@app.route('/s11_202_1')
def quake5():
    data = pd.read_csv("xa.s11..att.1969.202.0.a_cleaned.csv")
    s11 = data.to_dict(orient = 'records')
    return s11

@app.route('/gang')
def quake6():
    data = pd.read_csv("gagnepian_2006_catalog_cleaned.csv")    
    data = data.to_dict(orient = 'records')
    return data



if __name__ == '__main__':
    app.run()










