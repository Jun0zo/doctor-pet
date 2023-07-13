from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from demo_FastAPI import run
import base64
from fastapi.responses import JSONResponse
import hashlib
from datetime import datetime

app = FastAPI()

origins = [
    # 허용할 출처를 여기에 추가해주세요
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")

async def upload_image(image_files: Dict[str, List[str]]):
    
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

        file_name = f"front_come/{hash_value}.jpg"
        with open(file_name, "wb") as f:
            f.write(img_processed)

        if output[0] == '정상':
            result["disease_detected"] = False
            result["disease_name"] = ""
            result["disease_probability"] = 0
        else:
            result["disease_detected"] = True
            result["disease_name"] = output[0]
            result["disease_probability"] = float(output[1])
            result["image_url"] = "/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/front_come/{hash_value}.jpg"
        results.append(result)
        
    final_result = {'result': results}
    
    return JSONResponse(content=final_result)

information_list = []

@app.post("/push") # 데이터 저장하기
def pull_data(data: dict):
    information_list.append(data)
    return {"message": "Data received successfully"}

@app.get("/pull") # 데이터 불러오기
def get_data():
    return information_list

