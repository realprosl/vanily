import { Context } from "./classes/context";
import { CSS } from "./classes/css";
import { CodeJS } from "./classes/js";
import { TemplateString } from "./classes/template.string";
import {ValueNotifier} from "./classes/value.notifier"

export type Callback = ((e:Event)=> void) |((e:Event)=> [string,string]);
export type VoidCallback = () => void;
export type Str = string | ValueNotifier<string> | TemplateString;
export type Num = number | ValueNotifier<number>;
export type Bool = boolean | ValueNotifier<boolean>;
export type Value = Str | Num | Bool;
export type Events = {
    onclick?:Callback,
    onchange?:Callback,
    oninput?:Callback,
} 
export type Widget2 = {
    hash?:string,
    type: string,
    attrs: Attributes, 
    children:Widget[],
    parent?:Widget,
    events?:Events,
    cxt?:Context,
}

export class Widget{
    hash?:string
    cssHash?:string
    type: string
    attrs: Attributes 
    children:Widget[]
    parent?:Widget
    events?:Events
    cxt = Context.getInstance()

    constructor(
        type:string, 
        attrs:Attributes, 
        children:Widget[], 
        events?:Events,
        ){
        this.type = type;
        this.attrs = attrs;
        this.children = children;
        this.events = events;
    }
    get css():CSS{
        return this.cxt.css;
    }
    get js():CodeJS{
        return this.cxt.js;
    }


    setAttribute(){}

}

export type Attributes = {
    className?: Str,
    id?: Str,
    value?: Value,
    parent?: Widget,   
    style?: string,
    innerHtml?: Value,
    innerText?: Value,
};
export type BaseProps = Events & Attributes 