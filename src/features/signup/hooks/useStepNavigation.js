// useStepNavigation.js
// 正常模式, 修正模式, 锁定模式
import { useState, useEffect } from "react";
import { loadCurrentStep, saveCurrentStep } from "../utils/storage";


export function useStepNavigation(totalSteps) {
    const [step, setStep] = useState(() => loadCurrentStep());
    const [isPatching, setIsPatching] = useState(false);
    const [patchReturnStep, setPatchReturnStep] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [lockStep, setLockStep] = useState(false);

    // 自动保存当前步骤
    useEffect(() => {
        saveCurrentStep(step);
    }, [step]);

    // 前进
    const goNext = (validateCallback) => {
        if (confirmed) return false;

        // 先校验
        if (!validateCallback(step)) {
            return false;
        }

        if (isPatching) {
            // 修正模式,返回复核页
            setStep(patchReturnStep);
            setIsPatching(false);
            setPatchReturnStep(null);
        } else {
            // 正常模式: 下一步
            if (step < totalSteps) {
                setStep(step + 1);
            }
        }

        return true;
    };

    // 后退
    const goBack = () => {
        if (confirmed || isPatching) return;
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // 跳转到指定步骤
    const goToStep = (targetStep) => {
        if (confirmed && targetStep < lockStep) return;
        setStep(targetStep);
    };


    // 进入修正模式
    const startPatch = (targetStep) => {
        setIsPatching(true);
        setPatchReturnStep(totalSteps);
        setStep(targetStep);
    };

    // 最终确认
    const finalConfirm = () => {
        setConfirmed(true);
        setLockStep(step);
    };

    const unlock = () => {
        setConfirmed(false);
        setLockStep(null);
    };

    return {
        step,
        isPatching,
        confirmed,
        goNext,
        goBack,
        goToStep,
        startPatch,
        finalConfirm,
        unlock
    };

}