import { assertStrictEquals, assertThrows } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { Action } from "./action.ts";
import { NotIntegerError } from "./not_integer_error.ts";

Deno.test({
	name: "constructor（正常系）",
	fn: function() {
		const got = new Action(6, 1);
		assertStrictEquals(got.memberIndex1, 6);
		assertStrictEquals(got.memberIndex2, 1);
	}
});
Deno.test({
	name: "constructor（memberIndex1が整数じゃない）",
	fn: function() {
		assertThrows(function() {
			new Action(8.5, 5);
		}, NotIntegerError, "memberIndex1（8.5）は整数である必要があります。");
	}
});
Deno.test({
	name: "constructor（memberIndex2が整数じゃない）",
	fn: function() {
		assertThrows(function() {
			new Action(7, 5.5);
		}, NotIntegerError, "memberIndex2（5.5）は整数である必要があります。");
	}
});
Deno.test({
	name: "constructor（memberIndex1が０以下）",
	fn: function() {
		assertThrows(function() {
			new Action(0, 8);
		}, RangeError, "memberIndex1（0）は１以上である必要があります。");
	}
});
Deno.test({
	name: "constructor（memberIndex2が０以下）",
	fn: function() {
		assertThrows(function() {
			new Action(8, 0);
		}, RangeError, "memberIndex2（0）は１以上である必要があります。");
	}
});