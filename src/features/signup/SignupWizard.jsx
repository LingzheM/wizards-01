import { useSignupForm } from './hooks/useSignupForm';
import { useStepValidation } from './hooks/useStepValidation';
import { useStepNavigation } from './hooks/useStepNavigation';
import { STEPS } from './utils/constants';
import { clearDraft } from './utils/storage';
import { MethodSelectionStep } from './components/MethodSelectionStep';
import { ResidencyStep } from './components/ResidencyStep';
import { PersonalInfoStep } from './components/PersonalInfoStep';
import { AddressStep } from './components/AddressStep';
import { CompanyInfoStep } from './components/CompanyInfoStep';
import { InsuranceStep } from './components/InsuranceStep';
import { ContactInfoStep } from './components/ContactInfoStep';
import { PasswordStep } from './components/PasswordStep';
import { ReviewStep } from './components/ReviewStep';
import { Stepper } from './components/Stepper';
import { StepActions } from './components/StepActions';

const STEP_COMPONENTS = {
    1: MethodSelectionStep,
    2: ResidencyStep,
    3: PersonalInfoStep,
    4: AddressStep,
    5: CompanyInfoStep,
    6: InsuranceStep,
    7: ContactInfoStep,
    8: PasswordStep,
    9: ReviewStep
};

export function SignupWizard() {
    const { formData, updateField, selectMethod } = useSignupForm();
    const { errors, validateStep, clearError } = useStepValidation(formData);
    const navigation = useStepNavigation(STEPS.length);

    const isReviewStep = navigation.step === STEPS.length;

    // 渲染当前步骤
    const renderCurrentStep = () => {
        const StepComponent = STEP_COMPONENTS[navigation.step];

        if (!StepComponent) return null;

        if (navigation.step === 1) {
            return (
                <StepComponent
                    formData={formData}
                    selectMethod={selectMethod}
                    errors={errors}
                    clearError={clearError}
                    disabled={navigation.confirmed}
                />
            );
        }

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

    const handleNext = () => {
        if (navigation.confirmed) return;

        if (isReviewStep) {
            handleFinalConfirm();
            return;
        }
        navigation.goNext((step) => validateStep(step));
    }

    const handleBack = () => {
        navigation.goBack();
    }

    const nextLabel = navigation.confirmed ? '已完成' : isReviewStep ? '确认提交' : navigation.isPatching ? '保存并前进' : '下一步';

    const showBack = navigation.step > 1 && !isReviewStep;

    const isBackDisabled = navigation.confirmed || navigation.isPatching;
    const isNextDisabled = navigation.confirmed;

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white shadow rounded-lg'>
            <Stepper steps={STEPS} currentStep={navigation.step} />
            {navigation.isPatching && !navigation.confirmed && (
                <div className='mt-4 mb-4 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded' role='status'>
                    正在修正信息，请完成当前步骤并点击“保存并前进”返回确认页。
                </div>
            )}
            <div className='mt-6'>
                {renderCurrentStep()}
            </div>

            <StepActions
                showBack={showBack}
                onBack={handleBack}
                onNext={handleNext}
                nextLabel={nextLabel}
                isBackDisabled={isBackDisabled}
                isNextDisabled={isNextDisabled}
            />
        </div>
    )

}

export default SignupWizard;