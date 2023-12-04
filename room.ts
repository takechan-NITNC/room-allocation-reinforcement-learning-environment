import { Person } from "./person.ts";
export class Room {
  static readonly CAPACITY = 3;
  readonly members: Set<Person>;
  constructor(members: Set<Person>) {
    this.members = members;
  }
}
