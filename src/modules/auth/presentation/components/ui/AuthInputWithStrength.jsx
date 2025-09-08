import { AuthInput } from './AuthInput.jsx'
import { PasswordStrength } from './PasswordStrength.jsx'

export function AuthInputWithStrength({ showStrength = false, ...props }) {
	const isPassword = props.type === 'password' && showStrength

	return (
		<div className="auth-input-wrapper">
			<AuthInput {...props} />
			{isPassword && props.value && (
				<PasswordStrength password={props.value} />
			)}
		</div>
	)
}
