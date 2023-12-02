import { assertStrictEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { ImpressionStat } from "./impression_stat.ts"
Deno.test({
	name: "constructor",
	fn: function() {
		const got = new ImpressionStat(6, 8);
		assertStrictEquals(got.likeCount, 6);
		assertStrictEquals(got.dislikeCount, 8);
	}
});