// 通用校验
const required = (value, message) => {
    if (value === undefined || value === null || value === '') {
        return message;
    }

    return null;
}

export const validateEmail = (email) => {
    if (!email) return '请输入邮箱';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return '邮箱格式不正确';
    }

    return null;
};

// 邮编校验
const validatePostalCode = (postalCode) => {
    if (!postalCode) return '请输入邮编';
    if (!/^\d{3}-?\d{4}$/.test(postalCode)) {
        return '邮编需为7位数字，可包含中间的-';
    }

    return null;
};

// 验证码校验
export const validateVerificationCode = (code) => {
    if (!code) return '请输入验证码';
    if (!/^\d{6}$/.test(code)) {
        return '验证码需为6位数字';
    }

    return null;
};

const validatePassword = (password) => {
    if (!password) return '请输入密码';
    if (!/^\d{6}$/.test(password)) {
        return '密码需为6位数字';
    }

    return null;
};

export const STEP_VALIDATORS = {
    1: (formData) => {
        const errors = {};
        const nationalityError = required(formData.nationality, '请输入国籍');
        if (nationalityError) errors.nationality = nationalityError;
        
        const residenceError = required(formData.residenceCountry, '请输入在住国家/地区');
        if (residenceError) errors.residenceCountry = residenceError;
        
        return errors;
    },
    2: (formData) => {
        const errors = {};
        const lastNameError = required(formData.lastName, '请输入姓');
        if (lastNameError) errors.lastName = lastNameError;

        const firstNameError = required(formData.firstName, '请输入名');
        if (firstNameError) errors.firstName = firstNameError;

        const genderError = required(formData.gender, '请选择性别');
        if (genderError) errors.gender = genderError;

        const birthError = required(formData.birthMonth, '请选择出生年月');
        if (birthError) errors.birthMonth = birthError;

        return errors;
    },
    3: (formData) => {
        const errors = {};

        const postalError = validatePostalCode(formData.postalCode);
        if (postalError) errors.postalCode = postalError;

        const cityError = required(formData.city, '请输入市区町村');
        if (cityError) errors.city = cityError;

        const districtError = required(formData.district, '请输入丁目/番地');
        if (districtError) errors.district = districtError;

        const buildingError = required(formData.building, '请输入建物/房号');
        if (buildingError) errors.building = buildingError;

        return errors;
    },
    4: (formData) => {
        const errors = {};

        const companyNameError = required(formData.companyName, '请输入公司名称');
        if (companyNameError) errors.companyName = companyNameError;

        const companyPostalError = validatePostalCode(formData.companyPostalCode);
        if (companyPostalError) errors.companyPostalCode = companyPostalError;

        const companyAddressError = required(formData.companyAddress, '请输入公司地址');
        if (companyAddressError) errors.companyAddress = companyAddressError;

        return errors;
    },
    5: (formData) => {
        const errors = {};

        const occupationError = required(formData.occupationType, '请选择职业种类');
        if (occupationError) errors.occupationType = occupationError;

        const insuranceError = required(formData.insuranceType, '请选择保险种类');
        if (insuranceError) errors.insuranceType = insuranceError;

        return errors;
    },
    6: (formData) => {
        const errors = {};

        const passwordError = validatePassword(formData.password);
        if (passwordError) errors.password = passwordError;

        const confirmError = required(formData.passwordConfirm, '请再次输入密码');
        if (confirmError) {
            errors.passwordConfirm = confirmError;
        } else if (formData.password !== formData.passwordConfirm) {
            errors.passwordConfirm = '两次输入的密码不一致';
        }

        return errors;
    }
}