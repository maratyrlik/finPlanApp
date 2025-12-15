import { Repository } from '@/shared/infrastructure/repositories/Repository.ts'
import { Log } from '@/log/domain/entities/Log.ts'

export class LogService {
	static async error(payload: unknown) {
		const log = new Log({ payload: payload })
		await new Repository().save(log)
	}
}
