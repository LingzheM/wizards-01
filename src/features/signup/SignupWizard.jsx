import { useEffect, useState } from 'react';
import { useSignupForm } from './hooks/useSignupForm';
import { useStepValidation } from './hooks/useStepValidation';
import { useStepNavigation } from './hooks/useStepNavigation';
import { STEPS } from './utils/constants';
import { clearDraft } from './utils/storage';
import { ResidencyStep } from './components/ResidencyStep';
import { PersonalInfoStep } from './components/PersonalInfoStep';
import { AddressStep } from './components/AddressStep';
import { CompanyInfoStep } from './components/CompanyInfoStep';
import { InsuranceStep } from './components/InsuranceStep';
import { PasswordStep } from './components/PasswordStep';
import { ReviewStep } from './components/ReviewStep';
import { Stepper } from './components/Stepper';
import { StepActions } from './components/StepActions';
import {EmailVerificationScreen} from './components/EmailVerificationScreen';
import { fetchBasicInfo } from './utils/api';
import { validateEmail, validateVerificationCode } from './utils/validators';
import MethodSelectStep from './components/MethodSelectionStep';

const STEP_COMPONENTS = {
    1: ResidencyStep,
    2: PersonalInfoStep,
    3: AddressStep,
    4: CompanyInfoStep,
    5: InsuranceStep,
    6: PasswordStep,
    7: ReviewStep
};

export function SignupWizard() {
    const { formData, updateField, selectMethod } = useSignupForm();
    const { errors, validateStep, clearError } = useStepValidation(formData);
    const navigation = useStepNavigation(STEPS.length);

    const determineInitialStage = () => {
        if (!formData.email || !formData.verificationCode) {
            return 'email';
        }
        if (!formData.method) {
            return 'method';
        }
        return 'steps';
    }

    const [stage, setStage] = useState(determineInitialStage);
    const [initialErrors, setInitialErrors] = useState({});
    const [methodError, setMethodError] = useState('');
    const [methodFetchError, setMethodFetchError] = useState('');
    const [methodLoading, setMethodLoading] = useState(false);

    useEffect(() => {
        if (!formData.email || !formData.verificationCode) {
            setStage('email');
            return;
        }
        if (!formData.method) {
            setStage('method');
        }
    }, [formData.email, formData.verificationCode, formData.method]);

    const isReviewStep = navigation.step === STEPS.length;

    // 渲染当前步骤
    const renderCurrentStep = () => {
        const StepComponent = STEP_COMPONENTS[navigation.step];

        if (!StepComponent) return null;

        // if (navigation.step === 1) {
        //     return (
        //         <StepComponent
        //             formData={formData}
        //             selectMethod={selectMethod}
        //             errors={errors}
        //             clearError={clearError}
        //             disabled={navigation.confirmed}
        //         />
        //     );
        // }

        if (navigation.step === STEPS.length) {
            return (
                <StepComponent
                    formData={formData}
                    onEdit={(stepId) => navigation.startPatch(stepId)}
                    confirmed={navigation.confirmed}
                />
            );
        }

        return (
            <StepComponent
                formData={formData}
                updateField={updateField}
                errors={errors}
                clearError={clearError}
                disabled={navigation.confirmed}
            />
        );
    };

    const handleFinalConfirm = () => {
        navigation.finalConfirm();
        clearDraft();
    }

    // const handleNext = () => {
    //     if (navigation.confirmed) return;

    //     if (isReviewStep) {
    //         handleFinalConfirm();
    //         return;
    //     }
    //     navigation.goNext((step) => validateStep(step));
    // }

    // const handleBack = () => {
    //     navigation.goBack();
    // }

    const clearInitialError = (field) => {
        setInitialErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const handleEmailNext = () => {
        if (navigation.confirmed) return;
        const emailError = validateEmail(formData.email);
        const codeError = validateVerificationCode(formData.verificationCode);

        const nextErrors = {};
        if (emailError) nextErrors.email = emailError;
        if (codeError) nextErrors.verificationCode = codeError;

        setInitialErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            setStage('method');
        }
    };

    const handleMethodSelect = async (method) => {
        if (!method || navigation.confirmed) return;

        setMethodError('');
        setMethodFetchError('');

        if (method === 'B') {
            setMethodLoading(true);
            try {
                const basicInfo = await fetchBasicInfo({ email: formData.email });
                const clearedFields = selectMethod('B', basicInfo);
                clearedFields.forEach((field) => clearError(field));
            } catch (error) {
                console.error(error);
                setMethodFetchError(error?.message || '获取基础信息失败');
                const clearedFields = selectMethod(null);
                clearedFields.forEach((field) => clearError(field));
            } finally {
                setMethodLoading(false);
            }
            return;
        }

        const clearedFields = selectMethod(method);
        clearedFields.forEach((field) => clearError(field));
    };

    const handleMethodNext = () => {
        if (navigation.confirmed) return;

        if (!formData.method) {
            setMethodError('请选择注册方式');
            return;
        }

        setMethodError('');
        setStage('steps');
    }

    const handleMethodBack = () => {
        if (methodLoading || navigation.confirmed) return;
        setStage('email');
    }

    const renderContent = () => {
        if (stage === 'email') {
            return (
                <EmailVerificationScreen
                    formData={formData}
                    updateField={updateField}
                    errors={initialErrors}
                    clearError={clearInitialError}
                />
            );
        }
        if (stage === 'method') {
            return (
                <MethodSelectStep
                    currentMethod={formData.method}
                    onSelect={handleMethodSelect}
                    loading={methodLoading}
                    validationError={methodError}
                    fetchError={methodFetchError}
                />
            );
        }
        return renderCurrentStep();
    }

    const renderActions = () => {
        if (stage === 'email') {
            return (
                <StepActions
                    showBack={false}
                    onBack={() => {}}
                    onNext={handleEmailNext}
                    nextLabel="验证并继续"
                    isBackDisabled={false}
                    isNextDisabled={false}
                />
            );
        }
        if (stage === 'method') {
            return (

                <StepActions
                    showBack={showBack}
                    onBack={handleMethodBack}
                    onNext={handleMethodNext}
                    nextLabel="继续填写"
                    isBackDisabled={methodLoading}
                    isNextDisabled={methodLoading}
                />
            )
        };

        return (
            <StepActions
                showBack={showBack}
                onBack={handleBack}
                onNext={handleNext}
                nextLabel={nextLabel}
                isBackDisabled={isBackDisabled}
                isNextDisabled={isNextDisabled}
            />
        );
    }

    // const nextLabel = navigation.confirmed ? '已完成' : isReviewStep ? '确认提交' : navigation.isPatching ? '保存并前进' : '下一步';

    // const showBack = navigation.step > 1 && !isReviewStep;

    // const isBackDisabled = navigation.confirmed || navigation.isPatching;
    // const isNextDisabled = navigation.confirmed;

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white shadow rounded-lg'>

            {stage === 'steps' && <Stepper steps={STEPS} currentStep={navigation.step} />}
            {stage === 'steps' && navigation.isPatching && !navigation.confirmed && (
                <div className='mt-4 mb-4 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded' role='status'>
                    正在修正信息，请完成当前步骤并点击“保存并前进”返回确认页。
                </div>
            )}
           
            <div className='mt-6'>
                {renderContent()}
            </div>

            {renderActions()}
        </div>
    )

}

export default SignupWizard;