export function AuthButton({
	children,
	type = 'button',
	variant = 'primary',
	size = 'base',
	loading = false,
	disabled = false,
	fullWidth = false,
	onClick,
	...props
}) {
	const baseClasses = 'auth-button'
	const variantClasses = `auth-button--${variant}`
	const sizeClasses = size !== 'base' ? `auth-button--${size}` : ''
	const stateClasses = loading ? 'auth-button--loading' : ''
	const widthClasses = fullWidth ? 'auth-button--full-width' : ''

	const className = [
		baseClasses,
		variantClasses,
		sizeClasses,
		stateClasses,
		widthClasses,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			type={type}
			className={className}
			disabled={disabled || loading}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	)
}
