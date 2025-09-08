import bcrypt from 'bcryptjs'

export class PasswordService {
	static async hash(password) {
		const saltRounds = 12
		return await bcrypt.hash(password, saltRounds)
	}

	static async verify(password, hashedPassword) {
		return await bcrypt.compare(password, hashedPassword)
	}

	static validateStrength(password) {
		const errors = []

		if (!password) {
			errors.push('Password is required')
			return errors
		}

		if (password.length < 8) {
			errors.push('Password must be at least 8 characters long')
		}

		if (!/(?=.*[a-z])/.test(password)) {
			errors.push('Password must contain at least one lowercase letter')
		}

		if (!/(?=.*[A-Z])/.test(password)) {
			errors.push('Password must contain at least one uppercase letter')
		}

		if (!/(?=.*\d)/.test(password)) {
			errors.push('Password must contain at least one number')
		}

		return errors
	}
}
