#!/bin/bash

# Install Python dependencies
pip install --no-cache-dir -r requirements.txt
pip install --no-cache-dir -r dev-requirements.txt


# Start the Flask app in the background
echo "Starting the Flask app..."
gunicorn --bind 0.0.0.0:$PORT app:app &


# Build React app
echo "Building React app..."
npm install --prefix react-app
npm run build --prefix react-app

# Move the built React app files to the Flask app's static directory
echo "Copying React app files to Flask app's static directory..."
cp -R react-app/build/* app/static/