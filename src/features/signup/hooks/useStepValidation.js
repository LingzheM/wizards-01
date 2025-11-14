import { useState } from "react";
import {STEP_VALIDATORS} from "../utils/validators";

export function useStepValidation(formData) {
    const [errors, setErrors] = useState({});

    // 校验单个步骤
    const validateStep = (stepNum) => {
        // 获取该step所需要的验证
        const validator = STEP_VALIDATORS[stepNum];

        if (!validator) {
            setErrors({});
            return true;
        }

        const newErrors = validator(formData) || {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 清除某个字段的错误
    const clearError = (field) => {
        setErrors(prev => {
            const updated = { ...prev };
            delete updated[field];
            return updated;
        });
    };

    return { errors, validateStep, clearError };
}