import { NotIntegerError } from "./not_integer_error.ts";
export class Action {
  readonly memberIndex1: number;
  readonly memberIndex2: number;
  constructor(memberIndex1: number, memberIndex2: number) {
    if (!Number.isInteger(memberIndex1)) {
      throw new NotIntegerError("memberIndex1", memberIndex1);
    }
    if (!Number.isInteger(memberIndex2)) {
      throw new NotIntegerError("memberIndex2", memberIndex2);
    }
    if (memberIndex1 <= 0) {
      throw new RangeError(
        `memberIndex1（${memberIndex1}）は１以上である必要があります。`,
      );
    }
    if (memberIndex2 <= 0) {
      throw new RangeError(
        `memberIndex2（${memberIndex2}）は１以上である必要があります。`,
      );
    }
    this.memberIndex1 = memberIndex1;
    this.memberIndex2 = memberIndex2;
  }
}
