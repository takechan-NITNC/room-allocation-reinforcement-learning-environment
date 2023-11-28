export class Person {
	readonly name: string;
	likedPeople: Person[];
	dislikedPeople: Person[];
	constructor(name: string, likedPeople: Person[], dislikedPeople: Person[]) {
		this.name = name;
		this.likedPeople = likedPeople;
		this.dislikedPeople = dislikedPeople;
	}
}