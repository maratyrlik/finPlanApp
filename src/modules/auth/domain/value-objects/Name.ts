export class Name {
	private _firstName: string | undefined
	private _lastName: string | undefined

	constructor(firstName: string | undefined, lastName: string | undefined) {
		this.firstName = firstName
		this.lastName = lastName
	}

	get fullName(): string {
		return `${this._firstName} ${this._lastName}`.trim()
	}
	get firstName(): string | undefined {
		return this._firstName
	}
	get lastName(): string | undefined {
		return this._lastName
	}

	// SETTERS
	set firstName(value: string | undefined) {
		this._firstName = value?.trim()
		Name.validateName(this._firstName, 'First name')
	}

	set lastName(value: string | undefined) {
		this._lastName = value?.trim()
		Name.validateName(this._lastName, 'Last name')
	}

	private static validateName(name: string | undefined, fieldName: string) {
		if (!name || name.trim().length === 0) {
			throw new Error(`${fieldName} is required`)
		}
		if (name.length > 50) {
			throw new Error(`${fieldName} must be 50 characters or less`)
		}
	}

	static validateLastName(value: string | undefined) {
		this.validateName(value, 'Last name')
	}

	static validateFirstName(value: string | undefined) {
		this.validateName(value, 'First name')
	}
}
