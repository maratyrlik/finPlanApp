import { Email } from '../value-objects/Email.js'

export class EmailService {
	static isValid(email) {
		try {
			new Email(email)
			return true
		} catch (error) {
			return false
		}
	}
}
