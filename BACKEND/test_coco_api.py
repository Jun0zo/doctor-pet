
import os
import argparse
import time
import random
from copy import deepcopy

import torch
import torch.nn.functional as F
import torch.backends.cudnn as cudnn
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

from dataset.voc import VOCDetection
from dataset.coco import COCODataset
from dataset.transforms import TrainTransforms, ValTransforms, BaseTransforms

from utils import distributed_utils
from utils.com_flops_params import FLOPs_and_Params
from utils.misc import CollateFunc, get_total_grad_norm
from utils.solver.optimizer import build_optimizer
from utils.solver.lr_scheduler import build_lr_scheduler
from utils.solver.warmup_schedule import build_warmup

from evaluator.coco_evaluator import COCOAPIEvaluator
from evaluator.voc_evaluator import VOCAPIEvaluator

from config import build_config
from models.detector import build_model

from train import build_dataloader, build_dataset, build_model
from utils.misc import load_weight, TestTimeAugmentation

def parse_args():
    parser = argparse.ArgumentParser(description='Object Detection Benchmark')

    # basic
    parser.add_argument('--min_size', default=640, type=int,
                        help='the min size of input image')
    parser.add_argument('--max_size', default=640, type=int,
                        help='the min size of input image')
    parser.add_argument('--show', action='store_true', default=False,
                        help='show the visulization results.')
    parser.add_argument('--cuda', action='store_true', default=True, 
                        help='use cuda.')
    parser.add_argument('--save_folder', default='det_results/', type=str,
                        help='Dir to save results')

    # model
    parser.add_argument('-v', '--version', default='yolof50', type=str,
                        help='build yolof')
    parser.add_argument('--weight', default='./weights/coco/yolof50/yolof50_epoch_10.pth', #
                        type=str, help='Trained state_dict file path to open')
    parser.add_argument('--topk', default=100, type=int,
                        help='NMS threshold')

    # dataset
    parser.add_argument('--root', default='./coco/coco',
                        help='data root')
    parser.add_argument('-d', '--dataset', default='coco',
                        help='coco, voc.')
    # TTA
    parser.add_argument('-tta', '--test_aug', action='store_true', default=False,
                        help='use test augmentation.')

    return parser.parse_args()


def test():
    args = parse_args()
    print("Setting Arguments.. : ", args)
    print("----------------------------------------------------------")

    # cuda
    if args.cuda:
        print('use cuda')
        cudnn.benchmark = True
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")

    # config
    cfg = build_config(args)

    # build model
    model = build_model(args=args, 
                        cfg=cfg,
                        device=device, 
                        num_classes=19, 
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


    data_dir = os.path.join(args.root)
    num_classes = 19 # 
    # evaluator
    evaluator = COCOAPIEvaluator(data_dir=data_dir,
                                    device=device,
                                    transform=transform)
    evaluator.evaluate(model)

test()