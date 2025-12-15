import { IDatabaseRow } from '@/shared/domain/IDatabaseRow'
import { supabaseClient } from '@/shared/lib/supabase'

export class Repository {
	constructor() {}

	async save(tableRow: IDatabaseRow<unknown, unknown>) {
		console.log('saving row-> ', tableRow)
		try {
			const tableRowData = tableRow.toDatabase()

			const { data, error } = await supabaseClient
				.from(tableRow.getDatabaseTableName())
				.insert(tableRowData)
				.select()
				.single()

			if (error) {
				throw error
			}
			console.log('saving data->', data)
			return tableRow.fromDatabase(data)
		} catch (error) {
			console.log('saving error->', error)
			throw new Error(
				`Failed to save ${tableRow.getDatabaseTableName()}: ${error}`
			)
		}
	}

	// async update(entity) {
	// 	try {
	// 		if (!entity.id) {
	// 			throw new Error(`Cannot update ${this.tableName} without ID`)
	// 		}

	// 		const entityData = this.toDatabase(entity)

	// 		const { data, error } = await supabaseClient
	// 			.from(this.tableName)
	// 			.update(entityData)
	// 			.eq('id', entity.id)
	// 			.select()
	// 			.single()

	// 		if (error) throw error

	// 		return this.entityClass.fromDatabase(data)
	// 	} catch (error) {
	// 		throw new Error(
	// 			`Failed to update ${this.tableName}: ${error.message}`
	// 		)
	// 	}
	// }

	// async findById(id) {
	// 	try {
	// 		const { data, error } = await supabaseClient
	// 			.from(this.tableName)
	// 			.select('*')
	// 			.eq('id', id)
	// 			.single()

	// 		if (error) {
	// 			if (error.code === 'PGRST116') {
	// 				return null // Not found
	// 			}
	// 			throw error
	// 		}

	// 		return this.entityClass.fromDatabase(data)
	// 	} catch (error) {
	// 		throw new Error(
	// 			`Failed to find ${this.tableName}: ${error.message}`
	// 		)
	// 	}
	// }

	// async findAll() {
	// 	try {
	// 		const { data, error } = await supabaseClient
	// 			.from(this.tableName)
	// 			.select('*')
	// 			.order('created_at', { ascending: false })

	// 		if (error) throw error

	// 		return data.map(row => this.entityClass.fromDatabase(row))
	// 	} catch (error) {
	// 		throw new Error(
	// 			`Failed to find all ${this.tableName}: ${error.message}`
	// 		)
	// 	}
	// }

	// async delete(id) {
	// 	try {
	// 		const { error } = await supabaseClient
	// 			.from(this.tableName)
	// 			.delete()
	// 			.eq('id', id)

	// 		if (error) throw error

	// 		return true
	// 	} catch (error) {
	// 		throw new Error(
	// 			`Failed to delete ${this.tableName}: ${error.message}`
	// 		)
	// 	}
	// }

	// async upsert(entity) {
	// 	if (entity.id) {
	// 		return await this.update(entity)
	// 	} else {
	// 		return await this.save(entity)
	// 	}
	// }
}
