import { Log } from '../entities/Log.js'
import { LogRepository } from '../../repositories/LogRepository.js'

export class LogService {
	static async error(payload) {
		const log = Log.create(payload)
		const repo = new LogRepository()

		await repo.save(log)
	}
}
