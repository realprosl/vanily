import { buildHash, index } from "../assets/core";
import { Callback, Widget } from "../types";
import { Fn } from "./function";
import { TemplateString } from "./template.string";
import { ValueNotifier } from "./value.notifier";


export class CodeJS{
    #data:string = '';
    #path:string;

    constructor(path?:string){
        this.#path = path || '';
    }
    clear(){
        this.#data = '';
    }
    args(arg:string):Symbol{
        return Symbol(arg);
    }
    log(data:string | Symbol){
        if(typeof data === 'string'){
            this.#data += `console.log('${data}');\n`;
        }else{
            this.#data += `console.log(${(data as Symbol).description});\n`;
        }
    }
    pln(str:string){
        this.#data += str + '\n';
    }
    required(module:string){
        this.pln(`import { ValueNotifier } from "${module}"`);
    }
    func(name:string, ...args:string[]):Fn{
        return new Fn(name, this, ...args)
    }
    p(str:string){
        this.#data += str;
    }
    show(){
        console.log(this.#data);
    }
    get string():string {
        return this.#data;
    }
    bodyAppenChild(ele:Widget){
        this.#data += `document.querySelector('body')?.appendChild(${ele.hash});` + '\n';
    }
    appendChild(parent:Widget,ele:Widget){
        this.pln(`${parent.hash}.appendChild(${ele.hash});`);
    }
    addEventListener(ele:Widget, typeEvent:string, bodyEvent:Callback){
        let res = (bodyEvent as Function)();
        let body = bodyEvent.toString();
        if (res) {
            if (res[1] == 'notifier'){
                let req = new RegExp('[\s,\n]*[A-z]*[0-9]*.set','g');
                body = body.replaceAll(req,`${res[0]}.set`);
            }
        }
        this.pln(`${ele.hash}.addEventListener('${typeEvent.slice(2)}', ${body});`);
    }
    createElement(hash:string, type:string){
        this.pln(`let ${hash} = document.createElement('${type}');`)
    }
    declareValueNotifier(hash:string, value:string|number|boolean){
        if(typeof value === 'string' ){
            this.pln(`let ${hash} = new ValueNotifier('${value}');`); 
        }else{
            this.pln(`let ${hash} = new ValueNotifier(${value});`); 
        }
    }
    addClassList(hash:string,value:string){
        this.pln(`${hash}.classList.add('${value}')`);
    }
    addHashCss(hash:string, css:string){
        this.pln(`${hash}.setAttribute('data-css','${css}')`);
    }
    setAttribute(hash:string,key:string,value:string,write:boolean=true):string{
        if(write){
            if(key != 'innerText' && key != 'innerHtml'){
                if(key === 'className'){
                    this.pln(`${hash}.className = '${value}'`);
                }else{
                    this.pln(`${hash}.setAttribute('${key}','${value}');`);
                }
            }else{
                this.pln(`${hash}.${key} = '${value}'`);
            }
        }else{
            if(key != 'innerText' && key != 'innerHtml'){
                if(key === 'className'){
                    return `${hash}.className = ${value}`;
                }else{
                    return `${hash}.setAttribute('${key}',${value})`;
                }
            }else{
                return `${hash}.${key} = ${value}`;
            }
        }
        return '';

    }
    notifierSubcribe(hash:string, callback:string){
        this.pln(`${hash}.subcribe(() => ${callback} );`);
    }
    buildElement(ele:Widget):string{

        ele.hash = buildHash(ele.type);
        this.createElement(ele.hash, ele.type);
        if (ele.cssHash){
            this.addHashCss(ele.hash, ele.cssHash);
        }

        // work with attributes
        for(let key in ele.attrs){
            let value = index(ele.attrs, key );
            if(value instanceof ValueNotifier){

                this.declareValueNotifier(value.hash, value.initial);
                this.setAttribute(ele.hash, key, value.value().toString()); 
                this.notifierSubcribe(
                    value.hash, 
                    this.setAttribute(
                        ele.hash, 
                        key,
                        `\`\${${value.hash}.value}\``,
                        false
                    )
                );
            }else if(value instanceof TemplateString){

                for(let index  in value.args){
                    if(value.args[index] instanceof ValueNotifier){

                        let notify = value.args[index];
                        this.declareValueNotifier(notify.hash, notify.initial);
                        this.setAttribute(ele.hash, key, value.composed());
                        this.notifierSubcribe(
                            notify.hash, 
                            this.setAttribute(
                                ele.hash, key,
                                `\`${value.composed(`\${${notify.hash}.value}`)}\``,
                                false
                            )
                        );
                    }else{
                        this.setAttribute(ele.hash, key, value.composed());
                    }
                }

            }else{
                this.setAttribute(ele.hash, key, value.toString());
            }
        };
        //  push children 
        if(ele.children.length > 0){
            ele.children.forEach((child,_)=>{
                child.parent = ele;
                if(ele.cssHash) child.cssHash = ele.cssHash;
                this.buildElement(child);
            })
        }
        // work with events
        if(ele.events){
            for(let event in ele.events){
                if(index(ele.events, event)){
                    this.addEventListener(ele, event, index(ele.events, event));
                }
            }

        }

        if(ele.parent){
            this.appendChild(ele.parent, ele);
        }
        return this.string;
    }
    //
    async writeFile(){
        //console.log(this.#data);
        if (this.#path){
            Bun.write(this.#path ,this.#data);
        }else{
            console.log('[error]: path not fount or undefined.');
        }
    }
}