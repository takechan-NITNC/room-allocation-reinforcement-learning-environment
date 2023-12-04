import { Person } from "./person.ts";
export class ContradictoryImpressionsErrorCause {
  readonly from: Person;
  readonly to: Person;
  constructor(from: Person, to: Person) {
    this.from = from;
    this.to = to;
  }
}
export class ContradictoryImpressionsError extends Error {
  readonly name = "ContradictoryImpressionsError";
  constructor(from: Person, to: Person) {
    super(`${from.name}は${to.name}に対して矛盾した希望を持っています。`, {
      cause: new ContradictoryImpressionsErrorCause(from, to),
    });
  }
}
