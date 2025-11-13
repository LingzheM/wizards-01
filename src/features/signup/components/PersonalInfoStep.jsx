import { FormField } from "../../../shared/components/FormField";

export function PersonalInfoStep({
    formData,
    updateField,
    errors,
    clearError,
    disabled
}) {
    return (
        <div className="space-y-4">
            <FormField 
                label="姓名"
                value={formData.fullName}
                onChange={(val) => {
                    updateField('fullName', val);
                    clearError('fullName');
                }}
                error={errors.fullName}
                disabled={disabled}
            />

            <FormField
                label="出生日期"
                type="date"
                value={formData.birthDate}
                onChange={(val) => {
                    updateField('birthDate', val);
                    clearError('birthDate');
                }}
                error={errors.fullName}
                disabled={disabled}
                max={new Date().toISOString().split('T')[0]}
            />
            <FormField
                label="国籍"
                value={formData.nationality}
                onChange={(val) => {
                    updateField('nationality', val);
                    clearError('nationality');
                }}
                error={errors.fullName}
                disabled={disabled}
            />
        </div>
    )
}