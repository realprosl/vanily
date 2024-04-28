import { buildHash } from "../assets/core";

export class ValueNotifier<T> {
    #value: T;
    initial:T;
    hash:string

    constructor(value: T) {
      this.#value = value;
      this.initial = value;
      this.hash = buildHash('signal');
    }
    // getter value
    value(): T {
      return this.#value;
    }
    // setter value
    set(value:((v:T) =>T) | T):[string,string] {
        return [this.hash,'notifier'];
    }


}