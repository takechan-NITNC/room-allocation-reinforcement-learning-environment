export class NotIntegerError extends RangeError {
  readonly name = "NotIntegerError";
  constructor(valueName: string, value: number) {
    super(`${valueName}（${value}）は整数である必要があります。`);
    this.cause = {
      valueName: valueName,
      value: value,
    };
  }
}
