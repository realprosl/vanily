import { CodeJS } from "../classes/js";
import { TemplateString } from "../classes/template.string";
import { Attributes, BaseProps, Callback, Events, Value } from "../types";

export function buildHash(ele:string):string{
    return `ele_${ele.replace("-","_")}_${Math.round(Math.random()*10000)}`
}


export const required = (file:CodeJS,path:string) => {
    file.pln(`import { ValueNotifier } from "${path}"`);
}

export function index<T,R extends Value | Callback >(attrs:T, index:string):R{
    return (attrs[index as keyof T] as R);
}

export function extractEvents(props:BaseProps):Events{
    let events:Events = {};
    for(let key in props){
        if(key === 'onclick'){
            events[key as keyof Events] = (props[key] as Callback); 
            delete props[key];
        }
    }
    return events;
}
// request template string of js standart
export const f = (slice: TemplateStringsArray, ...args: any[]): TemplateString =>
  new TemplateString(slice, args);