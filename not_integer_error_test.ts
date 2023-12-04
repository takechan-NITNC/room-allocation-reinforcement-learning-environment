import { assertEquals, assertStrictEquals } from "./deps.ts";
import { NotIntegerError } from "./not_integer_error.ts";
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
      {
        valueName: "整数じゃないといけない引数",
        value: 0.5,
      },
    );
  },
});
