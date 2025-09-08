// src/modules/auth/domain/entities/User.js
export class User {
	#id
	#email
	#firstName
	#lastName
	#createdAt
	#updatedAt
	#emailVerified
	#lastLoginAt

	constructor(props) {
		this.#id = props.id
		this.#email = props.email
		this.#firstName = props.firstName
		this.#lastName = props.lastName
		this.#createdAt = props.createdAt
		this.#updatedAt = props.updatedAt
		this.#emailVerified = props.emailVerified || false
		this.#lastLoginAt = props.lastLoginAt

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
	get emailVerified() {
		return this.#emailVerified
	}
	get lastLoginAt() {
		return this.#lastLoginAt
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
			emailVerified: data.email_verified,
			lastLoginAt: data.last_login_at,
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
			emailVerified: this.#emailVerified,
			lastLoginAt: this.#lastLoginAt,
		}
	}

	validate() {
		this.validateEmail()
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
