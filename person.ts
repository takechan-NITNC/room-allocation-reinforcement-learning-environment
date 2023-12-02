export class Person {
	readonly name: string;
	readonly likedPeople: Person[] = [];
	readonly dislikedPeople: Person[] = [];
	constructor(name: string) {
		this.name = name;
	}
	likes(...person: Person[]): void {

	}
	dislikes(...person: Person[]): void {

	}
}