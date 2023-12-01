import { Person } from "./person.ts";
import { Room } from "./room.ts";
import { ImpressionStat } from "./impression_stat.ts";
import { Action } from "./action.ts";
export class Environment {
	readonly #people: Person[];
	readonly rooms: Room[] = [];
	readonly #w: number;
	readonly #d: number;
	readonly #s: number;
	readonly #a: number;
	readonly #m: number;
	readonly #evaluate: (happinesses: number[]) => number;
	constructor(people: Person[], w: number, d: number, s: number, a: number, m: number, evaluate: (happinesses: number[]) => number) {
		this.#people = people;
		this.#w = w;
		this.#d = d;
		this.#s = s;
		this.#a = a;
		this.#m = m;
		this.#evaluate = evaluate;
	}
	getState(): ImpressionStat[] {
		return [];
	}
	receive(action: Action): number {
		return 0;
	}
	getEvaluationValue(): number {
		return 0;
	}
}