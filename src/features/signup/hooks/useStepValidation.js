import { useState } from "react";
import { STEP_FIELDS } from "../utils/constants";
import * as validators from "../utils/validators";

export function useStepValidation(formData) {
    const [errors, setErrors] = useState({});

    // 校验单个步骤
    const validateStep = (stepNum) => {
        const fields = STEP_FIELDS[stepNum] || [];
        const newErrors = {};

        fields.forEach(field => {
            const validator = validators[`validate${capitalize(field)}`];
            if (validator) {
                const error = validator(formData[field]);
                if (error) newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 清楚某个字段的错误
    const clearError = (field) => {
        setErrors(prev => {
            const updated = { ...prev };
            delete updated[field];
            return updated;
        });
    };

    return { errors, validateStep, clearError };
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}