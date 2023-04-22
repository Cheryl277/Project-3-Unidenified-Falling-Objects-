from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/ufo_to_bases.sqlite")

Base = automap_base()
Base.prepare(autoload_with=engine)

# Save reference to the table
ufo_to_bases = Base.classes.df_full5_with_id

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/bar_graph")
def getLocations():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(ufo_to_bases.dist, ufo_to_bases.datetime).all()

    session.close()

    distance_data = [{"distance": dist, "total_count": datetime } for dist, datetime in results]

    return jsonify(distance_data)

if __name__ == '__main__':
    app.run(debug=True)
