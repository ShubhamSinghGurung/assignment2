import React, { useState, useEffect } from "react";
import { trainModel } from "./trainModel"; // Import function to train the model
import PropertyForm from "./components/PropertyForm"; // Import form component

function App() {
  const [model, setModel] = useState(null);
  const [data, setData] = useState([]);

  // Load the dataset when the app starts
  useEffect(() => {
    fetch("/data.json") // Fetching the data.json file
      .then((response) => response.json())
      .then((realEstateData) => {
        setData(realEstateData);
        setModel(trainModel(realEstateData)); // Train model with data
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div className="container">
      <h1>Real Estate Price Predictor</h1>
      {model ? <p>Model Trained ✅</p> : <p>Loading Model...</p>}
      <PropertyForm />
    </div>
  );
}

export default App;
