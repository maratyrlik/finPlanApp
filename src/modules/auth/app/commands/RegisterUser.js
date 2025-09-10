import { User } from '../../domain/entities/User.js'
import { Email } from '../../domain/value-objects/Email.js'
import { Password } from '../../domain/value-objects/Password.js'

export class RegisterUser {
	constructor(email, password, firstName, lastName) {
		this.email = email
		this.password = password
		this.firstName = firstName
		this.lastName = lastName
	}

	validate() {
		const emailObj = new Email(this.email)
		const passwordObj = new Password(this.password)

		if (!this.firstName?.trim()) {
			throw new Error('First name is required')
		}
		if (!this.lastName?.trim()) {
			throw new Error('Last name is required')
		}
		if (this.firstName.length > 50) {
			throw new Error('First name must be 50 characters or less')
		}
		if (this.lastName.length > 50) {
			throw new Error('Last name must be 50 characters or less')
		}
	}

	createUser() {
		return new User({
			email: this.email.toLowerCase().trim(),
			firstName: this.firstName.trim(),
			lastName: this.lastName.trim(),
			emailVerified: false,
		})
	}
}
