import { METHOD_LABELS } from "../utils/constants";

//export function MethodSelectionStep({ formData, selectMethod, errors, clearError, disabled }) {
export function MethodSelectStep({currentMethod, onSelect, loading, validationError, fetchError}) {
    const handleSelect = (method) => {
        if (disabled) return;
        //const clearedFields = selectMethod(method);
        //clearedFields.forEach(field => clearError(field));

        if (loading) return;
        onSelect(method);
    };

    return (
        <div>
            <p className="text-sm text-gray-600 mb-4">
                请选择注册方式。方式A需要逐步手动填写全部信息，方式B会在继续前向后端请求基础资料并自动填入前两页内容
            </p>
            <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(METHOD_LABELS).map(([method, label]) => {
                    const isActive = currentMethod === method;
                    return (
                        <button
                            key={method}
                            type="button"
                            onClick={() => handleSelect(method)}
                            disabled={loading}
                            className={`border rounded-lg p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            } ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:border-blue-400'}`}
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
            {(validationError || fetchError) && (
                <p className="text-red-500 text-sm mt-3" role="alert">{fetchError || validationError }</p>
            )}
            {loading && (
                <p className="text-sm text-blue-600 mt-3" role="status">正在获取基础信息, 请稍候...</p>
            )}
        </div>
    );
}

export default MethodSelectStep;