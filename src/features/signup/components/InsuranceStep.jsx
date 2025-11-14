import { FormField } from "../../../shared/components/FormField";
import { INSURANCE_OPTIONS, OCCUPATION_OPTIONS } from "../utils/constants";

export function InsuranceStep({ formData, updateField, errors, clearError, disabled }) {
    return (
        <div>
            <FormField
                label="职业种类"
                type="select"
                value={formData.occupationType}
                onChange={(val) => {
                    updateField('occupationType', val);
                    clearError('occupationType');
                }}
                error={errors.occupationType}
                disabled={disabled}
                options={OCCUPATION_OPTIONS}
            />

            <FormField
                label="保险种类"
                type="select"
                value={formData.insuranceType}
                onChange={(val) => {
                    updateField('insuranceType', val);
                    clearError('insuranceType');
                }}
                error={errors.insuranceType}
                disabled={disabled}
                options={INSURANCE_OPTIONS}
            />
        </div>
    );
}