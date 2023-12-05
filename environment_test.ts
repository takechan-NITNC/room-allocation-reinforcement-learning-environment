import { Environment } from "./environment.ts";
import { Person } from "./person.ts";
import { NotIntegerError } from "./not_integer_error.ts";
import {
  assert,
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "./deps.ts";
import { Action } from "./action.ts";
function gcd(a: number, b: number): number {
  if (a < b) {
    const tmp = a;
    a = b;
    b = tmp;
  }
  const r = a % b;
  if (r === 0) {
    return b;
  }
  return gcd(b, r);
}
function randomBetween(lowerBound: number, upperBound: number): number {
  return lowerBound + Math.floor(Math.random() * (upperBound - lowerBound));
}
Deno.test({
  name: "constructor（正常系）",
  fn: function () {
    const people = new Set([
      new Person("人間１"),
      new Person("人間２"),
      new Person("人間３"),
      new Person("人間４"),
      new Person("人間５"),
      new Person("人間６"),
      new Person("人間７"),
      new Person("人間８"),
      new Person("人間９"),
      new Person("人間10"),
      new Person("人間11"),
      new Person("人間12"),
    ]);
    for (let i = 0; i < 1000000; i++) {
      const environment = new Environment(
        people,
        1,
        -1,
        0,
        2,
        1,
        function (happinesses) {
          return happinesses.reduce(function (previous, current) {
            return previous + current;
          });
        },
      );
      assertStrictEquals(environment.rooms.size, 4);
      assertEquals(
        new Set([...environment.rooms].flatMap(function (room) {
          return [...room.members];
        })),
        people,
      );
      assertEquals(
        environment.allowedActions,
        new Set<Action>([
          new Action(1, 1),
          new Action(1, 2),
          new Action(2, 1),
          new Action(2, 2),
        ]),
      );
    }
  },
});
Deno.test({
  name: "constructor（人数が12じゃない）",
  fn: function () {
    assertThrows(
      function () {
        new Environment(
          new Set([
            new Person("人間１"),
            new Person("人間２"),
            new Person("人間３"),
            new Person("人間４"),
            new Person("人間５"),
            new Person("人間６"),
            new Person("人間７"),
            new Person("人間８"),
            new Person("人間９"),
            new Person("人間10"),
            new Person("人間11"),
            new Person("人間12"),
            new Person("人間13"),
          ]),
          1,
          -1,
          0,
          2,
          1,
          function (happinesses) {
            return happinesses.reduce(function (previous, current) {
              return previous + current;
            });
          },
        );
      },
      RangeError,
      "人数（13）は12である必要があります。",
    );
  },
});
Deno.test({
  name: "constructor（attended roomsの数が整数じゃない）",
  fn: function () {
    assertThrows(
      function () {
        new Environment(
          new Set([
            new Person("人間１"),
            new Person("人間２"),
            new Person("人間３"),
            new Person("人間４"),
            new Person("人間５"),
            new Person("人間６"),
            new Person("人間７"),
            new Person("人間８"),
            new Person("人間９"),
            new Person("人間10"),
            new Person("人間11"),
            new Person("人間12"),
          ]),
          1,
          -1,
          0,
          6.5,
          1,
          function (happinesses) {
            return happinesses.reduce(function (previous, current) {
              return previous + current;
            });
          },
        );
      },
      NotIntegerError,
      "attended roomsの数（6.5）は整数である必要があります。",
    );
  },
});
Deno.test({
  name: "constructor（attended roomsの数が２未満）",
  fn: function () {
    assertThrows(
      function () {
        new Environment(
          new Set([
            new Person("人間１"),
            new Person("人間２"),
            new Person("人間３"),
            new Person("人間４"),
            new Person("人間５"),
            new Person("人間６"),
            new Person("人間７"),
            new Person("人間８"),
            new Person("人間９"),
            new Person("人間10"),
            new Person("人間11"),
            new Person("人間12"),
          ]),
          1,
          -1,
          0,
          1,
          1,
          function (happinesses) {
            return happinesses.reduce(function (previous, current) {
              return previous + current;
            });
          },
        );
      },
      RangeError,
      "attended roomsの数（1）は2～4である必要があります。",
    );
  },
});
Deno.test({
  name: "constructor（attended roomsの数が部屋数を超えている）",
  fn: function () {
    assertThrows(
      function () {
        new Environment(
          new Set([
            new Person("人間１"),
            new Person("人間２"),
            new Person("人間３"),
            new Person("人間４"),
            new Person("人間５"),
            new Person("人間６"),
            new Person("人間７"),
            new Person("人間８"),
            new Person("人間９"),
            new Person("人間10"),
            new Person("人間11"),
            new Person("人間12"),
          ]),
          1,
          -1,
          0,
          5,
          1,
          function (happinesses) {
            return happinesses.reduce(function (previous, current) {
              return previous + current;
            });
          },
        );
      },
      RangeError,
      "attended roomsの数（5）は2～4である必要があります。",
    );
  },
});
Deno.test({
  name: "constructor（movable peopleの人数が整数じゃない）",
  fn: function () {
    assertThrows(
      function () {
        new Environment(
          new Set([
            new Person("人間１"),
            new Person("人間２"),
            new Person("人間３"),
            new Person("人間４"),
            new Person("人間５"),
            new Person("人間６"),
            new Person("人間７"),
            new Person("人間８"),
            new Person("人間９"),
            new Person("人間10"),
            new Person("人間11"),
            new Person("人間12"),
          ]),
          1,
          -1,
          0,
          2,
          1.5,
          function (happinesses) {
            return happinesses.reduce(function (previous, current) {
              return previous + current;
            });
          },
        );
      },
      NotIntegerError,
      "movable peopleの人数（1.5）は整数である必要があります。",
    );
  },
});
Deno.test({
  name: "constructor（movable peopleの人数が１未満）",
  fn: function () {
    assertThrows(
      function () {
        new Environment(
          new Set([
            new Person("人間１"),
            new Person("人間２"),
            new Person("人間３"),
            new Person("人間４"),
            new Person("人間５"),
            new Person("人間６"),
            new Person("人間７"),
            new Person("人間８"),
            new Person("人間９"),
            new Person("人間10"),
            new Person("人間11"),
            new Person("人間12"),
          ]),
          1,
          -1,
          0,
          2,
          0,
          function (happinesses) {
            return happinesses.reduce(function (previous, current) {
              return previous + current;
            });
          },
        );
      },
      RangeError,
      "movable peopleの人数（0）は１～３である必要があります。",
    );
  },
});
Deno.test({
  name: "constructor（movable peopleの人数が３を超えている）",
  fn: function () {
    assertThrows(
      function () {
        new Environment(
          new Set([
            new Person("人間１"),
            new Person("人間２"),
            new Person("人間３"),
            new Person("人間４"),
            new Person("人間５"),
            new Person("人間６"),
            new Person("人間７"),
            new Person("人間８"),
            new Person("人間９"),
            new Person("人間10"),
            new Person("人間11"),
            new Person("人間12"),
          ]),
          1,
          -1,
          0,
          2,
          4,
          function (happinesses) {
            return happinesses.reduce(function (previous, current) {
              return previous + current;
            });
          },
        );
      },
      RangeError,
      "movable peopleの人数（4）は１～３である必要があります。",
    );
  },
});
Deno.test({
  name: "getState（a=2，m=1）",
  fn: function () {
    const people = [
      new Person("人間１"),
      new Person("人間２"),
      new Person("人間３"),
      new Person("人間４"),
      new Person("人間５"),
      new Person("人間６"),
      new Person("人間７"),
      new Person("人間８"),
      new Person("人間９"),
      new Person("人間10"),
      new Person("人間11"),
      new Person("人間12"),
    ];
    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (i === j) {
          continue;
        }
        const d = gcd(i + 1, j + 1);
        if (d === i || d === j) {
          people[i].likes(people[j]);
          people[j].likes(people[i]);
        } else if (d === 1) {
          people[i].dislikes(people[j]);
          people[j].dislikes(people[i]);
        }
      }
    }
    const environment = new Environment(
      new Set(people),
      1,
      -1,
      0,
      2,
      1,
      function (happinesses) {
        return happinesses.reduce(function (previous, current) {
          return previous + current;
        });
      },
    );
    for (let i = 0; i < 1000000; i++) {
      const state = environment.getState();
      assertStrictEquals(state.length, 2);
      assertStrictEquals(state[0].length, 2);
      assertStrictEquals(state[1].length, 2);
      assert(
        state[0][0].likeCount >= 0 && state[0][0].likeCount <= 2,
        `${state[0][0].likeCount}は０～２のはずです。`,
      );
      assert(
        state[0][0].dislikeCount >= 0 && state[0][0].dislikeCount <= 2,
        `${state[0][0].dislikeCount}は０～２のはずです。`,
      );
      assert(
        state[0][1].likeCount >= 0 && state[0][1].likeCount <= 3,
        `${state[0][1].likeCount}は０～３のはずです。`,
      );
      assert(
        state[0][1].dislikeCount >= 0 && state[0][1].dislikeCount <= 3,
        `${state[0][1].dislikeCount}は０～３のはずです。`,
      );
      assert(
        state[1][0].likeCount >= 0 && state[1][0].likeCount <= 3,
        `${state[1][0].likeCount}は０～３のはずです。`,
      );
      assert(
        state[1][0].dislikeCount >= 0 && state[1][0].dislikeCount <= 3,
        `${state[1][0].dislikeCount}は０～３のはずです。`,
      );
      assert(
        state[1][1].likeCount >= 0 && state[1][1].likeCount <= 2,
        `${state[1][1].likeCount}は０～２のはずです。`,
      );
      assert(
        state[1][1].dislikeCount >= 0 && state[1][1].dislikeCount <= 2,
        `${state[1][1].dislikeCount}は０～２のはずです。`,
      );
      const got00 = state[0][0].likeCount + state[0][0].dislikeCount;
      assert(got00 >= 0 && got00 <= 2, `${got00}は０～２のはずです。`);
      const got01 = state[0][1].likeCount + state[0][1].dislikeCount;
      assert(got01 >= 0 && got01 <= 3, `${got01}は０～３のはずです。`);
      const got10 = state[1][0].likeCount + state[1][0].dislikeCount;
      assert(got10 >= 0 && got10 <= 3, `${got10}は０～３のはずです。`);
      const got11 = state[1][1].likeCount + state[1][1].dislikeCount;
      assert(got11 >= 0 && got11 <= 2, `${got11}は０～２のはずです。`);
      environment.receive(new Action(randomBetween(1, 2), randomBetween(1, 2)));
    }
  },
});
Deno.test({
  name: "getState（a=3，m=2）",
  fn: function () {
    const people = [
      new Person("人間１"),
      new Person("人間２"),
      new Person("人間３"),
      new Person("人間４"),
      new Person("人間５"),
      new Person("人間６"),
      new Person("人間７"),
      new Person("人間８"),
      new Person("人間９"),
      new Person("人間10"),
      new Person("人間11"),
      new Person("人間12"),
    ];
    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (i === j) {
          continue;
        }
        const d = gcd(i + 1, j + 1);
        if (d === i || d === j) {
          people[i].likes(people[j]);
          people[j].likes(people[i]);
        } else if (d === 1) {
          people[i].dislikes(people[j]);
          people[j].dislikes(people[i]);
        }
      }
    }
    const environment = new Environment(
      new Set(people),
      1,
      -1,
      0,
      3,
      2,
      function (happinesses) {
        return happinesses.reduce(function (previous, current) {
          return previous + current;
        });
      },
    );
    for (let i = 0; i < 1000000; i++) {
      const state = environment.getState();
      assertStrictEquals(state.length, 6);
      assertStrictEquals(state[0].length, 3);
      assertStrictEquals(state[1].length, 3);
      assertStrictEquals(state[2].length, 3);
      assertStrictEquals(state[3].length, 3);
      environment.receive(new Action(randomBetween(1, 6), randomBetween(1, 6)));
    }
  },
});
Deno.test({
  name: "receive（正常系）",
  fn: function () {
    const people = [
      new Person("人間１"),
      new Person("人間２"),
      new Person("人間３"),
      new Person("人間４"),
      new Person("人間５"),
      new Person("人間６"),
      new Person("人間７"),
      new Person("人間８"),
      new Person("人間９"),
      new Person("人間10"),
      new Person("人間11"),
      new Person("人間12"),
    ];
    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (i === j) {
          continue;
        }
        const d = gcd(i + 1, j + 1);
        if (d === i || d === j) {
          people[i].likes(people[j]);
          people[j].likes(people[i]);
        } else if (d === 1) {
          people[i].dislikes(people[j]);
          people[j].dislikes(people[i]);
        }
      }
    }
    const environment = new Environment(
      new Set(people),
      1,
      -1,
      0,
      2,
      1,
      function (_happinesses) {
        return 9;
      },
    );
    assertStrictEquals(environment.receive(new Action(1, 2)), 0);
  },
});
Deno.test({
  name: "receive（memberIndex1が大きすぎる）",
  fn: function () {
    const environment = new Environment(
      new Set([
        new Person("人間１"),
        new Person("人間２"),
        new Person("人間３"),
        new Person("人間４"),
        new Person("人間５"),
        new Person("人間６"),
        new Person("人間７"),
        new Person("人間８"),
        new Person("人間９"),
        new Person("人間10"),
        new Person("人間11"),
        new Person("人間12"),
      ]),
      1,
      -1,
      0,
      3,
      2,
      function (_happinesses) {
        return 9;
      },
    );
    assertThrows(
      function () {
        environment.receive(new Action(7, 2));
      },
      RangeError,
      "memberIndex1（7）は6以下である必要があります。",
    );
  },
});
Deno.test({
  name: "receive（memberIndex2が大きすぎる）",
  fn: function () {
    const environment = new Environment(
      new Set([
        new Person("人間１"),
        new Person("人間２"),
        new Person("人間３"),
        new Person("人間４"),
        new Person("人間５"),
        new Person("人間６"),
        new Person("人間７"),
        new Person("人間８"),
        new Person("人間９"),
        new Person("人間10"),
        new Person("人間11"),
        new Person("人間12"),
      ]),
      1,
      -1,
      0,
      3,
      2,
      function (_happinesses) {
        return 9;
      },
    );
    assertThrows(
      function () {
        environment.receive(new Action(1, 7));
      },
      RangeError,
      "memberIndex2（7）は6以下である必要があります。",
    );
  },
});
Deno.test({
  name: "getEvaluationValue",
  fn: function () {
    const people = [
      new Person("人間１"),
      new Person("人間２"),
      new Person("人間３"),
      new Person("人間４"),
      new Person("人間５"),
      new Person("人間６"),
      new Person("人間７"),
      new Person("人間８"),
      new Person("人間９"),
      new Person("人間10"),
      new Person("人間11"),
      new Person("人間12"),
    ];
    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (i === j) {
          continue;
        }
        const d = gcd(i + 1, j + 1);
        if (d === i || d === j) {
          people[i].likes(people[j]);
          people[j].likes(people[i]);
        } else if (d === 1) {
          people[i].dislikes(people[j]);
          people[j].dislikes(people[i]);
        }
      }
    }
    const environment = new Environment(
      new Set(people),
      1,
      -1,
      0,
      2,
      1,
      function (_happinesses) {
        return 9;
      },
    );
    assertStrictEquals(environment.getEvaluationValue(), 9);
  },
});
