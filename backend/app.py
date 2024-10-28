from flask import Flask, request, render_template
import numpy as np
import pickle

from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


# Create Flask app
app = Flask(__name__)



# Load model safely with error handling
try:
    model = pickle.load(open('model.pkl', 'rb'))
except FileNotFoundError:
    print("Error: model.pkl file not found! Make sure it exists in the same directory as app.py")
except Exception as e:
    print(f"Error loading model: {e}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/predict", methods=['POST'])
def predict():
    if 'model' not in globals():
        return render_template('index.html', result="Error: Model is not loaded.")
    try:
        # Get values from form
        N = float(request.form['N'])
        P = float(request.form['P'])
        K = float(request.form['K'])
        T = float(request.form['T'])
        H = float(request.form['H'])
        PH = float(request.form['PH'])
        RF = float(request.form['RF'])

        # Create feature array
        feature_list = [N, P, K, T, H, PH, RF]
        single_pred = np.array(feature_list).reshape(1, -1)

        # Make prediction
        prediction = model.predict(single_pred)
        
        return render_template('index.html', result=prediction[0])
    
    except Exception as e:
        return render_template('index.html', result=f"Error: {str(e)}")


# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy

#########

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crop.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

db=SQLAlchemy(app)

import routes
with app.app_context():
    db.create_all()







if __name__ == '__main__':
    app.run(debug=True)
