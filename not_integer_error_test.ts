import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { NotIntegerError, NotIntegerErrorCause } from "./not_integer_error.ts";
Deno.test({
	name: "constructor",
	fn: function() {
		const got = new NotIntegerError("整数じゃないといけない引数", 0.5);
		assertStrictEquals(got.message, "整数じゃないといけない引数（0.5）は整数である必要があります。");
		assertEquals(got.cause, new NotIntegerErrorCause("整数じゃないといけない引数", 0.5));
	}
})