import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { ContradictoryImpressionsError, ContradictoryImpressionsErrorCause } from "./contradictory_impressions_error.ts"
import { Person } from "./person.ts"
Deno.test({
	name: "ContradictoryImpressionsErrorのconstructor",
	fn: function() {
		const from = new Person("フロム");
		const to = new Person("トゥ");
		const got = new ContradictoryImpressionsError(from, to);
		assertStrictEquals(got.message, "フロムはトゥに対して矛盾した希望を持っています。");
		assertEquals(got.cause, new ContradictoryImpressionsErrorCause(from, to));
	}
});
Deno.test({
	name: "ContradictoryImpressionsErrorCauseのconstructor",
	fn: function() {
		const from = new Person("フロム");
		const to = new Person("トゥ");
		const got = new ContradictoryImpressionsErrorCause(from, to);
		assertStrictEquals(got.from, from);
		assertStrictEquals(got.to, to);
	}
});