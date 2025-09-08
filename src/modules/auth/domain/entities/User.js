// src/modules/auth/domain/entities/User.js
export class User {
	#id
	#createdAt
	#updatedAt
	#email
	#isEmailVerified
	#firstName
	#lastName

	constructor(props) {
		this.#id = props.id
		this.#email = props.email
		this.#firstName = props.firstName
		this.#lastName = props.lastName
		this.#createdAt = props.createdAt
		this.#updatedAt = props.updatedAt
		this.#isEmailVerified = props.isEmailVerified || false

		this.validate()
	}

	// Getters
	get id() {
		return this.#id
	}
	get email() {
		return this.#email
	}
	get firstName() {
		return this.#firstName
	}
	get lastName() {
		return this.#lastName
	}
	get fullName() {
		return `${this.#firstName} ${this.#lastName}`.trim()
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
		this.#firstName = value?.trim()
		this.validateName(this.#firstName, 'First name')
	}

	set lastName(value) {
		this.#lastName = value?.trim()
		this.validateName(this.#lastName, 'Last name')
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
			email: this.#email,
			firstName: this.#firstName,
			lastName: this.#lastName,
			fullName: this.fullName,
			createdAt: this.#createdAt,
			updatedAt: this.#updatedAt,
			isEmailVerified: this.#isEmailVerified,
		}
	}

	validate() {
		this.validateEmail() // mohu validovat spíš přes src/modules/auth/domain/value-objects/Email.js
		this.validateName(this.#firstName, 'First name')
		this.validateName(this.#lastName, 'Last name')
	}

	validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!this.#email || !emailRegex.test(this.#email)) {
			throw new Error('Valid email is required')
		}
	}

	validateName(name, fieldName) {
		if (!name || name.trim().length === 0) {
			throw new Error(`${fieldName} is required`)
		}
		if (name.length > 50) {
			throw new Error(`${fieldName} must be 50 characters or less`)
		}
	}
}
