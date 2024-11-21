from flask import Flask, request, jsonify
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
import numpy as np
from flask_cors import CORS


os.environ['FLASK_APP'] = 'predict'

app = Flask(__name__)
CORS(app, resources={r"/Prediction": {"origins": "http://localhost:5173"}})  # Allow from React app

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
def predict():
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

if __name__=='__main__':
    app.run(debug=True)





# for run  $env:FLASK_APP="predict"