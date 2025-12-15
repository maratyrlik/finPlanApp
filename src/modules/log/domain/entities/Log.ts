import { IDatabaseRow } from '@/shared/domain/IDatabaseRow'

export interface LogProps {
	id?: string
	createdAt?: Date
	payload: unknown
}

export interface LogDatabaseRow {
	id?: string
	created_at?: string | Date
	payload: unknown
}

export class Log implements IDatabaseRow<Log, LogDatabaseRow> {
	constructor(private readonly props: LogProps) {}

	// GETTERS
	get id(): string | undefined {
		return this.props.id
	}

	get createdAt(): Date | undefined {
		return this.props.createdAt
	}

	get payload(): unknown {
		return this.props.payload
	}

	// SETTERS
	set payload(value: unknown) {
		this.props.payload = value
	}

	// DATABASE METHODS
	getDatabaseTableName(): string {
		return 'Log'
	}

	fromDatabase(row: LogDatabaseRow): Log {
		const d =
			typeof row.created_at === 'string'
				? new Date(row.created_at)
				: row.created_at
		//data conversion to some util class
		return new Log({
			id: row.id,
			createdAt: d,
			payload: row.payload,
		})
	}

	toDatabase(): LogDatabaseRow {
		return {
			id: this.id,
			created_at: this.createdAt,
			payload: this.payload,
		}
	}
}

/**
import { Log } from './src/modules/log/domain/entities/Log.ts'

const l = new Log({ payload: 'whatever' })
console.log(l)
console.log(l.id)
console.log(l.payload)
console.log(l.createdAt)

const toDB = l.toDatabase()
console.log(l.toDatabase())

const dataInDatabase = {
	id: 'log1',
	created_at: new Date(),
	payload: 'payload form DB',
}

const a = new Log({ payload: 'a' }).fromDatabase(dataInDatabase)
console.warn('maraLog -> a: ', a)
console.warn('maraLog -> a: ', a.payload)

 */
