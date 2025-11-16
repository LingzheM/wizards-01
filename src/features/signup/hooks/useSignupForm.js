// useSignupForm.js
// 管理整个表单的数据状态

import { useState, useEffect } from "react";
import { loadDraft, saveDraft } from "../utils/storage";

const INITIAL_FORM = {
    method: '',
    nationality: '',
    residenceCountry: '',
    lastName: '',
    firstName: '',
    gender: '',
    birthMonth: '',
    postalCode: '',
    city: '',
    district: '',
    building: '',
    companyName: '',
    companyPostalCode: '',
    companyAddress: '',
    occupationType: '',
    insuranceType: '',
    email: '',
    verificationCode: '',
    password: '',
    passwordConfirm: ''
};

const METHOD_B_PREFILL = {
    nationality: '日本',
    residenceCountry: '日本',
    lastName: '山田',
    firstName: '太郎',
    gender: 'male',
    birthMonth: '1990-01'
};

export function useSignupForm() {
    const [formData, setFormData] = useState(() => {
        // 初始化时尝试加载草稿
        const draft = loadDraft();
        return draft || { ...INITIAL_FORM };
    });

    // 更新单个字段
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const selectMethod = (method, prefillData) => {
        if (!method) {
            setFormData(prev => ({ ...prev, method: ''}));
            return ['method'];
        }

        const updates = { method };

        if (method === 'A') {
            const resetFields = Object.keys(METHOD_B_PREFILL).reduce((acc, key) => {
                acc[key] = INITIAL_FORM[key];
                return acc;
            }, {});

            setFormData(prev => ({ ...prev, ...resetFields, ...updates}));
            return ['method', ...Object.keys(resetFields)];
        }

        if (method === 'B') {
            const prefill = prefillData || METHOD_B_PREFILL;
            setFormData(prev => ({ ...prev, ...prefill, ...updates }));
            return ['method', ...Object.keys(prefill)];
        }

        setFormData(prev => ({ ...prev, ...updates }));
        return ['method'];
    }

    useEffect(() => {
        saveDraft(formData);
    }, [formData]);


    return { formData, updateField, selectMethod };
}