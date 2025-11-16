import FormField from '../../../shared/components/FormField';

export function EmailVerificationScreen({ formData, updateField, errors, clearError }) {
    return (
        <div>
            <p className='text-sm text-gray-600 mb-4'>
                请先输入用于注册的邮箱地址并完成验证码验证。验证通过后可继续选择注册方式。
            </p>
            <FormField
                label="邮箱"
                type="email"
                value={formData.email}
                onChange={(val) => {
                    updateField('email', val);
                    clearError('email');
                }}
                errors={errors.email}
                placeholder="example@email.com"
            />

            <FormField
                label="验证码"
                value={formData.verificationCode}
                onChange={(val) => {
                    updateField('verificationCode', val);
                    clearError('verificationCode');
                }}
                errors={errors.verificationCode}
            />
        </div>
    );
}

export default EmailVerificationScreen;
