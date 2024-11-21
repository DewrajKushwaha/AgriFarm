from flask import Flask, request, render_template, jsonify,send_from_directory
import numpy as np
import pickle
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf

# for different py file we need to import here
# eg  import routes,prediction

load_dotenv()

# Create Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)



# connect the frontend for deployment
frontend_folder=os.path.join(os.getcwd(),'..','frontend')
dist_folder=os.path.join(frontend_folder,'dist')

#Server static files from the 'dist' folder under the 'frontend' directory
@app.route('/',defaults={'filename':''})
@app.route('/<path:filename>')
def index(filename):
    if not filename:
        filename='index.html'
    return send_from_directory(dist_folder,filename)

# Configure MongoDB
mongodb_uri = os.getenv('MONGODB_URI')
client = MongoClient(mongodb_uri)
db = client['AgreFarm']  # Replace with your database name
collection = db['DataHistory'] 

# Load model with error handling
try:
    model = pickle.load(open('Rec_model.pkl', 'rb'))
   
except FileNotFoundError:
    print("Error: Rec_model.pkl file not found! Make sure it exists in the same directory as app.py")
    model = None
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route("/CropReco", methods=['POST'])
def predict():
    if not model:
        return jsonify({"error": "Model is not loaded."}), 500
    
    try:
        # Extract JSON data from request
        data = request.json
        N = int(data['Nitrogen'])
        P = int(data['Phosphorus'])
        K = int(data['Potassium'])
        T = float(data['Temperature'])
        H = float(data['Humidity'])
        PH = float(data['Ph'])
        RF = float(data['Rainfall'])

        # Create feature array
        feature_list = [N, P, K, T, H, PH, RF]
        single_pred = np.array(feature_list).reshape(1, -1)

        # Make prediction
        prediction = model.predict(single_pred)
        
        # Return JSON response
        key={
            1: 'rice',
            2: 'maize',
            3: 'chickpea',
            4: 'kidneybeans',
            5: 'pigeonpeas',
            6: 'mothbeans',
            7: 'mungbean',
            8: 'blackgram',
            9: 'lentil',
            10: 'pomegranate',
            11: 'banana',
            12: 'mango',
            13: 'grapes',
            14: 'watermelon',
            15: 'muskmelon',
            16: 'apple',
            17: 'orange',
            18: 'papaya',
            19: 'coconut',
            20: 'cotton',
            21: 'jute',
            22: 'coffee'
        }
        crop_prediction = key[int(prediction[0])]

        # Save the prediction to MongoDB
        prediction_data = {
            "crop": crop_prediction,
            "Nitrogen": N,
            "Phosphorus": P,
            "Potassium": K,
            "Temperature": T,
            "Humidity": H,
            "Ph": PH,
            "Rainfall": RF
        }

        collection.insert_one(prediction_data)  # Insert the prediction into the collection

       
        return jsonify(key[int(prediction[0])]), 200

        # print("Prediction type:", type(prediction[0]))
        # print("Prediction is:", prediction[0])
        # return jsonify({"prediction": prediction[0]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# # Initialize database
# with app.app_context():
#     db.create_all()

# model_path = 'trained_plant_disease_model.keras'
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'trained_plant_disease_model.keras')

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file does not exist at path: {model_path}")

def load_model():
    return tf.keras.models.load_model(model_path)

def preprocess_image(test_image):
    image = tf.keras.preprocessing.image.load_img(test_image, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    return np.array([input_arr])  # Add batch dimension

def model_prediction(model, input_arr):
    predictions = model.predict(input_arr)
    result_index = np.argmax(predictions)
    return result_index

class_name = [
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

@app.route('/Prediction', methods=['POST'])
def prediction():
    print("Received a request at /predict")  # Debugging line
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    model = load_model()
    input_arr = preprocess_image(file_path)
    result_index = model_prediction(model, input_arr)

    os.remove(file_path)  # Clean up the uploaded file

    print('Prediction is success full ',class_name[result_index])
    return jsonify({'prediction': class_name[result_index]})



if __name__ == '__main__':
    app.run(debug=True)






















# from flask import Flask, request, render_template
# import numpy as np
# import pickle

# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy


# # Create Flask app
# app = Flask(__name__)



# # Load model safely with error handling
# try:
#     model = pickle.load(open('model.pkl', 'rb'))
# except FileNotFoundError:
#     print("Error: model.pkl file not found! Make sure it exists in the same directory as app.py")
# except Exception as e:
#     print(f"Error loading model: {e}")

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route("/CropReco", methods=['POST'])
# def predict():
#     if 'model' not in globals():
#         return render_template('index.html', result="Error: Model is not loaded.")
#     try:
#         # Get values from form
#         N = float(request.form['N'])
#         P = float(request.form['P'])
#         K = float(request.form['K'])
#         T = float(request.form['T'])
#         H = float(request.form['H'])
#         PH = float(request.form['PH'])
#         RF = float(request.form['RF'])

#         # Create feature array
#         feature_list = [N, P, K, T, H, PH, RF]
#         single_pred = np.array(feature_list).reshape(1, -1)

#         # Make prediction
#         prediction = model.predict(single_pred)
        
#         return render_template('index.html', result=prediction[0])
    
#     except Exception as e:
#         return render_template('index.html', result=f"Error: {str(e)}")


# # from flask_cors import CORS
# # from flask_sqlalchemy import SQLAlchemy

# #########

# CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crop.db'
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

# db=SQLAlchemy(app)

# import routes
# with app.app_context():
#     db.create_all()







# if __name__ == '__main__':
#     app.run(debug=True)
