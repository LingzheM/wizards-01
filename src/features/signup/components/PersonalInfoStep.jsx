import { FormField } from "../../../shared/components/FormField";
import { GENDER_OPTIONS } from "../utils/constants";

export function PersonalInfoStep({
    formData,
    updateField,
    errors,
    clearError,
    disabled
}) {
    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2">
                <FormField 
                    label="姓"
                    value={formData.lastName}
                    onChange={(val) => {
                        updateField('lastName', val);
                        clearError('lastName');
                    }}
                    error={errors.lastName}
                    disabled={disabled}
                />
                <FormField 
                    label="名"
                    value={formData.firstName}
                    onChange={(val) => {
                        updateField('firstName', val);
                        clearError('firstName');
                    }}
                    error={errors.firstName}
                    disabled={disabled}
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <FormField
                    label="性别"
                    value={formData.gender}
                    onChange={(val) => {
                        updateField('gender', val);
                        clearError('gender');
                    }}
                    error={errors.gender}
                    disabled={disabled}
                    options={GENDER_OPTIONS}
                />
                <FormField
                    label="出生日期"
                    type="date"
                    value={formData.birthDate}
                    onChange={(val) => {
                        updateField('birthMonth', val);
                        clearError('birthMonth');
                    }}
                    error={errors.birthMonth}
                    disabled={disabled}
                    max={new Date().toISOString().slice(0, 7)}
                />
            </div>
        </div>   
    );
}