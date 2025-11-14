import { FormField } from "../../../shared/components/FormField";

export function CompanyInfoStep({ formData, updateField, errors, clearError, disabled }) {
    return (
        <div>
            <FormField
                label="公司名称"
                value={formData.companyName}
                onChange={(val) => {
                    updateField('companyName', val);
                    clearError('companyName');
                }}
                error={errors.companyName}
                disabled={disabled}
            />

            <FormField
                label="公司邮编"
                value={formData.companyPostalCode}
                onChange={(val) => {
                    updateField('companyPostalCode', val);
                    clearError('companyPostalCode');
                }}
                error={errors.companyPostalCode}
                disabled={disabled}
                placeholder="例如：123-4567"
            />

            <FormField
                label="公司地址"
                value={formData.companyAddress}
                onChange={(val) => {
                    updateField('companyAddress', val);
                    clearError('companyAddress');
                }}
                error={errors.companyAddress}
                disabled={disabled}
            />
        </div>
    );
}