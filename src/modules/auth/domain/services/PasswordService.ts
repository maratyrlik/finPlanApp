import bcrypt from 'bcryptjs'

export class PasswordService {
	private static readonly SALT_ROUNDS = 12

	static async hash(password: string): Promise<string> {
		return bcrypt.hash(password, this.SALT_ROUNDS)
	}

	static async verify(
		password: string,
		hashedPassword: string
	): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword)
	}

	static validateStrength(password: string | undefined): string[] {
		const errors: string[] = []

		if (!password) {
			errors.push('Password is required')
			return errors
		}

		if (!/(?=.*\d)/.test(password)) {
			errors.push('Password must contain at least one number')
		}

		if (!/(?=.*[A-Z])/.test(password)) {
			errors.push('Password must contain at least one uppercase letter')
		}

		if (!/(?=.*[a-z])/.test(password)) {
			errors.push('Password must contain at least one lowercase letter')
		}

		if (password.length < 8) {
			errors.push('Password must be at least 8 characters long')
		}

		return errors
	}
}
