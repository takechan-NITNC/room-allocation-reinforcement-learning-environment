import {
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { NotIntegerError, NotIntegerErrorCause } from "./not_integer_error.ts";
Deno.test({
  name: "NotIntegerErrorのconstructor",
  fn: function () {
    const got = new NotIntegerError("整数じゃないといけない引数", 0.5);
    assertStrictEquals(
      got.message,
      "整数じゃないといけない引数（0.5）は整数である必要があります。",
    );
    assertEquals(
      got.cause,
      new NotIntegerErrorCause("整数じゃないといけない引数", 0.5),
    );
  },
});
Deno.test({
  name: "NotIntegerErrorCauseのconstructor",
  fn: function () {
    const got = new NotIntegerErrorCause("整数じゃないといけない引数", 1.5);
    assertStrictEquals(got.valueName, "整数じゃないといけない引数");
    assertStrictEquals(got.value, 1.5);
  },
});
