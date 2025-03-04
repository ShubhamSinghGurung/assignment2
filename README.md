#  Real Estate Price Predictor

This project is a **Real Estate Price Prediction App** built using **React.js** for the frontend and **Brain.js** to implement a simple neural network model for predicting property prices.

The app allows users to input property details such as area, number of bedrooms, bathrooms, location, and age of the property. Based on the provided details, the app predicts the estimated property price using the trained neural network.

---

## 📸 Demo Link
[Visit the Deployed App on Netlify](https://wondrous-pithivier-637342.netlify.app)

---

## 📋 Features
- Predict property price based on area, bedrooms, bathrooms, location, and age
- Neural network model built with **Brain.js**
- Model training data saved in **LocalStorage** for persistent usage
- Responsive and styled with **Bootstrap**
- Data visualization using **Chart.js** for predicted vs actual prices

---

## 🛠️ Technologies Used
- **React.js** - Frontend framework
- **Brain.js** - Neural network library
- **Bootstrap** - UI Styling
- **Chart.js** - Data visualization
- **LocalStorage** - Persistent storage of trained model
- **Netlify** - Deployment platform

---

## 🚀 How to Run Locally

### Step 1 - Clone Repository

git clone <your-repository-url>
cd real-estate-price-predictor
Step 2 -Install Dependencies
npm install

Step 3-  Start Development Server
npm start


 Notes
The app trains the model on the first load using data.json.
The trained model is saved to LocalStorage, so future predictions do not require retraining.
If the user clears the browser storage, the model will be retrained.
