# Use an official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy dependency file and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY . .

# Expose Flask port
EXPOSE 8080

# Run the Flask app
CMD ["python", "app.py"]
