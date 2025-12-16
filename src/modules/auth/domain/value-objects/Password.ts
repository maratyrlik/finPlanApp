export class Password {
	private readonly _value: string | undefined

	constructor(value: string | undefined) {
		this._value = value
		this.validate()
	}

	get value() {
		return this._value
	}

	validate() {
		if (!this._value) {
			throw new Error('Password is required')
		}
		if (this._value.length < 8) {
			throw new Error('Password must be at least 8 characters long')
		}
		if (!/(?=.*[a-z])/.test(this._value)) {
			throw new Error(
				'Password must contain at least one lowercase letter'
			)
		}
		if (!/(?=.*[A-Z])/.test(this._value)) {
			throw new Error(
				'Password must contain at least one uppercase letter'
			)
		}
		if (!/(?=.*\d)/.test(this._value)) {
			throw new Error('Password must contain at least one number')
		}
	}

	toString() {
		return '[HIDDEN]'
	}
}
