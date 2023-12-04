import { Person } from "./person.ts";
export class SelfImpressionError extends Error {
	readonly name = "SelfImpressionError";
	constructor(cause: Person) {
		super(`自分自身（${cause.name}）に対して「同室希望」「同室拒否」を設定することはできません。`, {
			cause: cause
		});
	}
}