import '../../../styles/auth-basic.css'

export function AuthLayout({ children, showBrand = true }) {
	return (
		<div className="auth-layout">
			<div className="auth-layout__container">
				{showBrand && (
					<div className="auth-layout__brand">
						<div className="auth-layout__brand-logo">
							{/* You can replace this with your actual logo */}A
						</div>
						<h2 className="auth-layout__brand-name">Your App</h2>
					</div>
				)}

				{children}
			</div>
		</div>
	)
}
