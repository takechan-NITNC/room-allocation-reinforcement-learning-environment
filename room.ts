import { Person } from "./person.ts";
export class Room {
	members: Person[];
	constructor(members: Person[]) {
		this.members = members;
	}
}