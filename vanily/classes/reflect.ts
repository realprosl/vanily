export class Reflect{
    static currentFile():string{
        let data = new Error().stack?.split("\n");
        console.log("data: ",data);
        return data?.at(2)?.split("/").at(-1) || "None";
    }
}