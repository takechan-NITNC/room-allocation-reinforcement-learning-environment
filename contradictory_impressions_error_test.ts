import { assertEquals, assertStrictEquals } from "./deps.ts";
import {
  ContradictoryImpressionsError,
} from "./contradictory_impressions_error.ts";
import { Person } from "./person.ts";
Deno.test({
  name: "ContradictoryImpressionsErrorのconstructor",
  fn: function () {
    const from = new Person("フロム");
    const to = new Person("トゥ");
    const got = new ContradictoryImpressionsError(from, to);
    assertStrictEquals(
      got.message,
      "フロムはトゥに対して矛盾した希望を持っています。",
    );
    assertEquals(got.cause, {
      from: from,
      to: to,
    });
  },
});
