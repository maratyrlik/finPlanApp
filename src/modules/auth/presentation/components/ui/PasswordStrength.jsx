export function PasswordStrength({ password }) {
	const getStrength = password => {
		if (!password) return { score: 0, label: '', color: '' }

		let score = 0
		const checks = {
			length: password.length >= 8,
			lowercase: /[a-z]/.test(password),
			uppercase: /[A-Z]/.test(password),
			number: /\d/.test(password),
			special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		}

		score = Object.values(checks).filter(Boolean).length

		if (score === 0) return { score: 0, label: '', color: '' }
		if (score <= 2) return { score, label: 'Weak', color: '#ef4444' }
		if (score <= 3) return { score, label: 'Fair', color: '#f59e0b' }
		if (score <= 4) return { score, label: 'Good', color: '#3b82f6' }
		return { score, label: 'Strong', color: '#10b981' }
	}

	const { score, label, color } = getStrength(password)

	if (!password) return null

	return (
		<div className="password-strength">
			<div className="password-strength__bar">
				{[1, 2, 3, 4, 5].map(level => (
					<div
						key={level}
						className={`password-strength__segment ${
							level <= score
								? 'password-strength__segment--active'
								: ''
						}`}
						style={{
							backgroundColor: level <= score ? color : '#e5e7eb',
						}}
					/>
				))}
			</div>
			{label && (
				<div className="password-strength__label" style={{ color }}>
					{label}
				</div>
			)}
		</div>
	)
}
