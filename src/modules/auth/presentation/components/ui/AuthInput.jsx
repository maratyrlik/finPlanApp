import { forwardRef } from 'react'

export const AuthInput = forwardRef(function AuthInput(
	{
		label,
		type = 'text',
		value,
		onChange,
		error,
		placeholder,
		required = false,
		disabled = false,
		autoComplete,
		...props
	},
	ref
) {
	const handleChange = e => {
		if (onChange) {
			onChange(e.target.value)
		}
	}

	return (
		<div className={`auth-input ${error ? 'auth-input--error' : ''}`}>
			{label && (
				<label
					className={`auth-input__label ${required ? 'auth-input__label--required' : ''}`}
					htmlFor={props.id}
				>
					{label}
				</label>
			)}

			<input
				ref={ref}
				type={type}
				value={value || ''}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disabled}
				autoComplete={autoComplete}
				className="auth-input__field"
				{...props}
			/>

			{error && <div className="auth-input__error">{error}</div>}
		</div>
	)
})
