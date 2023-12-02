import { Person } from "./person.ts";
import { Room } from "./room.ts";
import { ImpressionStat } from "./impression_stat.ts";
import { Action } from "./action.ts";
import { NotIntegerError } from "./not_integer_error.ts";
import { snatchRandomElement } from "./snatch_random_element.ts";
export class Environment {
	readonly rooms = new Set<Room>();
	#attendedRooms: Room[] = [];
	#movablePeople: Person[] = [];
	readonly #w: number;
	readonly #d: number;
	readonly #s: number;
	readonly #a: number;
	readonly #m: number;
	readonly #evaluate: (happinesses: number[]) => number;
	#draw() {
		const snatchedRooms = new Set([...this.rooms]);
		this.#attendedRooms = [];
		for (let i = 0; i < this.#a; i++) {
			this.#attendedRooms.push(snatchRandomElement(snatchedRooms));
		}
		this.#movablePeople = [];
		for (const attendedRoom of this.#attendedRooms) {
			const snatchedMembers = new Set([...attendedRoom.members]);
			for (let i = 0; i < this.#m; i++) {
				this.#movablePeople.push(snatchRandomElement(snatchedMembers));
			}
		}
	}
	constructor(people: Set<Person>, w: number, d: number, s: number, a: number, m: number, evaluate: (happinesses: number[]) => number) {
		if (people.size % Room.CAPACITY !== 0) {
			throw new RangeError(`人数（${people.size}）は${Room.CAPACITY}で割り切れる必要があります。`);
		}
		const snatched = new Set([...people]);
		for (let i = 0; i < people.size / Room.CAPACITY; i++) {
			const members = new Set<Person>();
			for (let j = 0; j < Room.CAPACITY; j++) {
				members.add(snatchRandomElement(snatched));
			}
			this.rooms.add(new Room(members));
		}
		this.#w = w;
		this.#d = d;
		this.#s = s;
		if (!Number.isInteger(a)) {
			throw new NotIntegerError("attended roomsの数", a);
		}
		if (!(a >= 2 && a <= people.size / 3)) {
			throw new RangeError(`attended roomsの数（${a}）は2～${people.size / 3}である必要があります。`);
		}
		this.#a = a;
		if (!Number.isInteger(m)) {
			throw new NotIntegerError("movable peopleの人数", m);
		}
		if (!(m >= 1 && m <= 3)) {
			throw new RangeError(`movable peopleの人数（${m}）は１～３である必要があります。`)
		}
		this.#m = m;
		this.#evaluate = evaluate;
		this.#draw();
	}
	getState(): ImpressionStat[][] {
		return this.#movablePeople.map((movablePerson) => {
			return this.#attendedRooms.map(function(attendedRoom) {
				return new ImpressionStat(
					[...attendedRoom.members].filter(function(member) {
						return member.likedPeople.has(movablePerson);
					}).length,
					[...attendedRoom.members].filter(function(member) {
						return member.dislikedPeople.has(movablePerson);
					}).length
				);
			});
		});
	}
	#getHappiness(person: Person, room: Room): number {
		return [...room.members].reduce((previous, current) => {
			if (person.likedPeople.has(current)) {
				return previous + this.#w;
			} else if (person.dislikedPeople.has(current)) {
				return previous + this.#d;
			} else {
				return previous + this.#s;
			}
		}, 0);
	}
	getEvaluationValue(): number {
		return this.#evaluate([...this.rooms].flatMap((room) => {
			return [...room.members].map((member) => {
				return this.#getHappiness(member, room);
			}, 0);
		}));
	}
	receive(action: Action): number {
		if (!(action.memberIndex1 > 0 && action.memberIndex1 <= this.#m * this.#a)) {
			throw new RangeError(`memberIndex1（${action.memberIndex1}）は${this.#m * this.#a}以下である必要があります。`);
		}
		if (!(action.memberIndex2 > 0 && action.memberIndex2 <= this.#m * this.#a)) {
			throw new RangeError(`memberIndex2（${action.memberIndex2}）は${this.#m * this.#a}以下である必要があります。`);
		}
		const evaluationValue = this.getEvaluationValue();
		const room1 = this.#attendedRooms.find((attendedRoom) => {
			return attendedRoom.members.has(this.#movablePeople[action.memberIndex1 - 1]);
		})!;
		const room2 = this.#attendedRooms.find((attendedRoom) => {
			return attendedRoom.members.has(this.#movablePeople[action.memberIndex2 - 1]);
		})!;
		room1.members.delete(this.#movablePeople[action.memberIndex1 - 1]);
		room2.members.delete(this.#movablePeople[action.memberIndex2 - 1]);
		room1.members.add(this.#movablePeople[action.memberIndex2 - 1]);
		room2.members.add(this.#movablePeople[action.memberIndex1 - 1]);
		this.#draw();
		return this.getEvaluationValue() - evaluationValue;
	}
}