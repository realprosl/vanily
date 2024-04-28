import { ValueNotifier } from "./value.notifier";

// template string class
export class TemplateString {
    slice: TemplateStringsArray;
    args: any[];
  
    constructor(slice: TemplateStringsArray, args: any[]) {
      (this.slice = slice), (this.args = args);
    }
  
    // return template string composed
    composed(...value:string[]): string {
      let res: string = "";
  
      for (let i in this.slice) {
        res += this.slice[i];
        res +=
          parseInt(i) < this.args.length
            ? (value.length <= 0) 
              ? `${(this.args[i] as ValueNotifier<any>).value()}`
              : value[i]
            : "";
      }
      return res;
    }
  }