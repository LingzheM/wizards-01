// 步骤配置
export const STEPS = [
    {
        id: 1,
        title: '账户信息',
        section: 'account',
    },
    {
        id: 2,
        title: '个人信息',
        section: 'personal',
    },
    {
        id: 3,
        title: '联系信息',
        section: 'contract',
    },
    {
        id: 4,
        title: 'KYC验证',
        section: 'kyc',
    },
    {
        id: 5,
        title: '条款同意',
        section: 'terms',
    },
    {
        id: 6,
        title: '复核提交',
        section: 'review'
    }
];


// 每个步骤包含的字段
export const STEP_FIELDS = {
    1: ['email', 'password', 'otp'],
    2: ['fullName', 'birthDate', 'nationality'],
    3: ['address', 'postalCode', 'occupation'],
    4: ['idType', 'idNumber', 'idImages'],
    5: ['agreePrivacy', 'agreeRisk']
};

