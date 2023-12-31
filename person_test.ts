import { assertEquals, assertStrictEquals, assertThrows } from "./deps.ts";
import { Person } from "./person.ts";
import { ContradictoryImpressionsError } from "./contradictory_impressions_error.ts";
import { SelfImpressionError } from "./self_impression_error.ts";
Deno.test({
  name: "constructor",
  fn: function () {
    const got = new Person("高専太郎");
    assertStrictEquals(got.name, "高専太郎");
  },
});
Deno.test({
  name: "likes・dislikes（正常系）",
  fn: function () {
    const sato = new Person("佐藤");
    const suzuki = new Person("鈴木");
    const tanaka = new Person("田中");
    sato.dislikes(tanaka);
    suzuki.likes(sato, tanaka);
    tanaka.likes(sato);
    tanaka.dislikes(suzuki);
    assertEquals(sato.likedPeople, new Set<Person>());
    assertEquals(sato.dislikedPeople, new Set([tanaka]));
    assertEquals(suzuki.likedPeople, new Set([sato, tanaka]));
    assertEquals(suzuki.dislikedPeople, new Set<Person>());
    assertEquals(tanaka.likedPeople, new Set([sato]));
    assertEquals(tanaka.dislikedPeople, new Set([suzuki]));
  },
});
Deno.test({
  name: "likes・dislikes（likesで矛盾）",
  fn: function () {
    const sato = new Person("佐藤");
    const suzuki = new Person("鈴木");
    const tanaka = new Person("田中");
    sato.dislikes(tanaka);
    suzuki.likes(sato);
    tanaka.likes(sato);
    tanaka.likes(suzuki);
    assertThrows(
      function () {
        sato.likes(suzuki, tanaka);
      },
      ContradictoryImpressionsError,
      "佐藤は田中に対して矛盾した希望を持っています。",
    );
    assertEquals(sato.likedPeople, new Set<Person>());
    assertEquals(sato.dislikedPeople, new Set([tanaka]));
    assertThrows(
      function () {
        suzuki.likes(tanaka, suzuki);
      },
      SelfImpressionError,
      "自分自身（鈴木）に対して「同室希望」「同室拒否」を設定することはできません。",
    );
    assertEquals(suzuki.likedPeople, new Set([sato]));
    assertEquals(suzuki.dislikedPeople, new Set<Person>());
  },
});
Deno.test({
  name: "likes・dislikes（dislikesで矛盾）",
  fn: function () {
    const sato = new Person("佐藤");
    const suzuki = new Person("鈴木");
    const tanaka = new Person("田中");
    sato.dislikes(tanaka);
    suzuki.likes(sato, tanaka);
    tanaka.likes(suzuki);
    assertThrows(
      function () {
        tanaka.dislikes(sato, suzuki);
      },
      ContradictoryImpressionsError,
      "田中は鈴木に対して矛盾した希望を持っています。",
    );
    assertEquals(tanaka.likedPeople, new Set([suzuki]));
    assertEquals(tanaka.dislikedPeople, new Set<Person>());
    assertThrows(
      function () {
        tanaka.dislikes(sato, tanaka);
      },
      SelfImpressionError,
      "自分自身（田中）に対して「同室希望」「同室拒否」を設定することはできません。",
    );
    assertEquals(tanaka.likedPeople, new Set([suzuki]));
    assertEquals(tanaka.dislikedPeople, new Set<Person>());
  },
});
