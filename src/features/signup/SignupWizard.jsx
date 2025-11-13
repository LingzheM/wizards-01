
import { useSignupForm } from './hooks/useSignupForm';
import { useStepValidation } from './hooks/useStepValidation';
import { useStepNavigation } from './hooks/useStepNavigation';
import { STEPS } from './utils/constants';
import { AccountInfoStep } from './components/AccountInfoStep';
import { PersonalInfoStep } from './components/PersonalInfoStep';

export function SignupWizard() {
    const { formData, updateField } = useSignupForm();
    const { errors, validateStep, clearError } = useStepValidation();
    const navigation = useStepNavigation(STEPS.length);


    const handleNext = () => {
        navigation.goNext((step) => validateStep(step));
    };

    // 渲染当前步骤
    const renderCurrentStep = () => {
        const props = { formData, updateField, errors, clearError, disabled: navigation.confirmed };

        switch (navigation.step) {
            case 1: return <AccountInfoStep {...props} />;
            case 2: return <PersonalInfoStep {...props} />;

            default: return null;
        }
    };

    return (
        <div className='max-w-2xl mx-auto p-6'>
            {renderCurrentStep()}
        </div>
    )

}

export default SignupWizard