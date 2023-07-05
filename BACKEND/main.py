from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel

app = FastAPI()

class Test(BaseModel):
    param1: int
    param2: int

@app.get("/test")
async def test(param1: int = 0):
    return {"value": param1 + 10}

@app.get("/pet")
async def upload_image(parmas: BaseModel = {}):
    print(parmas)
    print('!!')
    return {"is_ok", True}
    

@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    # 업로드한 파일의 이름과 내용을 출력합니다.
    file_name = file.filename
    contents = await file.read()
    print(f"Received file: {file_name}")

    # 여기서 이미지를 저장하거나 처리하는 로직을 추가할 수 있습니다.

    return {"file_name": file_name}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)