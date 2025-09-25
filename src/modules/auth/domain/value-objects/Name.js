export class Name {
	#firstName
	#lastName

	constructor(firstName, lastName) {
		this.firstName = firstName
		this.lastName = lastName
	}

	// GETTERS
	get fullName() {
		return `${this.#firstName} ${this.#lastName}`.trim()
	}
	get firstName() {
		return this.#firstName
	}
	get lastName() {
		return this.#lastName
	}

	// SETTERS
	set firstName(value) {
		this.#firstName = value?.trim()
		this.validateName(this.#firstName, 'First name')
	}

	set lastName(value) {
		this.#lastName = value?.trim()
		this.validateName(this.#lastName, 'Last name')
	}

	validateName(name, fieldName) {
		if (!name || name.trim().length === 0) {
			throw new Error(`${fieldName} is required`)
		}
		if (name.length > 50) {
			throw new Error(`${fieldName} must be 50 characters or less`)
		}
	}

	toString() {
		return this.fullName
	}

	toJSON() {
		return {
			firstName: this.#firstName,
			lastName: this.#lastName,
		}
	}
}
