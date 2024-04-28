import { CSS } from "../../vanily/classes/css";
import { Column, Row, Text, TextButton, ValueNotifier, Widget } from "../../vanily/core";


export const Counter = (initial:number) =>{

  const count = new ValueNotifier(initial);

  return CSS.Styles("counter/styles",
    Column({},
      Text(count),
        Row({},
          TextButton('+',{ onclick: (e) => count.set((v) => v + 10 ) }),
          TextButton('-',{ onclick: (e) => count.set((v) => v - 1 ) }), 
        )// Row
  ))};//Column
