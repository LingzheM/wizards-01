export function FormField({
    label,
    type = 'text',
    value,
    onChange,
    error,
    disabled,
    ...rest
}) {
    const id = `field-${label.replace(/\s/g, '-').toLowerCase()}`;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={e => onchange(e.target.value)}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                {...rest}
            />
            {error && (
                <p id={`${id}-error`} className="text-red-500 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}