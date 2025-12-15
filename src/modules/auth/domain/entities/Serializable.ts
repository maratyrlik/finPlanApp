export abstract class Serializable {
	toJson(): string {
		return JSON.stringify(this)
	}
}
