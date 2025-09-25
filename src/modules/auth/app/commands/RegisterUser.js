import { User } from '@/auth/domain/entities/User.js'

export class RegisterUser {
	constructor(email, password, firstName, lastName) {
		this.email = email
		this.password = password
		this.firstName = firstName
		this.lastName = lastName
	}

	createUser() {
		return new User({
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			emailVerified: false,
		})
	}
}
