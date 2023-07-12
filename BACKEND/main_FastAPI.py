from fastapi import FastAPI
from typing import List
from demo_FastAPI import run
import base64
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/upload")

async def upload_image(image_files: List[str]):
    
    files = []
    for image in image_files:
        files.append(base64.b64decode(image.encode("utf-8")))
        
    results = []
    
    for file in files:
        result = {}
        mess, img_processed = run(file)
        output = mess.split(":")
        base64_contents = base64.b64encode(img_processed).decode("utf-8")
        
        if output[0] == '정상':
            result["disease_detected"] = False
            result["disease_name"] = ""
            result["disease_probability"] = 0
        else:
            result["disease_detected"] = True
            result["disease_name"] = output[0]
            result["disease_probability"] = float(output[1])
            result["image"] = base64_contents
        results.append(result)
        
    final_result = {'result': results}
    
    return JSONResponse(content=final_result)
