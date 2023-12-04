import { assertStrictEquals } from "./deps.ts";
import { ImpressionStat } from "./impression_stat.ts";
Deno.test({
  name: "constructor",
  fn: function () {
    const got = new ImpressionStat(6, 8);
    assertStrictEquals(got.likeCount, 6);
    assertStrictEquals(got.dislikeCount, 8);
  },
});
