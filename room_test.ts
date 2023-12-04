import { assertEquals } from "./deps.ts";
import { Person } from "./person.ts";
import { Room } from "./room.ts";
Deno.test({
  name: "constructor",
  fn: function () {
    const got = new Room(
      new Set([
        new Person("人間１"),
        new Person("人間２"),
        new Person("人間３"),
      ]),
    );
    assertEquals(
      got.members,
      new Set([
        new Person("人間１"),
        new Person("人間２"),
        new Person("人間３"),
      ]),
    );
  },
});
