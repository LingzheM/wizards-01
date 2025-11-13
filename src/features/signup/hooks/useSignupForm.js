// useSignupForm.js
// 管理整个表单的数据状态

import { useState, useEffect } from "react";
import { loadDraft, saveDraft } from "../utils/storage";


export function useSignupForm() {
    const [formData, setFormData] = useState(() => {
        // 初始化时尝试加载草稿
        const draft = loadDraft();
        return draft || {
            email: '', password: '', otp: '',
            fullName: '', birthDate: '', nationality: '',
            address: '', postalCode: '', occupation: '',
            idType: '', idNumber: '', idImages: [],
            agreePrivacy: false, agreeRisk: false
        };
    });

    // 更新单个字段
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        saveDraft(formData);
    }, [formData]);


    return { formData, updateField };
}