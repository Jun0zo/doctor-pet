import argparse
import cv2
import os
import time
import numpy as np
import torch
import torch.backends.cudnn as cudnn

from config.yolof_config import yolof_config
from dataset.coco import coco_class_index, coco_class_labels, COCODataset
from dataset.transforms import ValTransforms
from utils.misc import load_weight

from models.detector import build_model

#한글깨짐 방지
from PIL import ImageFont, ImageDraw, Image
font = ImageFont.truetype('/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/font/MaruBuri-Bold.ttf', 16)


def parse_args():
    parser = argparse.ArgumentParser(description='Object Detection Benchmark Demo')

    # basic
    parser.add_argument('--min_size', default=640, type=int,
                        help='the min size of input image')
    parser.add_argument('--max_size', default=640, type=int,
                        help='the min size of input image')
    parser.add_argument('--mode', default='image',
                        type=str, help='Use the data from image, video or camera')
    parser.add_argument('--cuda',  default=True,
                        help='Use cuda')
    parser.add_argument('--path_to_img', default='/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/test/',
                        type=str, help='The path to image files') 
    parser.add_argument('--path_to_vid', default='data/demo/videos/',
                        type=str, help='The path to video files')
    parser.add_argument('--path_to_save', default='/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/det_results/images/image',
                        type=str, help='The path to save the detection results')
    parser.add_argument('--path_to_saveVid', default='data/videos/result.avi',
                        type=str, help='The path to save the detection results video')

    # model
    parser.add_argument('-v', '--version', default='yolof50', type=str,
                        help='build yolof')
    parser.add_argument('--weight', default='/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/weights/coco/yolof50/yolof50_epoch_50_67.64.pth', # 
                        type=str, help='Trained state_dict file path to open')
    parser.add_argument('--topk', default=100, type=int,
                        help='NMS threshold')
    
    return parser.parse_args()

def plot_bbox_labels(img, bbox, label, cls_color, test_scale=0.4):
    x1, y1, x2, y2 = bbox
    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
    t_size = cv2.getTextSize(label, 0, fontScale=1, thickness=2)[0]
    # plot bbox
    cv2.rectangle(img, (x1, y1), (x2, y2), cls_color, 2)
    # plot title bbox
    cv2.rectangle(img, (x1, y1 - t_size[1]), (int(x1 + t_size[0] * test_scale), y1), cls_color, -1)
    # Convert image to PIL format
    img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(img_pil)
    text_position = (int(x1), int(y1 - t_size[1]))  # Adjust the position as needed
    text = label  # Korean text to be rendered
    draw.text(text_position, text, font=font, fill=(255, 255, 255))
    # Convert image back to OpenCV format
    img = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)
    return img

def visualize(img, bboxes, scores, cls_inds, class_colors, vis_thresh=0.3):
    ts = 0.4
    for i, bbox in enumerate(bboxes):
        if scores[i] > vis_thresh:
            cls_color = class_colors[int(cls_inds[i])]
            cls_id = coco_class_index[int(cls_inds[i])]
            mess = '%s: %.2f' % (coco_class_labels[cls_id], scores[i])
            img = plot_bbox_labels(img, bbox, mess, cls_color, test_scale=ts) 
    
    print(mess)
    return img

def detect(net, 
           device, 
           transform, 
           vis_thresh, 
           mode='image.jpg', 
           path_to_img='/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/test/IMG_D_A1_000001.jpg', 
           path_to_save='/home/kyy/2023_반려동물질병검출/doctor-pet/BACKEND/det_results/images/'):
    # class color
    np.random.seed(0)
    class_colors = [(np.random.randint(255),
                     np.random.randint(255),
                     np.random.randint(255)) for _ in range(80)]
    save_path = os.path.join(path_to_save, mode)
    os.makedirs(save_path, exist_ok=True)

    # ------------------------- Image ----------------------------
    
    if mode == 'image':
            image = cv2.imread(path_to_img, cv2.IMREAD_COLOR)
            orig_h, orig_w, _ = image.shape
            orig_size = np.array([[orig_w, orig_h, orig_w, orig_h]])

            # prepare
            x = transform(image)[0]
            x = x.unsqueeze(0).to(device)
            # inference
            t0 = time.time()
            bboxes, scores, cls_inds = net(x)
            t1 = time.time()
            print("detection time used ", t1-t0, "s")

            # rescale
            if transform.padding:
                # The input image is padded with 0 on the short side, aligning with the long side.
                bboxes *= max(orig_h, orig_w)
            else:
                # the input image is not padded.
                bboxes *= orig_size
            bboxes[..., [0, 2]] = np.clip(bboxes[..., [0, 2]], a_min=0., a_max=orig_w)
            bboxes[..., [1, 3]] = np.clip(bboxes[..., [1, 3]], a_min=0., a_max=orig_h)
            
            ### bounding box 시각화된 이미지 반환
            img_processed = visualize(img=image, 
                                      bboxes=bboxes,
                                      scores=scores, 
                                      cls_inds=cls_inds,
                                      class_colors=class_colors,
                                      vis_thresh=vis_thresh)
            # file_name = "image.jpg"
            # file_path = os.path.join(save_path, file_name)
            # with open(file_path, "wb") as f:
            #     f.write(img_processed)

            # cv2.imshow('detection', img_processed)
            cv2.imwrite(os.path.join(save_path, path_to_img.split('/')[-1].replace('.jpg', '_result.jpg')), img_processed)
            # cv2.waitKey(0)


def run():
    args = parse_args()
    # cuda
    if args.cuda:
        print('use cuda')
        cudnn.benchmark = True
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")

    np.random.seed(0)

    # YOLOF config
    print('Model: ', args.version)
    cfg = yolof_config[args.version]

    # build model
    model = build_model(args=args, 
                        cfg=cfg,
                        device=device, 
                        num_classes=19,  #
                        trainable=False)

    # load trained weight
    model = load_weight(device=device, 
                        model=model, 
                        path_to_ckpt=args.weight)

    # transform
    transform = ValTransforms(min_size=cfg['test_min_size'], 
                              max_size=cfg['test_max_size'],
                              pixel_mean=cfg['pixel_mean'],
                              pixel_std=cfg['pixel_std'],
                              format=cfg['format'],
                              padding=cfg['val_padding'])

    # run
    detect(net=model, 
            device=device,
            transform=transform,
            mode=args.mode,
            path_to_img=args.path_to_img + 'image.jpg', # 저장된 이미지 파일을 demo, 'IMG_D_A6_203174.jpg'
            path_to_save=args.path_to_save,
            vis_thresh=cfg['test_score_thresh'])

if __name__ == '__main__':
    run()
