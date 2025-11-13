// 邮箱校验
export const validateEmail = (email) => {
    if (!email) return '请输入邮箱';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return '邮箱格式不正确';
    }

    return null;
}

// 密码校验
export const validatePassword = (password) => {
    if (!password) return '请输入密码';
    if (password.length < 8) return '密码至少8位';

    return null;
}

