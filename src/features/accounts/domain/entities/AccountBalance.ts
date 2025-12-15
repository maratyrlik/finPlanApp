import { IDatabaseRow } from '@/shared/domain/IDatabaseRow'

export interface AccountBalanceProps {
	id?: string
	createdAt?: Date
	updatedAt?: Date
	accountId: number
	toDate: Date
	amount: number
}

export interface AccountBalanceDatabaseRow {
	id?: string
	created_at?: string | Date
	updated_at?: string | Date
	account_id: number
	to_date: string | Date
	amount: number
}

export class AccountBalance
	implements IDatabaseRow<AccountBalance, AccountBalanceDatabaseRow>
{
	constructor(private readonly props: AccountBalanceProps) {
		this.validate()
	}

	// ===== GETTERS =====
	get id(): string | undefined {
		return this.props.id
	}

	get createdAt(): Date | undefined {
		return this.props.createdAt
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt
	}

	get accountId(): number {
		return this.props.accountId
	}

	get toDate(): Date {
		return this.props.toDate
	}

	get amount(): number {
		return this.props.amount
	}

	// ===== SETTERS =====
	set accountId(value: number) {
		if (this.props.id) {
			throw new Error(
				'Cannot change account ID of existing balance record'
			)
		}

		this.props.accountId = value
		this.validateAccountId()
	}

	set toDate(value: Date) {
		this.props.toDate = value
		this.validateToDate()
	}

	set amount(value: number) {
		this.props.amount = value
		this.validateAmount()
	}

	// ===== DATABASE METHODS =====
	getDatabaseTableName(): string {
		return 'AccountBalance'
	}

	fromDatabase(row: AccountBalanceDatabaseRow): AccountBalance {
		const createdAt =
			typeof row.created_at === 'string'
				? new Date(row.created_at)
				: row.created_at

		const updatedAt =
			typeof row.updated_at === 'string'
				? new Date(row.updated_at)
				: row.updated_at

		const toDate =
			typeof row.to_date === 'string'
				? new Date(row.to_date)
				: row.to_date

		return new AccountBalance({
			id: row.id,
			createdAt,
			updatedAt,
			accountId: row.account_id,
			toDate,
			amount: row.amount,
		})
	}

	toDatabase(): AccountBalanceDatabaseRow {
		return {
			id: this.id,
			created_at: this.createdAt,
			updated_at: this.updatedAt,
			account_id: this.accountId,
			to_date: this.toDate,
			amount: this.amount,
		}
	}

	// ===== UTIL =====
	toJSON() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			accountId: this.accountId,
			toDate: this.toDate,
			amount: this.amount,
		}
	}

	toString(): string {
		return `AccountBalance(id: ${this.id}, accountId: ${this.accountId}, amount: ${this.amount})`
	}

	// ===== BUSINESS LOGIC =====
	private validate(): void {
		this.validateAccountId()
		this.validateToDate()
		this.validateAmount()
	}

	private validateAccountId(): void {
		if (!this.props.accountId) {
			throw new Error('Account ID is required')
		}

		if (typeof this.props.accountId !== 'number') {
			throw new Error('Account ID must be a number')
		}
	}

	private validateToDate(): void {
		if (!this.props.toDate) {
			throw new Error('To date is required')
		}

		if (!(this.props.toDate instanceof Date)) {
			throw new Error('To date must be a valid Date')
		}

		if (this.props.toDate > new Date()) {
			throw new Error('To date cannot be in the future')
		}
	}

	private validateAmount(): void {
		if (this.props.amount === null || this.props.amount === undefined) {
			throw new Error('Amount is required')
		}

		if (typeof this.props.amount !== 'number') {
			throw new Error('Amount must be a number')
		}

		if (!Number.isFinite(this.props.amount)) {
			throw new Error('Amount must be a finite number')
		}
	}
}
