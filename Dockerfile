# Use Node 12 for the build stage
FROM node:12 AS build-stage

# Set working directory for React app
WORKDIR /react-app
COPY react-app/. .

# Set environment variable for React app
ENV REACT_APP_BASE_URL=https://spotify-clone-aa.herokuapp.com/

# Build the React app
RUN npm install
RUN npm run build

# Use Python 3.9 for the final stage
FROM python:3.9

# Set environment variables for Flask
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

# Expose the port for gunicorn
EXPOSE 8000

# Set working directory
WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Start gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
