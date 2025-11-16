import { REVIEW_SECTIONS } from "../utils/constants";

const maskPassword = (value) => (value ? '******' : '未设置');

export function ReviewStep({ formData, onEdit, confirmed }) {
    return (
        <div>
            <p className="text-sm text-gray-600 mb-4">
                请确认以下信息。如需修正，可点击对应模块的“修正”按钮返回该步骤调整。修正完成后请再次点击下一步返回此页面。
            </p>
            <div className="space-y-4">
                {REVIEW_SECTIONS.map((section) => (
                    <section key={section.step} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-800">{section.title}</h3>
                            {!confirmed && (
                                <button
                                    type="button"
                                    onClick={() => onEdit(section.step)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    修正
                                </button>
                            )}
                        </div>
                        <dl className="grid gap-2 md:grid-cols-2">
                            {section.fields.map((field) => {
                                let value = formData[field.key];

                                if (field.key === 'password') {
                                    value = maskPassword(value);
                                } else if (field.formatter) {
                                    value = field.formatter(value);
                                }

                                const displayValue = value || '未填写';

                                return (
                                    <div key={field.key} className="text-sm">
                                        <dt className="text-gray-500">{field.label}</dt>
                                        <dd className="text-gray-900">{displayValue}</dd>
                                    </div>
                                );
                            })}
                        </dl>
                    </section>
                ))}
            </div>
            {confirmed && (
                <div className="mt-6 rounded bg-green-50 border border-green-200 text-green-800 px-4 py-3" role="status">
                    信息已最终确认，流程完成。
                </div>
            )}
        </div>
    );
}