import { FormField } from "../../../shared/components/FormField";

export function ContactInfoStep({ formData, updateField, errors, clearError, disabled }) {
    return (
        <div>
            <FormField
                label="邮箱"
                type="email"
                value={formData.email}
                onChange={(val) => {
                    updateField('email', val);
                    clearError('email');
                }}
                error={errors.email}
                disabled={disabled}
                placeholder="example@email.com"
            />

            <FormField
                label="验证码"
                value={formData.verificationCode}
                onChange={(val) => {
                    updateField('verificationCode', val);
                    clearError('verificationCode');
                }}
                error={errors.verificationCode}
                disabled={disabled}
                placeholder="请输入6位验证码"
            />
        </div>
    );
}