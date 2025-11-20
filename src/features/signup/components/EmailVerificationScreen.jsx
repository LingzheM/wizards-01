import { FormField } from "../../../shared/components/FormField";

export function EmailVerificationScreen({ 
    formData, 
    updateField, 
    errors, 
    clearError,
    onSendCode,
    isSendingCode,
    sendError,
    sendSuccess,
    verificationError,
    verificationSuccess,
    isVerifying
 }) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-1">
            <div className="rounded-[calc(1.5rem-4px)] bg-white/90 p-6 shadow-sm">
                <div className="mb-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">Step 1</p>
                    <h3 className="mt-2 text-2xl font-semibold text-gray-900">验证邮箱</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        请先输入用于注册的邮箱地址并完成验证码验证。验证成功后即可继续下一步。
                    </p>
                </div>

            <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">邮箱地址</label>
                        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(event) => {
                                    updateField('email', event.target.value);
                                    clearError('email');
                                }}
                                placeholder="example@email.com"
                                className="flex-1 rounded-2xl border border-gray-200 px-4 py-2.5 text-gray-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                            <button
                                type="button"
                                onClick={onSendCode}
                                disabled={isSendingCode}
                                className={`inline-flex items-center justify-center rounded-2xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                                    isSendingCode ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                                }`}
                            >
                                {isSendingCode ? '发送中…' : '发送'}
                            </button>
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500" role="alert">
                                {errors.email}
                            </p>
                        )}
                        {sendSuccess && (
                            <p className="mt-2 text-sm text-green-600" role="status">
                                {sendSuccess}
                            </p>
                        )}
                        {sendError && (
                            <p className="mt-2 text-sm text-red-500" role="alert">
                                {sendError}
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-dashed border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-900">
                        <p className="font-medium">验证码说明</p>
                        <p className="mt-1 text-xs text-blue-700">
                            点击发送后，6 位验证码将发送至您的邮箱，请在 10 分钟内输入验证码完成验证。
                        </p>
                    </div>

                    <FormField
                        label="验证码"
                        value={formData.verificationCode}
                        onChange={(val) => {
                            updateField('verificationCode', val);
                            clearError('verificationCode');
                        }}
                        error={errors.verificationCode}
                        placeholder="请输入6位验证码"
                        inputMode="numeric"
                        maxLength={6}
                    />

                    {verificationSuccess && (
                        <p className="text-sm text-green-600" role="status">
                            {verificationSuccess}
                        </p>
                    )}
                    {verificationError && (
                        <p className="text-sm text-red-500" role="alert">
                            {verificationError}
                        </p>
                    )}
                    {isVerifying && (
                        <p className="text-sm text-blue-600" role="status">
                            正在验证，请稍候…
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmailVerificationScreen;