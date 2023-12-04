import { ContradictoryImpressionsError } from "./contradictory_impressions_error.ts";
export class Person {
  readonly name: string;
  readonly likedPeople = new Set<Person>();
  readonly dislikedPeople = new Set<Person>();
  constructor(name: string) {
    this.name = name;
  }
  likes(...people: Person[]): void {
    for (const person of people) {
      if (this.dislikedPeople.has(person)) {
        throw new ContradictoryImpressionsError(this, person);
      }
      this.likedPeople.add(person);
    }
  }
  dislikes(...people: Person[]): void {
    for (const person of people) {
      if (this.likedPeople.has(person)) {
        throw new ContradictoryImpressionsError(this, person);
      }
      this.dislikedPeople.add(person);
    }
  }
}
