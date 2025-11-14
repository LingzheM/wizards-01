import { FormField } from "../../../shared/components/FormField";

export function ResidencyStep({ formData, updateField, errors, clearError, disabled }) {
    return (
        <div>
            <FormField
                label="国籍"
                value={formData.nationality}
                onChange={(val) => {
                    updateField('nationality', val);
                    clearError('nationality');
                }}
                error={errors.nationality}
                disabled={disabled}
                placeholder="例如：日本"
            />

            <FormField
                label="在住国家/地区"
                value={formData.residenceCountry}
                onChange={(val) => {
                    updateField('residenceCountry', val);
                    clearError('residenceCountry');
                }}
                error={errors.residenceCountry}
                disabled={disabled}
                placeholder="例如：日本"
            />
        </div>
    );
}