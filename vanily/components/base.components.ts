import { extractEvents } from "../assets/core";
import { BaseProps, Value, Widget } from "../types";

export function Column(this: any, props:BaseProps,...children:Widget[]):Widget{
    const events = extractEvents(props);
    return new Widget(
        'vny-column',
        {...props, style:'{display:flex;flex-direction:column;}'},
        children,
        events,
    )
}
export function Row(props:BaseProps,...children:Widget[]):Widget{
    const events = extractEvents(props);
    return new Widget (
        'vny-row',
        {...props, style:'{display:flex;}'},
        children,
        events,
    )
}
export function Button(child:Widget, props:BaseProps = {}):Widget{
    const events = extractEvents(props);
    return new Widget(
        'vny-button',
        props,
        [ child ],
        events, 
    )
}
export function TextButton(data:Value, props:BaseProps = {}):Widget{
    const events = extractEvents(props);
    return new Widget(
        'vny-button',
        {...props, innerText:data},
        [],
        events, 
    )
}
export function Text(data:Value, props:BaseProps = {}):Widget{
    const events = extractEvents(props);
    return new Widget(
        'vny-text',
        {...props, innerText:data},
        [],
        events,
    )
}