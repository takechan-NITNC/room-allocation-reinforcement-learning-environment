import { SelfImpressionError } from "./self_impression_error.ts";
import { Person } from "./person.ts";
import { assertStrictEquals } from "./deps.ts";
Deno.test({
  name: "constructor",
  fn: function () {
    const person = new Person("高専太郎");
    const got = new SelfImpressionError(person);
    assertStrictEquals(
      got.message,
      "自分自身（高専太郎）に対して「同室希望」「同室拒否」を設定することはできません。",
    );
    assertStrictEquals(got.cause, person);
  },
});
