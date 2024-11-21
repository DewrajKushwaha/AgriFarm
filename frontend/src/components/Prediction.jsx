import React, { useState } from 'react';
import axios from 'axios';

function Prediction() {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [error, setError]=useState(null)
    const [loading, setLoading]=useState(false)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file){
            setError("Please upload an image.")
            return
        }
        setLoading(true)
        setError(null)

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/Prediction', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(!response){
                setError("Failed to make prediction.")
            }
            setPrediction(response.data.prediction);
        } catch (error) {
            setError(error.message)
            console.error('Error uploading file:', error);
        }
        finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="shadow-current shadow-lg p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Crop Disease Prediction</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} // Handle file change
                    className="mb-4 border border-gray-300 rounded-lg p-2 w-full"
                />
                <button
                    onClick={handleSubmit} // Trigger prediction
                    className={`w-full py-2 px-4 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Loading...' : 'Predict'} 
                </button>

                {prediction && ( // Display predicted disease if available
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Predicted Disease:</h3>
                        <p className="text-black text-lg ">Our Prediction is ... <div className='font-extrabold'>{prediction}</div> </p>
                    </div>
                )}

                {error && ( // Display error message if any
                    <p className="mt-4 text-lg font-bold text-red-500">{error}</p>
                )}
            </div>
        </div>
    );
};

export default Prediction;