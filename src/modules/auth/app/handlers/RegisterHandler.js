import { UserRepository } from '../../infrastructure/repositories/UserRepository.js'
import { PasswordService } from '../../domain/services/PasswordService.js'

import { LogService } from '../../../log/domain/services/LogService.js'

export class RegisterHandler {
	constructor() {
		this.userRepository = new UserRepository()
	}

	async handle(registerCommand) {
		try {
			registerCommand.validate()

			const existingUser = await this.userRepository.findByEmail(
				registerCommand.email
			)
			if (existingUser) {
				throw new Error('An account with this email already exists')
			}

			const passwordErrors = PasswordService.validateStrength(
				registerCommand.password
			)
			if (passwordErrors.length > 0) {
				throw new Error(passwordErrors[0])
			}

			const user = registerCommand.createUser()

			const hashedPassword = await PasswordService.hash(
				registerCommand.password
			)

			const savedUser = await this.userRepository.save(user)

			// TODO: Store password hash separately (when you add auth tables)
			// For now, we'll just return the user without storing password

			return {
				user: savedUser,
				message: 'Registration successful! Welcome to our platform.',
			}
		} catch (error) {
			LogService.error(error.message)
			throw error
		}
	}
}
