import { IDatabaseRow } from '@/shared/domain/IDatabaseRow.ts'
import { Email } from '../value-objects/Email.ts'
import { Name } from '../value-objects/Name.ts'
import { Serializable } from '@/shared/domain/Serializable'

interface UserProps {
	id?: string
	createdAt?: Date
	updatedAt?: Date
	firstName?: string | undefined
	lastName?: string | undefined
	email?: string | undefined
	isEmailVerified?: boolean
}
export interface UserDatabaseRow {
	id?: string
	created_at?: string | Date
	updated_at?: string | Date
	user_metadata?: UserDatabaseMetadataRow
}
export interface UserDatabaseMetadataRow {
	first_name?: string
	last_name?: string
}
export class User
	extends Serializable
	implements IDatabaseRow<User, UserDatabaseRow>
{
	private constructor(private readonly props: UserProps) {
		super()
	}

	static create(props: UserProps): User {
		return new User({
			...props,
			isEmailVerified: props.isEmailVerified ?? false,
		})
	}

	static createFromDatabase(props: UserDatabaseRow): User {
		return new User({}).fromDatabase(props)
	}

	// Getters
	get id(): string | undefined {
		return this.props.id
	}
	get email(): string | undefined {
		return this.props.email
	}
	get firstName(): string | undefined {
		return this.props.firstName
	}
	get lastName(): string | undefined {
		return this.props.lastName
	}
	get fullName(): string | undefined {
		const name = new Name(this.firstName, this.lastName)
		return name.fullName
	}
	get createdAt(): Date | undefined {
		return this.props.createdAt
	}
	get updatedAt(): Date | undefined {
		return this.props.updatedAt
	}
	get isEmailVerified(): boolean {
		return this.props.isEmailVerified ?? false
	}

	//Setters
	set id(value: string) {
		this.props.id = value
	}
	set email(value: string | undefined) {
		if (value != undefined) {
			this.props.email = new Email(value).value
		} else {
			this.props.email = undefined
		}
	}
	set firstName(value: string | undefined) {
		if (value != undefined) {
			Name.validateLastName(value)
			this.props.firstName = value
		} else {
			this.props.firstName = undefined
		}
	}
	set lastName(value: string | undefined) {
		if (value != undefined) {
			Name.validateLastName(value)
			this.props.lastName = value
		} else {
			this.props.firstName = undefined
		}
	}

	set createdAt(value: Date) {
		this.props.createdAt = value
	}
	set updatedAt(value: Date) {
		this.props.updatedAt = value
	}
	set isEmailVerified(value: boolean) {
		this.props.isEmailVerified = value
	}

	// ===== DATABASE METHODS =====
	getDatabaseTableName(): string {
		return 'user'
	}

	fromDatabase(row: UserDatabaseRow): User {
		const createdAt =
			typeof row.created_at === 'string'
				? new Date(row.created_at)
				: row.created_at

		const updatedAt =
			typeof row.updated_at === 'string'
				? new Date(row.updated_at)
				: row.updated_at

		return new User({
			id: row.id,
			createdAt: createdAt,
			updatedAt: updatedAt,
			firstName: row.user_metadata?.first_name,
			lastName: row.user_metadata?.last_name,
		})
	}

	toDatabase(): UserDatabaseRow {
		return {
			id: this.id,
			user_metadata: {
				first_name: this.firstName,
				last_name: this.lastName,
			},
			//...
		}
	}
}
