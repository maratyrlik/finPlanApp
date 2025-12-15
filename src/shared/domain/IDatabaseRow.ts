export interface IDatabaseRow<TDomain, TDatabaseRow> {
	getDatabaseTableName(): string
	fromDatabase(databaseRow: TDatabaseRow): TDomain //make sense to make it static but not possible to have it in interface
	toDatabase(): TDatabaseRow
}
