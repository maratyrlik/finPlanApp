export class Email {
	#value

	constructor(value) {
		this.#value = value?.toLowerCase()?.trim()
		this.validate()
	}

	get value() {
		return this.#value
	}

	validate() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!this.#value || !emailRegex.test(this.#value)) {
			throw new Error('Invalid email format')
		}
	}

	toString() {
		return this.#value
	}

	toJSON() {
		return this.#value
	}
}
