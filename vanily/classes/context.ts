import { CSS } from "./css";
import { CodeJS } from "./js";
import config from "../../vanily.config.json" with {type:"json"};

// class context
export class Context {
    #classNameList = new Set<string>();
    css = new CSS;
    js = new CodeJS('./build/index.js');
    store = <any>[];
  
    static #instance: Context;
  
    private constructor() {
      config.imports.forEach((v,_) =>{
        CSS.imports.add(v)
      });
    }
    static getInstance(): Context {
      if (Context.#instance == null) Context.#instance = new Context();
      return Context.#instance;
    }
  
    addClass = (className: string) => this.#classNameList.add(className);
    hasClass = (className: string): boolean => this.#classNameList.has(className);
  }