# 베이스 이미지 선택
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY requirements.txt .

# 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt
RUN apk add --no-cache mesa-dri-gallium

# 앱 소스 코드 복사
COPY . .

# 컨테이너 내에서 실행할 명령 설정
CMD ["uvicorn", "main_FastAPI:app", "--host", "0.0.0.0", "--port", "80"]