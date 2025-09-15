import { supabaseClient } from '@/shared/lib/supabase.js'

export class Repository {
	constructor(tableName, entityClass) {
		this.tableName = tableName
		this.entityClass = entityClass
		this.database = supabaseClient
	}

	toDatabase(entity) {
		throw new Error('toDatabase method must be implemented by child class')
	}

	async save(entity) {
		try {
			const entityData = this.toDatabase(entity)

			const { data, error } = await supabaseClient
				.from(this.tableName)
				.insert(entityData)
				.select()
				.single()

			if (error) throw error

			return this.entityClass.fromDatabase(data)
		} catch (error) {
			throw new Error(
				`Failed to save ${this.tableName}: ${error.message}`
			)
		}
	}

	async update(entity) {
		try {
			if (!entity.id) {
				throw new Error(`Cannot update ${this.tableName} without ID`)
			}

			const entityData = this.toDatabase(entity)

			const { data, error } = await supabaseClient
				.from(this.tableName)
				.update(entityData)
				.eq('id', entity.id)
				.select()
				.single()

			if (error) throw error

			return this.entityClass.fromDatabase(data)
		} catch (error) {
			throw new Error(
				`Failed to update ${this.tableName}: ${error.message}`
			)
		}
	}

	async findById(id) {
		try {
			const { data, error } = await supabaseClient
				.from(this.tableName)
				.select('*')
				.eq('id', id)
				.single()

			if (error) {
				if (error.code === 'PGRST116') {
					return null // Not found
				}
				throw error
			}

			return this.entityClass.fromDatabase(data)
		} catch (error) {
			throw new Error(
				`Failed to find ${this.tableName}: ${error.message}`
			)
		}
	}

	async findAll() {
		try {
			const { data, error } = await supabaseClient
				.from(this.tableName)
				.select('*')
				.order('created_at', { ascending: false })

			if (error) throw error

			return data.map(row => this.entityClass.fromDatabase(row))
		} catch (error) {
			throw new Error(
				`Failed to find all ${this.tableName}: ${error.message}`
			)
		}
	}

	async delete(id) {
		try {
			const { error } = await supabaseClient
				.from(this.tableName)
				.delete()
				.eq('id', id)

			if (error) throw error

			return true
		} catch (error) {
			throw new Error(
				`Failed to delete ${this.tableName}: ${error.message}`
			)
		}
	}

	async upsert(entity) {
		if (entity.id) {
			return await this.update(entity)
		} else {
			return await this.save(entity)
		}
	}
}
