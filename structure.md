src/
├── features/
│   └── signup/
│       ├── components/                    # 步骤组件（Step1-6）
│       │   ├── AccountInfoStep.jsx       # 第1步：账户信息
│       │   ├── PersonalInfoStep.jsx      # 第2步：个人信息
│       │   ├── ContactInfoStep.jsx       # 第3步：联系信息
│       │   ├── KYCStep.jsx               # 第4步：KYC验证
│       │   ├── TermsStep.jsx             # 第5步：条款同意
│       │   ├── ReviewStep.jsx            # 第6步：复核提交
│       │   ├── ProgressBar.jsx           # 进度条组件
│       │   └── NavigationButtons.jsx     # 导航按钮组件
│       │
│       ├── hooks/                         # 自定义Hooks
│       │   ├── useSignupForm.js          # 表单状态管理
│       │   ├── useStepValidation.js      # 分步校验逻辑
│       │   ├── useStepNavigation.js      # 步骤导航逻辑
│       │   ├── useDraftPersistence.js    # 草稿持久化
│       │   ├── useOTPCountdown.js        # OTP倒计时
│       │   └── useFinalConfirm.js        # 最终确认与提交
│       │
│       ├── utils/                         # 工具函数
│       │   ├── validators.js             # 字段校验规则
│       │   ├── formatters.js             # 数据格式化（脱敏等）
│       │   ├── storage.js                # sessionStorage封装
│       │   └── constants.js              # 常量配置
│       │
│       ├── services/                      # API服务
│       │   └── signupApi.js              # 注册相关API调用
│       │
│       └── SignupWizard.jsx              # 主入口组件
│
├── shared/                                # 共享组件和工具
│   ├── components/
│   │   ├── FormField.jsx                 # 通用表单字段
│   │   ├── ErrorMessage.jsx              # 错误提示组件
│   │   └── LoadingSpinner.jsx            # 加载动画
│   │
│   └── utils/
│       └── debounce.js                   # 防抖函数
│
└── App.jsx                                # 应用根组件

