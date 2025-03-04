import React, { useState, useEffect } from "react";
import { trainModel } from "./trainModel";
import { predictPrice } from "./predictPrice";
import PropertyForm from "./components/PropertyForm";
import PriceChart from "./components/PriceChart";
import { saveModelToLocalStorage, loadModelFromLocalStorage } from './modelStorage';

// Import NeuralNetwork directly from brain.js
import { NeuralNetwork } from 'brain.js';

function App() {
    const [model, setModel] = useState(null);
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [actualPrices] = useState([100000, 120000, 95000, 110000]); // Example data for chart

    const [feedback, setFeedback] = useState(null); // Track user feedback
    const [error, setError] = useState(""); // Track errors like model loading issues

    useEffect(() => {
        async function loadOrTrainModel() {
            try {
                console.log("🔎 Checking for saved model in LocalStorage...");

                const savedModelData = loadModelFromLocalStorage();

                if (savedModelData) {
                    console.log("✅ Found saved model, loading into NeuralNetwork...");
                    const loadedModel = new NeuralNetwork();
                    loadedModel.fromJSON(savedModelData);
                    setModel(loadedModel);
                } else {
                    console.log("⚠️ No saved model found, training new model...");

                    const response = await fetch("/data.json");
                    const realEstateData = await response.json();

                    const newModel = new NeuralNetwork();
                    trainModel(newModel, realEstateData);

                    setModel(newModel);
                    saveModelToLocalStorage(newModel);

                    console.log("✅ New model trained and saved.");
                }
            } catch (err) {
                console.error("❌ Error loading or training model:", err);
                setError("Failed to load or train the model. Please check your data file or network connection.");
            }
        }

        loadOrTrainModel();
    }, []);

    const handlePredict = (formData) => {
        setFeedback(null); // Reset feedback on new prediction
        setError(""); // Clear any old errors

        if (!model) {
            setError("Model is not ready yet. Please wait.");
            return;
        }

        try {
            const price = predictPrice(model, formData);
            setPredictedPrice(price.toFixed(2));
        } catch (err) {
            console.error("❌ Prediction failed:", err);
            setError("Prediction failed. Please check your input and try again.");
        }
    };

    const handleFeedback = (userFeedback) => {
        setFeedback(userFeedback);
        console.log("User Feedback:", userFeedback);
        alert("Thanks for your feedback!");
        // Optional: Save feedback to localStorage or backend
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-4">
                <h1 className="display-5 fw-bold text-primary">🏠 Real Estate Price Predictor</h1>
                <p className="text-muted">Enter property details to get estimated price</p>

                {model ? (
                    <span className="badge bg-success fs-6">✅ Model Ready</span>
                ) : (
                    <span className="badge bg-warning fs-6">⏳ Loading Model...</span>
                )}
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Show error if any */}
                    {error && (
                        <div className="alert alert-danger text-center">
                            {error}
                        </div>
                    )}

                    {/* Property Form */}
                    <PropertyForm onSubmit={handlePredict} />

                    {/* Predicted Price Display */}
                    {predictedPrice && (
                        <>
                            <div className="alert alert-info mt-4 text-center shadow-lg">
                                <h4 className="fw-bold text-info">Predicted Price 💰</h4>
                                <p className="fs-3 fw-bold text-success">${predictedPrice}</p>
                            </div>

                            {/* Feedback Section */}
                            <div className="text-center mt-3">
                                <h5>Was this prediction accurate?</h5>
                                <button
                                    className="btn btn-outline-success me-2"
                                    onClick={() => handleFeedback("accurate")}
                                >
                                    ✅ Yes
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleFeedback("inaccurate")}
                                >
                                    ❌ No
                                </button>
                            </div>

                            {/* Feedback Confirmation */}
                            {feedback && (
                                <div className="alert alert-warning mt-3 text-center">
                                    Thank you for your feedback: <strong>{feedback}</strong>
                                </div>
                            )}

                            {/* Price Chart */}
                            <PriceChart predictedPrice={parseFloat(predictedPrice)} actualPrices={actualPrices} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
