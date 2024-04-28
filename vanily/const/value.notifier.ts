export const VALUENOTIFIER = `
class ValueNotifier{
    #value;
    initial;
    #subscribes = [];
    constructor(value) {
      this.#value = value;
      this.initial = value;
    }
    get value(){
      return this.#value;
    }
    set value(value) {
      if (this.#value != value) {
        this.#value = value;
        this.#subscribes.forEach((item) => item());
      }
    }
    subcribe = (fn) => this.#subscribes.push(fn);
    toString = () => this.#value.toString();
}
`;