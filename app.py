import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import os

import pdb; pdb.set_trace()

# os.chdir("/Users/JonathanLilley_1/Documents/Analysis Projects/Project-3-Unidenified-Falling-Objects-")
Base = automap_base()
#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/ufo_to_bases.sqlite")
conn = engine.connect()

# reflect an existing database into a new model

# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
for c in Base.classes:
    print(c)

ufo_to_bases = Base.classes.df_full5

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/bar_graph")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(ufo_to_bases.dist, ufo_to_bases.datetime).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    distance_data = []
    for dist, datetime in results:
        passenger_dict = {}
        passenger_dict["distance"] = dist
        passenger_dict["total_count"] = datetime
        distance_data.append(passenger_dict)

    return jsonify(distance_data)


if __name__ == '__main__':
    app.run(debug=True)
