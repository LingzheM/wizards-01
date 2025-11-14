import { FormField } from "../../../shared/components/FormField";

export function PasswordStep({ formData, updateField, errors, clearError, disabled }) {
    return (
        <div>
            <FormField
                label="六位登录密码"
                type="password"
                value={formData.password}
                onChange={(val) => {
                    updateField('password', val);
                    clearError('password');
                }}
                error={errors.password}
                disabled={disabled}
                placeholder="请输入6位数字"
                inputMode="numeric"
                pattern="\\d*"
            />

            <FormField
                label="确认密码"
                type="password"
                value={formData.passwordConfirm}
                onChange={(val) => {
                    updateField('passwordConfirm', val);
                    clearError('passwordConfirm');
                }}
                error={errors.passwordConfirm}
                disabled={disabled}
                placeholder="请再次输入密码"
                inputMode="numeric"
                pattern="\\d*"
            />
        </div>
    );
}