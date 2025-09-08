import { UserRepository } from '../../infrastructure/repositories/UserRepository.js'
import { PasswordService } from '../../domain/services/PasswordService.js'

export class RegisterHandler {
	constructor() {
		this.userRepository = new UserRepository()
	}

	async handle(registerCommand) {
		try {
			// Validate the command
			registerCommand.validate()

			// Check if email already exists
			const existingUser = await this.userRepository.findByEmail(
				registerCommand.email
			)
			if (existingUser) {
				throw new Error('An account with this email already exists')
			}

			// Validate password strength
			const passwordErrors = PasswordService.validateStrength(
				registerCommand.password
			)
			if (passwordErrors.length > 0) {
				throw new Error(passwordErrors[0]) // Return first error
			}

			// Create user entity
			const user = registerCommand.createUser()

			// Hash password (store separately from user entity)
			const hashedPassword = await PasswordService.hash(
				registerCommand.password
			)

			// Save user to database
			const savedUser = await this.userRepository.save(user)

			// TODO: Store password hash separately (when you add auth tables)
			// For now, we'll just return the user without storing password

			return {
				user: savedUser,
				message: 'Registration successful! Welcome to our platform.',
			}
		} catch (error) {
			throw error
		}
	}
}
