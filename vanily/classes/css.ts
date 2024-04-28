import { Widget } from "../types";

class List<T>{
    #list:T[] = [];

    add(item:T){
        this.#list.push(item);
    }
    remove(value:T):boolean{
        let index = this.#list.indexOf(value);
        if(index != -1){
            this.#list.slice(index,1);
            return true;
        }
        return false;
    }
    has(value:T):boolean{
        let i = this.#list.indexOf(value);
        if(i != -1) return true;
        return false;
    }
    get():T[]{
        return this.#list
    }
}

export class CSS{
    #classList:List<string> = new List;
    static folder:string = "./components/";
    static imports:List<string> = new List;

    get classList():List<string>{
        return this.#classList
    }

    static async read(path:string):Promise<string>{
       const file = Bun.file(path);
       return await file.text(); 
    }

    static async write(path:string, content:string){
        Bun.write(path, await content);
    }

    static async append(path:string, content:string){
        let cnt = await Bun.file(path).text() + content;
        Bun.write(path, cnt);
    }

    static async parse(path:string, data:string, hash?:string):Promise<string>{
        let css = await CSS.read(path + data);
        if(hash){
            let reg = new RegExp('^::\s*[A-z,-]+({|:|\.|\s)','g');
            reg.exec(css)?.forEach((v,i) =>{
                if(v.length > 1){
                    let name = v.slice(2,-1);
                    console.log(name);
                    css = css.replaceAll(v, `\nvny-${name}[data-css='${hash}']{`);
                }
            });
        }
        return css;
    }

    static hashGeneration(path:string):string{
        let name = path.split("/").at(0) || "";
        return "css_" + name;
    }

    static async updateFile(path:string, data:string, hash?:string){
        let cnt = await CSS.parse(path, data, hash);
        CSS.append("./build/index.css", cnt);
    }

    static Styles(path:string, child:Widget):Widget{
        let hash = CSS.hashGeneration(path);
        child.cssHash = hash;
        path = !path.endsWith(".css") ? path + ".css" : path; 
        console.log(CSS.imports.get())
        if(!CSS.imports.has(hash)){
            CSS.updateFile(CSS.folder, path, hash);
            CSS.imports.add(hash);
            Bun.write("./vanily.config.json", JSON.stringify({
                imports : CSS.imports.get()
            }));
        }
        return child;
    }
}
