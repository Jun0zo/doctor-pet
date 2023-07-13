from fastapi import FastAPI
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

db = TinyDB('data_db.json')
data_table = db.table('data')

@app.post("/save_data")
async def save_data(request: Request, json_data: List[dict]):
    client_ip = request.client.host
    json_data = await request.json()

    data_table.insert({'ip': client_ip, 'data': json_data})

    return {"message": f"Data saved for IP: {client_ip}"}

@app.get("/get_data/{client_ip}")
def get_data(client_ip: str):
    Data = Query()
    result = data_table.search(Data.ip == client_ip)

    if result:
        return result[0]['data']
    else:
        return {"message": "No data available for the provided IP"}
