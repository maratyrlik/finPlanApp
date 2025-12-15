export class Email {
	readonly value: string

	constructor(value: string | undefined) {
		if (value == undefined) {
			throw new Error('Undefined email')
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			throw new Error('Invalid email')
		}
		this.value = value
	}
}
