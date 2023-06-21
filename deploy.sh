#!/bin/bash

# Install Python dependencies
pip install --no-cache-dir -r requirements.txt
pip install --no-cache-dir -r dev-requirements.txt

# Install Node.js dependencies and build React app
echo "Installing Node.js dependencies..."
cd react-app
npm install
echo "Building React app..."
npm run build
cd ..

# Move the built React app files to the Flask app's static directory
echo "Copying React app files to Flask app's static directory..."
cp -R react-app/build/* app/static/

# Start the Flask app
echo "Starting the Flask app..."
gunicorn --bind 0.0.0.0:8000 app:app
# change