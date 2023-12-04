export class NotIntegerError extends RangeError {
  readonly name = "NotIntegerError";
  constructor(valueName: string, value: number) {
    super(`${valueName}（${value}）は整数である必要があります。`);
    this.cause = new NotIntegerErrorCause(valueName, value);
  }
}
export class NotIntegerErrorCause {
  readonly valueName: string;
  readonly value: number;
  constructor(valueName: string, value: number) {
    this.valueName = valueName;
    this.value = value;
  }
}
