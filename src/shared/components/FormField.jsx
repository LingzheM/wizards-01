export function FormField({
    label,
    type = 'text',
    value,
    onChange,
    error,
    disabled,
    // add at version
    options = [],
    placeholder,
    ...rest
}) {
    const id = `field-${label.replace(/\s/g, '-').toLowerCase()}`;


    const handleChange = (event) => {onChange(event.target.value);}
    let control = null;
    if (type === 'select') {
        control = (
            <select
                id={id}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                {...rest}
            >
                <option value="">请选择</option>
                {options.map(option => {
                    if (typeof option === 'string') {
                        return (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        );
                    }
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
        );
    } else {
        control = (
            <input
                id={id}
                type={type}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                {...rest}
            />
        );
    }
        
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium mb-1">
                {label}
            </label>
            {control}
            {error && (
                <p id={`${id}-error`} className="text-red-500 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}