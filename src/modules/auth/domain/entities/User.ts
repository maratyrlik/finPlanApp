import { Email } from '../value-objects/Email.ts'
import { Name } from '../value-objects/Name.ts'
import { Serializable } from './Serializable.ts'

interface UserProps {
	id?: string
	createdAt?: Date
	updatedAt?: Date
	firstName?: string | undefined
	lastName?: string | undefined
	email?: string | undefined
	isEmailVerified?: boolean
}

export class User extends Serializable {
	private constructor(private readonly props: UserProps) {
		super()
	}

	static create(props: UserProps): User {
		return new User({
			...props,
			isEmailVerified: props.isEmailVerified ?? false,
		})
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
}
