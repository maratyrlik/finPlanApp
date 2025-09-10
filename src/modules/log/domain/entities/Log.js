export class Log {
	#id
	#createdAt
	#payload

	constructor(props) {
		this.#id = props.id
		this.#createdAt = props.createdAt
		this.#payload = props.payload
	}

	// Getters
	get id() {
		return this.#id
	}

	get createdAt() {
		return this.#createdAt
	}

	get payload() {
		return this.#payload
	}

	set payload(value) {
		this.#payload = value
	}

	// Factory methods
	static fromDatabase(data) {
		return new Log({
			id: data.id,
			createdAt: data.created_at,
			payload: data.payload,
		})
	}

	static create(payload) {
		return new Log({
			payload: payload,
		})
	}
}
