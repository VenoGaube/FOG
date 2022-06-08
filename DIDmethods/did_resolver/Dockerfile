FROM python:3.8-alpine

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

CMD flask run --host 0.0.0.0