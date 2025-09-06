'use client'

export default function Button({
	children,
	onClick,
	variant = 'primary',
	className = '',
}) {
	const baseStyles = 'px-4 py-2 rounded font-semibold transition'
	const variants = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-200 text-black hover:bg-gray-300',
	}

	return (
		<button
			onClick={onClick}
			className={`${baseStyles} ${variants[variant]} ${className}`}
		>
			{children}
		</button>
	)
}
