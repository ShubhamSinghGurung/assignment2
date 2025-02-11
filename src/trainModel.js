import brain from "brain.js";

// Function to train the model
export const trainModel = (data) => {
  const net = new brain.NeuralNetwork({
    hiddenLayers: [5, 5], // Neural network architecture
    activation: "sigmoid", // Activation function
  });

  // Prepare the training data
  const trainingData = data.map((item) => ({
    input: {
      area: item.area,
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      location: item.location,
      age: item.age,
    },
    output: { price: item.price },
  }));

  // Train the neural network
  net.train(trainingData, {
    iterations: 2000, // Number of training cycles
    errorThresh: 0.005, // Minimum error threshold to stop training
    log: true, // Log training progress
    logPeriod: 100, // Log after every 100 iterations
    learningRate: 0.3, // Adjust how fast the model learns
  });

  return net.toJSON(); // Return trained model as JSON
};
