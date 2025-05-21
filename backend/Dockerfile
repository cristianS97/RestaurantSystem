FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

COPY wait-for-it.sh /wait-for-it.sh
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./wait-for-it.sh ./entrypoint.sh

CMD ["./entrypoint.sh"]
