// src/infrastructure/repositories/AccountRepository.js
import { Repository } from './Repository.js'
import { Account } from '../../domain/entities/Account.js'

export class AccountRepository extends Repository {
	constructor() {
		super('Account', Account)
	}

	toDatabase(account) {
		return {
			name: account.name,
			description: account.description,
		}
	}
}
