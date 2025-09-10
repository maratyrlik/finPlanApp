// src/infrastructure/repositories/AccountRepository.js
import { Repository } from '../../../../shared/infrastructure/repositories/Repository.js'
import { AccountBalance } from '../../domain/entities/AccountBalance.js'

export class AccountBalanceRepository extends Repository {
	constructor() {
		super('AccountBalance', AccountBalance)
	}

	toDatabase(accountBalance) {
		return {
			account_id: accountBalance.accountId,
			to_date: this.toDateString(accountBalance.toDate),
			amount: accountBalance.amount,
		}
	}

	toDateString(date) {
		return date.toISOString().split('T')[0]
	}
}
