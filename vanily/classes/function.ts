import { CodeJS } from "./js";

export class Fn{
    #cxt?:CodeJS;
    name:string;
    args:string[];
    values:any[] = [];
    #body:string = '';
    #export:boolean = false;
    #async:boolean = false;
    #auto:boolean = false;
    #scopeBody:string = '';
    #self:CodeJS = new CodeJS();
    #isExecuted = false;
    #scopeFunction?:(cxt:CodeJS) => void;

    constructor(name:string,cxt?:CodeJS,...args:string[]){
        this.#cxt = cxt;
        this.name = name;
        this.args = args;
    }
    code(code:CodeJS | ((cxt:CodeJS)=>void)):Fn{
        if(code instanceof CodeJS){
            this.#scopeBody = code.string;
        }else{
            code(this.#self);
            this.#scopeBody = this.#self.string;
        }
        return this;
    }
    auto(...value:any[]):Fn{
        this.#auto = true;
        this.exec(...value);
        return this;
    }
    get async():Fn{
        this.#async = true;
        return this;
    }
    exec(...value:any[]){
        this.values = value;
        if(value.length != this.args.length) 
            console.log(`[fail]: in func<${this.name}> expected ${this.args.length} arguments found ${value.length}`);
        if(this.#auto){
            this.build();
            this.#body += `(${this.joinValues()}));\n`;
            this.#cxt?.pln(this.#body);
        }
        if(!this.#isExecuted && !this.#auto){
            this.build();
            this.#cxt?.pln(this.#body);
            this.#isExecuted = true;
        }
        if(!this.#auto)
            this.#cxt?.pln(`${this.name}(${this.joinValues()});`);
    }
    get export():Fn{
        this.#export = true;
        return this;
    }
    get end():Fn{
        return this;
    }
    build(){
        this.#body += (this.#export && !this.#auto) ? 'export ' : '';
        this.#body += (this.#auto) ? '(' : '';
        this.#body += (this.#async) ? 'async' : '';
        this.#body += `function ${this.name}(${this.args}){\n`;
        this.#body += this.#self.string || this.#scopeBody ; 
        this.#body += '}';
    }
    joinValues():string{
        let res = '';
        for(let arg in this.args){
            let value = this.values[arg];
            if(typeof value === 'string'){
                (parseInt(arg) != this.args.length -1) 
                    ? res += `"${value}",`
                    : res += `"${value}"`;
            }else{
                (parseInt(arg) != this.args.length -1) 
                    ? res += value + ","
                    : res += value;
            } 
        }
        return res.trim();
    }
}