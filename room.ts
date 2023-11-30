import { Person } from "./person.ts";
export class Room {
	readonly members: Person[];
	constructor(members: Person[]) {
		this.members = members;
	}
}