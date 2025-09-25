import { Name } from '../value-objects/Name.js'
import { Email } from '../value-objects/Email.js'

export class User {
	#id
	#createdAt
	#updatedAt
	#isEmailVerified
	#name
	#email

	constructor(props) {
		this.#id = props.id
		this.#email = new Email(props.email)
		this.#name = new Name(props.firstName, props.lastName)
		this.#createdAt = props.createdAt
		this.#updatedAt = props.updatedAt
		this.#isEmailVerified = props.isEmailVerified || false
	}

	// Getters
	get id() {
		return this.#id
	}
	get email() {
		return this.#email?.toString()
	}
	get firstName() {
		return this.#name?.firstName
	}
	get lastName() {
		return this.#name?.lastName
	}
	get fullName() {
		return this.#name?.fullName
	}
	get createdAt() {
		return this.#createdAt
	}
	get updatedAt() {
		return this.#updatedAt
	}
	get isEmailVerified() {
		return this.#isEmailVerified
	}

	// Setters
	set firstName(value) {
		this.#name?.firstName(value)
	}

	set lastName(value) {
		this.#name?.lastName(value)
	}

	static fromDatabase(data) {
		return new User({
			id: data.id,
			email: data.email,
			firstName: data.first_name,
			lastName: data.last_name,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
			isEmailVerified: data.is_email_verified,
		})
	}

	toJSON() {
		return {
			id: this.#id,
			email: this.#email?.toJSON(),
			name: this.#name?.toJSON(),
			createdAt: this.#createdAt,
			updatedAt: this.#updatedAt,
			isEmailVerified: this.#isEmailVerified,
		}
	}
}
