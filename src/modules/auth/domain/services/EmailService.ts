import { Email } from '@/auth/domain/value-objects/Email.ts'

export class EmailService {
	static isValid(email: string | undefined) {
		try {
			new Email(email)
			return true
		} catch (error) {
			return false
		}
	}

	static validate(email: string | undefined) {
		new Email(email)
	}
}
