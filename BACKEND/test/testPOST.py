from fastapi import FastAPI
from typing import List
from demo_FastAPI import run
import base64
from PIL import Image

with open('./IMG_D_A1_000001.jpg', 'rb') as img:
    res =  base64.b64encode(img.read())
    
    print(res)
    
    
    