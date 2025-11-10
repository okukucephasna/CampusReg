FROM python:3.10-slim

WORKDIR /app

# Copy requirements first
COPY requirements.txt .

# Upgrade pip, setuptools, and wheel
RUN python -m pip install --upgrade pip setuptools wheel

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

CMD ["python", "app.py"]
