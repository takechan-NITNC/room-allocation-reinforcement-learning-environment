export class Person {
	readonly name: string;
	readonly likedPeople = new Set<Person>();
	readonly dislikedPeople = new Set<Person>();
	constructor(name: string) {
		this.name = name;
	}
	likes(...person: Person[]): void {

	}
	dislikes(...person: Person[]): void {

	}
}