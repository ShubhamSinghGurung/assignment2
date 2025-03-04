// src/modelStorage.js

/**
 * Save the trained Brain.js model to LocalStorage.
 * @param {brain.NeuralNetwork} model - Trained neural network model
 */
export function saveModelToLocalStorage(model) {
    try {
        const jsonModel = model.toJSON();  // Convert Brain.js model to JSON
        localStorage.setItem('realEstateModel', JSON.stringify(jsonModel));
        console.log("💾 Model saved to LocalStorage.");
    } catch (error) {
        console.error("❌ Failed to save model to LocalStorage:", error);
    }
}

/**
 * Load the trained Brain.js model from LocalStorage.
 * @param {function} NeuralNetworkConstructor - The Brain.js NeuralNetwork constructor
 * @returns {brain.NeuralNetwork|null} - Loaded neural network model or null if not found
 */
export function loadModelFromLocalStorage(NeuralNetworkConstructor) {
    try {
        const savedModel = localStorage.getItem('realEstateModel');
        if (savedModel) {
            console.log("✅ Found saved model in LocalStorage.");

            const parsedModel = JSON.parse(savedModel);
            const model = new NeuralNetworkConstructor();  // Create new Brain.js network instance
            model.fromJSON(parsedModel);  // Load saved model into network

            console.log("🔄 Model loaded from LocalStorage.");
            return model;
        } else {
            console.warn("⚠️ No saved model found in LocalStorage.");
            return null;
        }
    } catch (error) {
        console.error("❌ Failed to load model from LocalStorage:", error);
        return null;
    }
}

/**
 * Clear the saved model from LocalStorage (optional utility).
 */
export function clearModelFromLocalStorage() {
    localStorage.removeItem('realEstateModel');
    console.log("🗑️ Cleared saved model from LocalStorage.");
}
