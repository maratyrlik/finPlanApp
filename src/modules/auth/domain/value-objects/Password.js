export class Password {
	#value

	constructor(value) {
		this.#value = value
		this.validate()
	}

	get value() {
		return this.#value
	}

	validate() {
		if (!this.#value) {
			throw new Error('Password is required')
		}
		if (this.#value.length < 8) {
			throw new Error('Password must be at least 8 characters long')
		}
		if (!/(?=.*[a-z])/.test(this.#value)) {
			throw new Error(
				'Password must contain at least one lowercase letter'
			)
		}
		if (!/(?=.*[A-Z])/.test(this.#value)) {
			throw new Error(
				'Password must contain at least one uppercase letter'
			)
		}
		if (!/(?=.*\d)/.test(this.#value)) {
			throw new Error('Password must contain at least one number')
		}
	}

	toString() {
		return '[HIDDEN]'
	}
}
