// predictPrice.js

/**
 * Predicts the price using a trained Brain.js model.
 * @param {NeuralNetwork} model - Trained brain.js NeuralNetwork.
 * @param {Object} formData - Input form data.
 * @returns {number} Predicted price.
 */
export function predictPrice(model, formData) {
  const input = {
      area: formData.area / 5000,
      bedrooms: formData.bedrooms / 5,
      bathrooms: formData.bathrooms / 5,
      location: formData.location / 3,
      age: formData.age / 50,
  };

  const output = model.run(input);

  // Scale the price back to normal range
  const predictedPrice = output.price * 1000000;

  return predictedPrice;
}
