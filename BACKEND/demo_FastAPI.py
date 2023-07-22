import cv2
import os
import time
import numpy as np
import torch
import torch.backends.cudnn as cudnn
import io
from config.yolof_config import yolof_config
from dataset.coco import coco_class_index, coco_class_labels, COCODataset
from dataset.transforms import ValTransforms
from utils.misc import load_weight
from models.detector import build_model

#한글깨짐 방지
from PIL import ImageFont, ImageDraw, Image
font = ImageFont.truetype('/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/font/MaruBuri-Bold.ttf', 16)


def plot_bbox_labels(img, bbox, label, cls_color, test_scale=0.4):
    x1, y1, x2, y2 = bbox
    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
    t_size = cv2.getTextSize(label, 0, fontScale=1, thickness=2)[0]
    # 바운딩 박스 그리기
    cv2.rectangle(img, (x1, y1), (x2, y2), cls_color, 2)
    # 타이틀 박스 그리기
    cv2.rectangle(img, (x1, y1 - t_size[1]), (int(x1 + t_size[0] * test_scale), y1), cls_color, -1)
    # 이미지를 PIL 포맷으로 변환
    img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(img_pil)
    text_position = (int(x1), int(y1 - t_size[1]))  # 필요에 따라 위치 조정
    text = label  # 렌더링할 한글 텍스트
    draw.text(text_position, text, font=font, fill=(255, 255, 255))
    # 이미지를 다시 OpenCV 포맷으로 변환
    img = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)
    return img

def visualize(img, bboxes, scores, cls_inds, class_colors, vis_thresh=0.3):
    ts = 0.4
    i = np.argmax(scores)
    # for i, bbox in enumerate(bboxes):
    if scores[i] > vis_thresh:
        cls_color = class_colors[int(cls_inds[i])]
        cls_id = coco_class_index[int(cls_inds[i])]
        mess = '%s:%.2f' % (coco_class_labels[cls_id], scores[i])
        img = plot_bbox_labels(img, bboxes[i], mess, cls_color, test_scale=ts) 
    else:
        mess = '정상'

    return img, mess

def run(image_file):
    # 기본값 설정
    min_size = 640
    max_size = 640
    mode = 'image'
    cuda = True
    #image_file = '/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/test/image.jpg'
    path_to_save = '/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/det_results/images/FastAPI/'
    version = 'yolof50'
    weight = '/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/weights/coco/yolof50/yolof50_epoch_50_67.64.pth'

    # cuda
    if cuda:
        print('use cuda')
        cudnn.benchmark = True
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")

    np.random.seed(0)

    # YOLOF 설정
    print('Model: ', version)
    cfg = yolof_config[version]

    # 모델 빌드
    model = build_model(args=None,  # 더 이상 argparse를 사용하지 않으므로 None을 args 인자로 전달
                        cfg=cfg,
                        device=device,
                        num_classes=19,
                        trainable=False)

    # 훈련된 가중치 로드
    model = load_weight(device=device,
                        model=model,
                        path_to_ckpt=weight)

    # 변환 설정
    transform = ValTransforms(min_size=min_size,
                              max_size=max_size,
                              pixel_mean=cfg['pixel_mean'],
                              pixel_std=cfg['pixel_std'],
                              format=cfg['format'],
                              padding=cfg['val_padding'])

    # 클래스 색상
    np.random.seed(0)
    class_colors = [(np.random.randint(255),
                     np.random.randint(255),
                     np.random.randint(255)) for _ in range(80)]
    save_path = os.path.join(path_to_save, mode)
    os.makedirs(save_path, exist_ok=True)

    # ------------------------- 이미지 ----------------------------
    if mode == 'image':
        #image = cv2.imread(image_file, cv2.IMREAD_COLOR)
        image = Image.open(io.BytesIO(image_file))
        image = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
        orig_h, orig_w, _ = image.shape
        orig_size = np.array([[orig_w, orig_h, orig_w, orig_h]])

        # 준비
        x = transform(image)[0]
        x = x.unsqueeze(0).to(device)
        # 추론
        t0 = time.time()
        bboxes, scores, cls_inds = model(x)
        t1 = time.time()
        print("소요된 검출 시간: ", t1-t0, "초")

        # 크기 조정
        if transform.padding:
            # 입력 이미지는 짧은 쪽에 0으로 패딩되어 긴 쪽과 맞추어짐
            bboxes *= max(orig_h, orig_w)
        else:
            # 입력 이미지는 패딩되지 않음
            bboxes *= orig_size
        bboxes[..., [0, 2]] = np.clip(bboxes[..., [0, 2]], a_min=0., a_max=orig_w)
        bboxes[..., [1, 3]] = np.clip(bboxes[..., [1, 3]], a_min=0., a_max=orig_h)

        # 시각화된 바운딩 박스가 있는 이미지 반환
        img_processed, mess = visualize(img=image,
                                  bboxes=bboxes,
                                  scores=scores,
                                  cls_inds=cls_inds,
                                  class_colors=class_colors,
                                  vis_thresh=cfg['test_score_thresh'])
    

        # cv2.imshow('detection', img_processed)
        # save_filename = os.path.join(save_path, os.path.basename('test').replace('.png', '_result.png'))
        # cv2.imwrite(save_filename, img_processed)
        # cv2.imwrite(os.path.join(save_path, path_to_img.split('/')[-1].replace('.jpg', '_result.jpg')), img_processed)
        # print(f"결과 이미지 저장됨: {save_filename}")
        print(mess)
        
    return img_processed, mess
if __name__ == '__main__':  # 여기에 이미지 경로를 지정하세요
    tmp = '/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/test/image.jpg'
    run(tmp)
