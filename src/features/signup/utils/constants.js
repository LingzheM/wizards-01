// 步骤配置
export const STEPS = [
    {
        id: 1,
        title: '注册方式',
        section: 'method',
    },
    {
        id: 2,
        title: '国籍与在住',
        section: 'residency',
    },
    {
        id: 3,
        title: '个人信息',
        section: 'perssonal',
    },
    {
        id: 4,
        title: '住址信息',
        section: 'address',
    },
    {
        id: 5,
        title: '公司信息',
        section: 'company',
    },
    {
        id: 6,
        title: '职业与保险',
        section: 'employment'
    },
        {
        id: 7,
        title: '联系方式',
        section: 'contact'
    },    {
        id: 8,
        title: '安全设置',
        section: 'security'
    },    {
        id: 9,
        title: '信息确认',
        section: 'review'
    },
];

export const METHOD_LABELS = {
    A: '方式A (手动填写)',
    B: '方式B (自动填充基础信息)'
};

export const GENDER_OPTIONS = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' },
    { value: 'other', label: '非公开' }
];

export const OCCUPATION_OPTIONS = [
    '上班族',
    '个体经营',
    '学生',
    '自由职业',
    '退休'
];

export const INSURANCE_OPTIONS = [
    '社会保险',
    '国民健康保险',
    '共济组合',
    '未加入'
];


export const REVIEW_SECTIONS = [
    {
        step: 1,
        title: '注册方式',
        fields: [
            {
                key: 'method',
                label: '注册方式',
                formatter: (value) => METHOD_LABELS[value] || ''
            }
        ]
    },
    {
        step: 2,
        title: '国际与在住',
        fields: [
            {
                key: 'nationality',
                label: '国籍',
            },
            {
                key: 'residenceCountry',
                label: '在住国家',
            },
        ]
    },
    {
        step: 3,
        title: '个人信息',
        section: 'personal',
        fields: [
            { key: 'lastName',label: '姓' },
            { key: 'firstName',label: '名' },
            {
                key: 'gender',
                label: '性别',
                formatter: (value) => {
                    const option = GENDER_OPTIONS.find(item => item.value === value);
                    return option ? option.label : '';
                }
            },
            { key: 'birthMonth',label: '出生年月' }
        ]
    },
    {
        step: 4,
        title: '住址信息',
        fields: [
            { key: 'postalCode', label: '邮编' },
            { key: 'city', label: '市区町村' },
            { key: 'district', label: '丁目/番地' },
            { key: 'building', label: '建物/房号' }
        ]
    },
    {
        step: 5,
        title: '公司信息',
        fields: [
            { key: 'companyName', label: '公司名称' },
            { key: 'companyPostalCode', label: '公司邮编' },
            { key: 'companyAddress', label: '公司地址' }
        ]
    },
    {
        step: 6,
        title: '职业与保险',
        fields: [
            { key: 'occupationType', label: '职业种类' },
            { key: 'insuranceType', label: '保险种类' }
        ]
    },
    {
        step: 7,
        title: '联系方式',
        fields: [
            { key: 'email', label: '邮箱' },
            { key: 'verificationCode', label: '验证码' }
        ]
    },
    {
        step: 8,
        title: '安全设置',
        fields: [
            { key: 'password', label: '登录密码' }
        ]
    }
]

// 每个步骤包含的字段
/**
 * 
 * export const STEP_FIELDS = {
    1: ['email', 'password', 'otp'],
    2: ['fullName', 'birthDate', 'nationality'],
    3: ['address', 'postalCode', 'occupation'],
    4: ['idType', 'idNumber', 'idImages'],
    5: ['agreePrivacy', 'agreeRisk']
};
 */

