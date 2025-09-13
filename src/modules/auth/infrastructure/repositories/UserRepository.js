import { Repository } from '@/shared/infrastructure/repositories/Repository.js'
import { User } from '@/auth/domain/entities/User.js'

export class UserRepository extends Repository {
	constructor() {
		super('User', User)
	}

	// Convert User entity to database format
	toDatabase(user) {
		return {
			email: user.email,
			first_name: user.firstName,
			last_name: user.lastName,
			email_verified: user.emailVerified,
			password_hash: 'test', // Don't include password - that should be handled by auth system
		}
	}

	// Find user by email
	async findByEmail(email) {
		try {
			const { data, error } = await this.database
				.from(this.tableName)
				.select('*')
				.eq('email', email.toLowerCase())
				.single()

			if (error) {
				if (error.code === 'PGRST116') {
					return null // Not found
				}
				throw error
			}

			return this.entityClass.fromDatabase(data)
		} catch (error) {
			throw new Error(`Failed to find user by email: ${error.message}`)
		}
	}

	// Check if email already exists
	async emailExists(email) {
		try {
			const user = await this.findByEmail(email)
			return user !== null
		} catch (error) {
			throw new Error(`Failed to check email existence: ${error.message}`)
		}
	}
}
