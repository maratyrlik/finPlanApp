// src/infrastructure/repositories/AccountRepository.js
//import { Repository } from './Repository.js'
import { Repository } from '@/shared/infrastructure/repositories/Repository.js'
import { Account } from '@/features/accounts/domain/entities/Account.js'

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
