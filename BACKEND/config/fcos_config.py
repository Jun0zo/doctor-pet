# fcos config


fcos_config = {
    'fcos18': {
        # input
        'train_min_size': 800,
        'train_max_size': 1333,
        'test_min_size': 800,
        'test_max_size': 1333,
        'format': 'RGB',
        'pixel_mean': [0.485, 0.456, 0.406],
        'pixel_std': [0.229, 0.224, 0.225],
        'transforms': {
            '1x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '2x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '3x':[{'name': 'DistortTransform',
                   'hue': 0.1,
                   'saturation': 1.5,
                   'exposure': 1.5},
                  {'name': 'RandomHorizontalFlip'},
                  {'name': 'RandomShift', 'max_shift': 32},
                  {'name': 'JitterCrop', 'jitter_ratio': 0.3},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}]},
        'val_padding': False,
        # model
        'backbone': 'resnet18',
        'norm_type': 'FrozeBN',
        'stride': [8, 16, 32, 64, 128],  # P3, P4, P5, P6, P7
        # fpn neck
        'fpn': 'basic_fpn',
        'from_c5': False,
        'p6_feat': True,
        'p7_feat': True,
        # head
        'head_dim': 256,
        'head_norm': '',
        'act_type': 'relu',
        'head': 'decoupled_head',
        'num_cls_head': 4,
        'num_reg_head': 4,
        # post process
        'conf_thresh': 0.05,
        'train_nms_thresh': 0.6,
        'test_nms_thresh': 0.5,
        'test_score_thresh': 0.35,
        # scale range
        'object_sizes_of_interest': [[-1, 64], [64, 128], [128, 256], [256, 512], [512, float('inf')]],
        # matcher
        'matcher': 'matcher',
        'center_sampling_radius': 1.5,
        # loss
        'alpha': 0.25,
        'gamma': 2.0,
        'loss_cls_weight': 1.0,
        'loss_reg_weight': 1.0,
        'loss_ctn_weight': 1.0,
        # training config
        'batch_size': 16,
        'base_lr': 0.01 / 16.,
        'bk_lr_ratio': 1.0,
        # optimizer
        'optimizer': 'sgd',
        'momentum': 0.9,
        'weight_decay': 1e-4,
        'warmup': 'linear',
        'wp_iter': 1000,
        'warmup_factor': 0.00066667,
        'epoch': {
            '1x': {'max_epoch': 12, 
                    'lr_epoch': [8, 11], 
                    'multi_scale': None},
            '2x': {'max_epoch': 24, 
                    'lr_epoch': [16, 22], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
            '3x': {'max_epoch': 36, 
                    'lr_epoch': [24, 33], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
        },
    },

    'fcos50': {
        # input
        'train_min_size': 512, # change
        'train_max_size': 512, # change
        'test_min_size': 512, # change
        'test_max_size': 512, # change
        'format': 'RGB',
        'pixel_mean': [0.485, 0.456, 0.406],
        'pixel_std': [0.229, 0.224, 0.225],
        'transforms': {
            '1x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '2x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '3x':[{'name': 'DistortTransform',
                   'hue': 0.1,
                   'saturation': 1.5,
                   'exposure': 1.5},
                  {'name': 'RandomHorizontalFlip'},
                  {'name': 'RandomShift', 'max_shift': 32},
                  {'name': 'JitterCrop', 'jitter_ratio': 0.3},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}]},
        'val_padding': False,
        # model
        'backbone': 'resnet50',
        'norm_type': 'FrozeBN',
        'stride': [8, 16, 32, 64, 128],
        # fpn neck
        'fpn': 'basic_fpn',
        'from_c5': False,
        'p6_feat': True,
        'p7_feat': True,
        # head
        'head_dim': 256,
        'head_norm': '',
        'act_type': 'relu',
        'head': 'decoupled_head',
        'num_cls_head': 4,
        'num_reg_head': 4,
        # post process
        'conf_thresh': 0.05,
        'train_nms_thresh': 0.5,
        'test_nms_thresh': 0.5,
        'test_score_thresh': 0.35,
        # scale range
        'object_sizes_of_interest': [[-1, 64], [64, 128], [128, 256], [256, 512], [512, float('inf')]],
        # matcher
        'matcher': 'matcher',
        'center_sampling_radius': 1.5,
        # loss
        'alpha': 0.25,
        'gamma': 2.0,
        'loss_cls_weight': 1.0,
        'loss_reg_weight': 1.0,
        'loss_ctn_weight': 1.0,
        # training config
        'batch_size': 20,
        'base_lr': 0.0001,
        # optimizer
        'optimizer': 'adam',
        'epoch': {
            '1x': {'max_epoch': 12, 
                    'multi_scale': None},
            '2x': {'max_epoch': 24, 
                    'lr_epoch': [16, 22], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
            '3x': {'max_epoch': 36, 
                    'lr_epoch': [24, 33], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
        },
    },

    'fcos50-ota': {
        # input
        'train_min_size': 800,
        'train_max_size': 1333,
        'test_min_size': 800,
        'test_max_size': 1333,
        'format': 'RGB',
        'pixel_mean': [0.485, 0.456, 0.406],
        'pixel_std': [0.229, 0.224, 0.225],
        'transforms': {
            '1x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '2x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '3x':[{'name': 'DistortTransform',
                   'hue': 0.1,
                   'saturation': 1.5,
                   'exposure': 1.5},
                  {'name': 'RandomHorizontalFlip'},
                  {'name': 'RandomShift', 'max_shift': 32},
                  {'name': 'JitterCrop', 'jitter_ratio': 0.3},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}]},
        'val_padding': False,
        # model
        'backbone': 'resnet50',
        'norm_type': 'FrozeBN',
        'stride': [8, 16, 32, 64, 128],
        # fpn neck
        'fpn': 'basic_fpn',
        'from_c5': False,
        'p6_feat': True,
        'p7_feat': True,
        # head
        'head_dim': 256,
        'head_norm': '',
        'act_type': 'relu',
        'head': 'decoupled_head',
        'num_cls_head': 4,
        'num_reg_head': 4,
        # post process
        'conf_thresh': 0.05,
        'train_nms_thresh': 0.6,
        'test_nms_thresh': 0.5,
        'test_score_thresh': 0.35,
        # matcher
        'matcher': 'ota_matcher',
        'topk_candidate': 20,
        'eps': 0.1, 
        'max_iter': 50,
        'center_sampling_radius': 2.5,
        # loss
        'alpha': 0.25,
        'gamma': 2.0,
        'loss_cls_weight': 1.0,
        'loss_reg_weight': 2.0,
        'loss_ctn_weight': 0.5,
        # training config
        'batch_size': 16,
        'base_lr': 0.01 / 16.,
        'bk_lr_ratio': 1.0,
        # optimizer
        'optimizer': 'sgd',
        'momentum': 0.9,
        'weight_decay': 1e-4,
        'warmup': 'linear',
        'wp_iter': 1000,
        'warmup_factor': 0.00066667,
        'epoch': {
            '1x': {'max_epoch': 12, 
                    'lr_epoch': [8, 11], 
                    'multi_scale': None},
            '2x': {'max_epoch': 24, 
                    'lr_epoch': [16, 22], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
            '3x': {'max_epoch': 36, 
                    'lr_epoch': [24, 33], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
        },
    },

    'fcos101': {
        # input
        'train_min_size': 800,
        'train_max_size': 1333,
        'test_min_size': 800,
        'test_max_size': 1333,
        'format': 'RGB',
        'pixel_mean': [0.485, 0.456, 0.406],
        'pixel_std': [0.229, 0.224, 0.225],
        'transforms': {
            '1x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '2x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '3x':[{'name': 'DistortTransform',
                   'hue': 0.1,
                   'saturation': 1.5,
                   'exposure': 1.5},
                  {'name': 'RandomHorizontalFlip'},
                  {'name': 'RandomShift', 'max_shift': 32},
                  {'name': 'JitterCrop', 'jitter_ratio': 0.3},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}]},
        'val_padding': False,
        # model
        'backbone': 'resnet101',
        'norm_type': 'FrozeBN',
        'stride': [8, 16, 32, 64, 128],
        # fpn neck
        'fpn': 'basic_fpn',
        'from_c5': False,
        'p6_feat': True,
        'p7_feat': True,
        # head
        'head_dim': 256,
        'head_norm': '',
        'act_type': 'relu',
        'head': 'decoupled_head',
        'num_cls_head': 4,
        'num_reg_head': 4,
        # post process
        'conf_thresh': 0.05,
        'train_nms_thresh': 0.6,
        'test_nms_thresh': 0.5,
        'test_score_thresh': 0.35,
        # scale range
        'object_sizes_of_interest': [[-1, 64], [64, 128], [128, 256], [256, 512], [512, float('inf')]],
        # matcher
        'matcher': 'matcher',
        'center_sampling_radius': 1.5,
        # loss
        'alpha': 0.25,
        'gamma': 2.0,
        'loss_cls_weight': 1.0,
        'loss_reg_weight': 1.0,
        'loss_ctn_weight': 1.0,
        # training config
        'batch_size': 16,
        'base_lr': 0.01 / 16.,
        'bk_lr_ratio': 1.0,
        # optimizer
        'optimizer': 'sgd',
        'momentum': 0.9,
        'weight_decay': 1e-4,
        'warmup': 'linear',
        'wp_iter': 1000,
        'warmup_factor': 0.00066667,
        'epoch': {
            '1x': {'max_epoch': 12, 
                    'lr_epoch': [8, 11], 
                    'multi_scale': None},
            '2x': {'max_epoch': 24, 
                    'lr_epoch': [16, 22], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
            '3x': {'max_epoch': 36, 
                    'lr_epoch': [24, 33], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
        },
    },

    'fcos101-ota': {
        # input
        'train_min_size': 800,
        'train_max_size': 1333,
        'test_min_size': 800,
        'test_max_size': 1333,
        'format': 'RGB',
        'pixel_mean': [0.485, 0.456, 0.406],
        'pixel_std': [0.229, 0.224, 0.225],
        'transforms': {
            '1x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '2x':[{'name': 'RandomHorizontalFlip'},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}],

            '3x':[{'name': 'DistortTransform',
                   'hue': 0.1,
                   'saturation': 1.5,
                   'exposure': 1.5},
                  {'name': 'RandomHorizontalFlip'},
                  {'name': 'RandomShift', 'max_shift': 32},
                  {'name': 'JitterCrop', 'jitter_ratio': 0.3},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}]},
        'val_padding': False,
        # model
        'backbone': 'resnet101',
        'norm_type': 'FrozeBN',
        'stride': [8, 16, 32, 64, 128],
        # fpn neck
        'fpn': 'basic_fpn',
        'from_c5': False,
        'p6_feat': True,
        'p7_feat': True,
        # head
        'head_dim': 256,
        'head_norm': 'GN',
        'act_type': 'relu',
        'head': 'decoupled_head',
        'num_cls_head': 4,
        'num_reg_head': 4,
        # post process
        'conf_thresh': 0.05,
        'train_nms_thresh': 0.6,
        'test_nms_thresh': 0.5,
        'test_score_thresh': 0.35,
        # matcher
        'matcher': 'ota_matcher',
        'topk_candidate': 20,
        'eps': 0.1, 
        'max_iter': 50,
        'center_sampling_radius': 2.5,
        # loss
        'alpha': 0.25,
        'gamma': 2.0,
        'loss_cls_weight': 1.0,
        'loss_reg_weight': 2.0,
        'loss_ctn_weight': 0.5,
        # training config
        'batch_size': 16,
        'base_lr': 0.01 / 16.,
        'bk_lr_ratio': 1.0,
        # optimizer
        'optimizer': 'sgd',
        'momentum': 0.9,
        'weight_decay': 1e-4,
        'warmup': 'linear',
        'wp_iter': 1000,
        'warmup_factor': 0.00066667,
        'epoch': {
            '1x': {'max_epoch': 12, 
                    'lr_epoch': [8, 11], 
                    'multi_scale': None},
            '2x': {'max_epoch': 24, 
                    'lr_epoch': [16, 22], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
            '3x': {'max_epoch': 36, 
                    'lr_epoch': [24, 33], 
                    'multi_scale': [640, 672, 704, 736, 768, 800]},
        },
    },

    'fcos-rt-ota': { # Real Time FCOS with OTA
        # input
        'train_min_size': 640,
        'train_max_size': 640,
        'test_min_size': 640,
        'test_max_size': 640,
        'format': 'RGB',
        'pixel_mean': [0.485, 0.456, 0.406],
        'pixel_std': [0.229, 0.224, 0.225],
        'transforms': {
            '3x':[{'name': 'DistortTransform',
                   'hue': 0.1,
                   'saturation': 1.5,
                   'exposure': 1.5},
                  {'name': 'RandomHorizontalFlip'},
                  {'name': 'JitterCrop', 'jitter_ratio': 0.3},
                  {'name': 'ToTensor'},
                  {'name': 'Resize'},
                  {'name': 'Normalize'},
                  {'name': 'PadImage'}]},
        'val_padding': False,
        # model
        'backbone': 'resnet50',
        'norm_type': 'FrozeBN',
        'stride': [8, 16, 32],
        # fpn neck
        'fpn': 'pafpn',
        'fpn_norm': 'GN',
        'from_c5': False,
        'p6_feat': False,
        'p7_feat': False,
        # head
        'head_dim': 160,
        'head_norm': 'GN',
        'act_type': 'relu',
        'head': 'decoupled_head',
        'num_cls_head': 4,
        'num_reg_head': 4,
        # post process
        'conf_thresh': 0.05,
        'train_nms_thresh': 0.6,
        'test_nms_thresh': 0.5,
        'test_score_thresh': 0.5,
        # matcher
        'matcher': 'ota_matcher',
        'topk_candidate': 20,
        'eps': 0.1, 
        'max_iter': 50,
        'ctr_clamp': None,
        'center_sampling_radius': 2.5,
        # loss
        'alpha': 0.25,
        'gamma': 2.0,
        'loss_cls_weight': 1.0,
        'loss_reg_weight': 2.0,
        'loss_ctn_weight': 0.5,
        # training config
        'batch_size': 16,
        'base_lr': 0.01 / 16.,
        'bk_lr_ratio': 1.0,
        # optimizer
        'optimizer': 'sgd',
        'momentum': 0.9,
        'weight_decay': 1e-4,
        'warmup': 'linear',
        'wp_iter': 1000,
        'warmup_factor': 0.00066667,
        'epoch': {
            '3x': {'max_epoch': 37, 
                    'lr_epoch': [24, 33], 
                    'multi_scale': [256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608]},
        },
    },

}