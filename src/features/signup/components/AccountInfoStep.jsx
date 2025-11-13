import { FormField } from "../../../shared/components/FormField";

export function AccountInfoStep({
    formData,
    updateField,
    errors,
    clearError,
    disabled
}) {
    return (
        <div className="space-y-4">
            <FormField 
                label="电子邮箱"
                value={formData.email}
                onChange={(val) => {
                    updateField('email', val);
                    clearError('email');
                }}
                error={errors.fullName}
                disabled={disabled}
            />

            <FormField
                label="密码"
                type="password"
                value={formData.password}
                onChange={(val) => {
                    updateField('password', val);
                    clearError('password');
                }}
                error={errors.fullName}
                disabled={disabled}
            />
            <FormField
                label="验证码"
                value={formData.otp}
                onChange={(val) => {
                    updateField('otp', val);
                    clearError('otp');
                }}
                error={errors.fullName}
                disabled={disabled}
            />
        </div>
    );
}