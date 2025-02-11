import brain from "brain.js";

// Function to predict price based on user input
export const predictPrice = (trainedModel, formData) => {
  if (!trainedModel) {
    return "Model not available";
  }

  const net = new brain.NeuralNetwork();
  net.fromJSON(trainedModel); // Load trained model

  // Normalize input values (same way we did during training)
  const input = {
    area: formData.area / 1, // Already normalized in dataset
    bedrooms: formData.bedrooms / 1,
    bathrooms: formData.bathrooms / 1,
    location: formData.location / 1,
    age: formData.age / 1,
  };

  // Predict price
  const output = net.run(input);
  return output.price * 1000000; // Convert back to actual price
};
