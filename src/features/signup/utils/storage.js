const STORAGE_KEY = 'signup_draft';
const STEP_KEY = 'signup_current_step';


export const saveDraft = (formData) => {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
        console.error('保存草稿失败', e);
    }
};

export const loadDraft = () => {
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('加载草稿失败', e);
        return null;
    }
}

export const saveCurrentStep = (step) => {
    sessionStorage.setItem(STEP_KEY, step.toString());
};

export const loadCurrentStep = () => {
    const step = sessionStorage.getItem(STEP_KEY);
    return step ? parseInt(step, 10) : 1;
};

export const clearDraft = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STEP_KEY);
};

