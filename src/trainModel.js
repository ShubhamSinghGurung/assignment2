// trainModel.js

/**
 * Trains a Brain.js neural network using real estate data.
 * @param {NeuralNetwork} model - Instance of brain.js NeuralNetwork to train.
 * @param {Array} data - Array of training data.
 * @returns {NeuralNetwork} Trained model.
 */
export function trainModel(model, data) {
  const formattedData = data.map(item => ({
      input: {
          area: item.area / 5000,   // Normalize area
          bedrooms: item.bedrooms / 5,  // Normalize bedrooms (assuming max 5)
          bathrooms: item.bathrooms / 5, // Normalize bathrooms
          location: item.location / 3,   // Normalize location (assuming 3 locations)
          age: item.age / 50             // Normalize age (assuming max age 50)
      },
      output: {
          price: item.price / 1000000    // Normalize price (assuming max price 1M)
      }
  }));

  model.train(formattedData, {
      iterations: 2000,
      errorThresh: 0.01,
      log: true,
      logPeriod: 100,
  });

  return model;
}
