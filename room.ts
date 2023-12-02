import { Person } from "./person.ts";
export class Room {
	readonly members: Set<Person>;
	constructor(members: Set<Person>) {
		this.members = members;
	}
}