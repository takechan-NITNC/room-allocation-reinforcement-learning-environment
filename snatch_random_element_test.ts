import { assert } from "./deps.ts";
import { snatchRandomElement } from "./snatch_random_element.ts";

Deno.test({
  name: "テスト",
  fn: function () {
    for (let i = 0; i < 1000000; i++) {
      const array = [1, 2, 3];
      const set = new Set<number>(array);
      const got = snatchRandomElement(set);
      assert(array.includes(got), `${got}は[${array}]に含まれているはずです。`);
      assert(!set.has(got), `${got}は[${[...set]}]に含まれていないはずです。`);
    }
  },
});
