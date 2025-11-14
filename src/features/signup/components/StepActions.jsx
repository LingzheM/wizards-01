export function StepActions({
    showBack,
    onBack,
    onNext,
    nextLabel,
    isBackDisabled,
    isNextDisabled
}) {
    return (
        <div className="flex justify-between items-center mt-6">
            {showBack ? (
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isBackDisabled}
                    className={`px-4 py-2 rounded border ${
                        isBackDisabled
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-gray-400 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    上一步
                </button>
            ) : <span />}

            <button
                type="button"
                onClick={onNext}
                disabled={isNextDisabled}
                className={`px-4 py-2 rounded text-white ${
                    isNextDisabled
                        ? 'bg-blue-200 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500'
                }`}
            >
                {nextLabel}
            </button>
        </div>
    );
}