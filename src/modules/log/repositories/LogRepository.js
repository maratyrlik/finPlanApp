import { Repository } from '../../../shared/infrastructure/repositories/Repository.js'
import { Log } from '../domain/entities/Log.js'

export class LogRepository extends Repository {
	constructor() {
		super('Log', Log)
	}

	toDatabase(log) {
		return {
			payload: log.payload,
		}
	}
}
