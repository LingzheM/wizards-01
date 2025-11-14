export function Stepper({ steps, currentStep }) {
    return (
        <ol className="flex flex-wrap gap-3" aria-label="注册进度">
            {steps.map((step) => {
                const isCurrent = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                const baseClass = 'px-3 py-1 rounded-full text-sm border transition-colors';
                const className = isCurrent
                    ? `${baseClass} border-blue-600 bg-blue-600 text-white`
                    : isCompleted
                        ? `${baseClass} border-blue-200 bg-blue-50 text-blue-600`
                        : `${baseClass} border-gray-300 text-gray-600`;

                return (
                    <li key={step.id} className={className}>
                        <span className="font-medium">{step.title}</span>
                    </li>
                );
            })}
        </ol>
    );
}