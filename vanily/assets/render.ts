import { Widget } from "../types";

export function render(app:Widget){
  app.js.required('./value.notifier.js');

  app.js.func('app').code((cxt)=>{
    cxt.buildElement(app);
    cxt.bodyAppenChild(app);
  }).auto();

  app.js.writeFile();
}
