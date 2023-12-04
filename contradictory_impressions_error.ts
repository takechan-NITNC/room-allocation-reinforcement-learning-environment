import { Person } from "./person.ts";
export class ContradictoryImpressionsError extends Error {
  readonly name = "ContradictoryImpressionsError";
  constructor(from: Person, to: Person) {
    super(`${from.name}は${to.name}に対して矛盾した希望を持っています。`, {
      cause: {
        from: from,
        to: to,
      },
    });
  }
}
