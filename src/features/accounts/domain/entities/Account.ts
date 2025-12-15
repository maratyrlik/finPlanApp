import { IDatabaseRow } from '@/shared/domain/IDatabaseRow.ts'

export interface AccountProps {
	id?: string
	createdAt?: Date
	updatedAt?: Date
	name: string
	description?: string
}

export interface AccountDatabaseRow {
	id?: string
	created_at?: string | Date
	updated_at?: string | Date
	name: string
	description?: string
}

export class Account implements IDatabaseRow<Account, AccountDatabaseRow> {
	constructor(private readonly props: AccountProps) {
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

	get name(): string {
		return this.props.name
	}

	get description(): string | undefined {
		return this.props.description
	}

	// ===== SETTERS =====
	set name(value: string) {
		this.props.name = value?.trim()
		this.validateNameLength()
	}

	set description(value: string | undefined) {
		this.props.description = value?.trim()
		this.validateDescriptionLength()
	}

	// ===== DATABASE METHODS =====
	getDatabaseTableName(): string {
		return 'Account'
	}

	fromDatabase(row: AccountDatabaseRow): Account {
		const createdAt =
			typeof row.created_at === 'string'
				? new Date(row.created_at)
				: row.created_at

		const updatedAt =
			typeof row.updated_at === 'string'
				? new Date(row.updated_at)
				: row.updated_at

		return new Account({
			id: row.id,
			createdAt,
			updatedAt,
			name: row.name,
			description: row.description,
		})
	}

	toDatabase(): AccountDatabaseRow {
		return {
			id: this.id,
			created_at: this.createdAt,
			updated_at: this.updatedAt,
			name: this.name,
			description: this.description,
		}
	}

	// ===== UTIL =====
	toJSON() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			name: this.name,
			description: this.description,
		}
	}

	toString(): string {
		return `Account(id: ${this.id}, name: "${this.name}")`
	}

	// ===== BUSINESS LOGIC =====
	private validate(): void {
		this.validateNameLength()
		this.validateDescriptionLength()
	}

	private validateDescriptionLength(): void {
		if (this.props.description && this.props.description.length > 500) {
			throw new Error(
				'Account description must be 500 characters or less'
			)
		}
	}

	private validateNameLength(): void {
		if (!this.props.name || this.props.name.trim().length === 0) {
			throw new Error('Account name is required')
		}

		if (this.props.name.length > 100) {
			throw new Error('Account name must be 100 characters or less')
		}
	}
}
