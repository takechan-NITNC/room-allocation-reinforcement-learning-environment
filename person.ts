export class Person {
	readonly name: string;
	readonly likedPeople = Person[0];
	readonly dislikedPeople = Person[0];
	constructor(name: string) {
		this.name = name;
	}
	likes(...person: Person[]): void {

	}
	dislikes(...person: Person[]): void {

	}
}