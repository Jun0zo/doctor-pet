from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from demo_FastAPI import run
import base64
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import hashlib
from datetime import datetime
import cv2
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from tinydb import TinyDB, Query
from pydantic import BaseModel

app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    # 허용할 출처를 여기에 추가해주세요
    "*"
]

app.add_middleware(HTTPSRedirectMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_image(image_files: Dict[str, List[str]]):
    #file_path = os.path.join(directory, file_name)
    files = []

    for image in image_files["encoded_images"]:
        files.append(base64.b64decode(image.encode("utf-8")))

    results = []
    

    for file in files:
        result = {}
        img_processed, mess = run(file)
        output = mess.split(":")
        #base64_contents = base64.b64encode(img_processed).decode("utf-8")

        current_time = datetime.now().strftime("%Y%m%d%H%M%S%f")
        hash_value = hashlib.md5(current_time.encode()).hexdigest()

        # with open(file_name, "wb") as f:
        #     f.write(img_processed)
        cv2.imwrite(f"static/{hash_value}.jpg", img_processed)

        if output[0] == '정상':
            result["disease_detected"] = False
            result["disease_name"] = ""
            result["disease_probability"] = 0
        else:
            result["disease_detected"] = True
            result["disease_name"] = output[0]
            result["disease_probability"] = float(output[1])
            result["image_url"] = f"static/{hash_value}.jpg"
        results.append(result)
        
    final_result = {'result': results}
    
    return JSONResponse(content=final_result)

# TinyDB 인스턴스 생성
db = TinyDB('data/db.json')

# TinyDB 테이블 생성
#table = db.table('items')

@app.post("/schedule")
def create_items(items: list[dict], request: Request):
    user_ip = request.client.host  # 클라이언트의 IP 주소 가져오기

    # 사용자 IP 주소를 키로 사용하여 데이터 저장
    table = db.table(user_ip)
    table.insert_multiple(items)

    return {"success!"}

@app.get("/schedule")
def get_schedule(request: Request):
    user_ip = request.client.host  # 클라이언트의 IP 주소 가져오기

    # 사용자 IP 주소를 키로 사용하여 데이터 조회
    table = db.table(user_ip)
    items = table.all()

    return items

@app.get("/hospitals/nearby")
def get_nearby_hospitals(latitude: float, longitude: float):
    sorted_hospitals = get_sorted_hospitals_nearby((latitude, longitude))
    return sorted_hospitals.to_dict(orient='records')