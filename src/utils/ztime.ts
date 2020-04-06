export class ZTime {
  static fromString(time: string, id?: string): ZTime {
    let [h, m] = time.split(':').map((val) => parseInt(val));
    return new ZTime(h, m, id);
  }

  static fromHours(h: number, m: number = 0, id?: string): ZTime {
    return new ZTime(h, m, id);
  }

  get hours(): number {
    return this._hours;
  }
  get minutes(): number {
    return this._minutes;
  }
  get id(): string | undefined {
    return this._id;
  }
  private constructor(
    private _hours: number,
    private _minutes: number,
    private _id?: string,
  ) {}

  addDuration(duration: number): ZTime {
    let newHH = this._hours + Math.floor((this._minutes + duration) / 60);
    const newMM = (this._minutes + duration) % 60;
    return new ZTime(newHH, newMM);
  }

  isLess(zdate: ZTime) {
    return this.toMinutes() < zdate.toMinutes();
  }
  toMinutes(): number {
    return this._hours * 60 + this._minutes;
  }
  toString(): string {
    return (
      ('0' + this._hours).slice(-2) + ':' + ('0' + this._minutes).slice(-2)
    );
  }

  equals(anotherHour: ZTime): boolean {
    return (
      this._hours === anotherHour._hours &&
      this._minutes === anotherHour._minutes
    );
  }

  equalsById(anotherHour: ZTime): boolean {
    if (this._id !== undefined && anotherHour._id !== undefined) {
      return this._id === anotherHour._id;
    }
    return false;
  }

  static setDateAtTime(date: Date, time: ZTime) {
    return new Date(
      new Date(date.setUTCHours(time.hours)).setUTCMinutes(time.minutes),
    );
  }
}
