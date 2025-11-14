import { FormField } from "../../../shared/components/FormField";

export function AddressStep({
    formData,
    updateField,
    errors,
    clearError, 
    disabled
}) {
    return (
        <div>
            <FormField
                label="邮编"
                value={formData.postalCode}
                onChange={(val) => {
                    updateField('postalCode', val);
                    clearError('postalCode');
                }}
                error={errors.postalCode}
                disabled={disabled}
                placeholder="123-4567"
            />
            <div className="grid gap-4 md:grid-cols-2">
                <FormField
                    label="市区町村"
                    value={formData.city}
                    onChange={(val) => {
                        updateField('city', val);
                        clearError('city');
                    }}
                    error={errors.city}
                    disabled={disabled}
                />
                <FormField
                    label="番地"
                    value={formData.district}
                    onChange={(val) => {
                        updateField('district', val);
                        clearError('district');
                    }}
                    error={errors.district}
                    disabled={disabled}
                />
                <FormField
                    label="建物"
                    value={formData.building}
                    onChange={(val) => {
                        updateField('building', val);
                        clearError('building');
                    }}
                    error={errors.city}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}