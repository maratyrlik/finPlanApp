// src/domain/entities/AccountBalance.js
export class AccountBalance {
	#id
	#createdAt
	#updatedAt
	#accountId
	#toDate
	#amount

	constructor(props) {
		this.#id = props.id
		this.#createdAt = props.createdAt
		this.#updatedAt = props.updatedAt
		this.#accountId = props.accountId
		this.#toDate = props.toDate
		this.#amount = props.amount
		this.validate()
	}

	// Getters
	get id() {
		return this.#id
	}

	get accountId() {
		return this.#accountId
	}

	set accountId(value) {
		if (this.#id) {
			throw new Error(
				'Cannot change account ID of existing balance record'
			)
		}
		this.#accountId = value
		this.validateAccountId()
	}

	get toDate() {
		return this.#toDate
	}

	set toDate(value) {
		this.#toDate = value
		this.validateToDate()
	}

	get amount() {
		return this.#amount
	}

	set amount(value) {
		this.#amount = value
		this.validateAmount()
	}

	get createdAt() {
		return this.#createdAt
	}

	get updatedAt() {
		return this.#updatedAt
	}

	// Factory methods
	static create(accountId, amount = 0, toDate = new Date()) {
		return new AccountBalance({
			accountId: accountId,
			toDate: toDate,
			amount: amount,
		})
	}

	static fromDatabase(data) {
		return new AccountBalance({
			id: data.id,
			createdAt: data.created_at,
			updatedAt: data.updated_at,
			accountId: data.account_id,
			toDate: data.to_date,
			amount: data.amount,
		})
	}

	// Util
	toJSON() {
		return {
			id: this.#id,
			createdAt: this.#createdAt,
			updatedAt: this.#updatedAt,
			accountId: this.#accountId,
			toDate: this.#toDate,
			amount: this.#amount,
		}
	}

	toString() {
		return `AccountBalance(id: ${this.#id}, accountId: ${this.#accountId}, amount: ${this.#amount})`
	}

	// Business logic methods
	validate() {
		this.validateAccountId()
		this.validateToDate()
		this.validateAmount()
	}

	validateAccountId() {
		if (!this.#accountId) {
			throw new Error('Account ID is required')
		}
		if (typeof this.#accountId !== 'number') {
			throw new Error('Account ID must be a number')
		}
	}

	validateToDate() {
		if (!this.#toDate) {
			throw new Error('To date is required')
		}
		if (!(this.#toDate instanceof Date)) {
			//throw new Error('To date must be a valid Date object')
		}
		if (this.#toDate > new Date()) {
			throw new Error('To date cannot be in the future')
		}
	}

	validateAmount() {
		if (this.#amount === null || this.#amount === undefined) {
			throw new Error('Amount is required')
		}
		if (typeof this.#amount !== 'number') {
			throw new Error('Amount must be a number')
		}
		if (!isFinite(this.#amount)) {
			throw new Error('Amount must be a finite number')
		}
	}
}
