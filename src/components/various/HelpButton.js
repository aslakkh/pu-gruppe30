import React from 'react'
import {Popover, OverlayTrigger} from 'react-bootstrap'

export function HelpButton(props){
/*    
    returns a helpButton with popover
    takes in props:
    - helpText (the text to be displayed in popover)
    - placement (left, right, top, bottom)
    - title

*/    

    var style = {
        marginLeft: '5px',
    };
    const helpPopover = (
        <Popover id="help-popover" title={props.title}>{props.helpText}</Popover>
    );

    return(
        <OverlayTrigger 
        trigger="click" 
        rootClose 
        placement={props.placement}
        overlay={helpPopover}
        >
            <img 
            src={require("../../assets/helpicon.png")} 
            alt="Help Button" width="25" height="25"
            style={style}
            />
        </OverlayTrigger>
    )

}
