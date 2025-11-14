import { METHOD_LABELS } from "../utils/constants";

export function MethodSelectionStep({ formData, selectMethod, errors, clearError, disabled }) {
    const handleSelect = (method) => {
        if (disabled) return;
        const clearedFields = selectMethod(method);
        clearedFields.forEach(field => clearError(field));
    };

    return (
        <div>
            <p className="text-sm text-gray-600 mb-4">
                请选择注册方式。方式A需要逐步手动填写全部信息，方式B会自动填入基础信息，之后可根据需要调整。
            </p>
            <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(METHOD_LABELS).map(([method, label]) => {
                    const isActive = formData.method === method;
                    return (
                        <button
                            key={method}
                            type="button"
                            onClick={() => handleSelect(method)}
                            disabled={disabled}
                            className={`border rounded-lg p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-blue-400'}`}
                            aria-pressed={isActive}
                        >
                            <div className="font-semibold mb-2">{label}</div>
                            <p className="text-sm text-gray-600">
                                {method === 'A'
                                    ? '所有字段均由您手动输入，适用于首次申请。'
                                    : '系统会预先填充国籍与个人信息，节省输入时间。'}
                            </p>
                        </button>
                    );
                })}
            </div>
            {errors.method && (
                <p className="text-red-500 text-sm mt-3" role="alert">{errors.method}</p>
            )}
        </div>
    );
}