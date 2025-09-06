// src/domain/entities/Account.js

export class Account {
	#id
	#createdAt
	#updatedAt
	#name
	#description

	constructor(props) {
		this.#id = props.id
		this.#createdAt = props.createdAt
		this.#updatedAt = props.updatedAt
		this.#name = props.name
		this.#description = props.description

		this.validate()
	}

	//Getters
	get id() {
		return this.#id
	}

	get name() {
		return this.#name
	}
	set name(value) {
		this.#name = value?.trim()
		this.validateNameLength()
	}

	get description() {
		return this.#description
	}
	set description(value) {
		this.#description = value?.trim()
		this.validateDescriptionLength()
	}

	get createdAt() {
		return this.#createdAt
	}

	get updatedAt() {
		return this.#updatedAt
	}

	//Factory methods
	static fromDatabase(data) {
		return new Account({
			id: data.id,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
			name: data.name,
			description: data.description,
		})
	}

	//Util
	toJSON() {
		return {
			id: this.#id,
			createdAt: this.#createdAt,
			updatedAt: this.#updatedAt,
			name: this.#name,
			description: this.#description,
		}
	}

	toString() {
		return `Account(id: ${this.#id}, name: "${this.#name}")`
	}

	// Business logic methods
	validate() {
		this.validateNameLength()
		this.validateDescriptionLength()
	}

	validateDescriptionLength() {
		if (this.#description && this.#description.length > 500) {
			throw new Error(
				'Account description must be 500 characters or less'
			)
		}
	}

	validateNameLength() {
		if (!this.#name || this.#name.trim().length === 0) {
			throw new Error('Account name is required')
		}

		if (this.#name.length > 100) {
			throw new Error('Account name must be 100 characters or less')
		}
	}
}
