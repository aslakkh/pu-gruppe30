import React from 'react'
import {Popover, OverlayTrigger} from 'react-bootstrap'

export function CourseWarning(){

    var style = {
        color: 'blue',
        paddingRight: '5px',
        paddingTop: '5px',
        paddingBottom: '5px',
    };

    const infoPopover = (
        <Popover id="info-popover" title="Unlinked course">
            <p>
                This course has not yet been added by course staff.
                Tell your professor to start using PST and add the course!
                (You can still track your personal progress in this course).
            </p>
        </Popover>
    );

    return(
        <OverlayTrigger 
        trigger={['hover','focus']}
        rootClose 
        placement="bottom"
        overlay={infoPopover}
        >
            <p style={style}>*</p>
        </OverlayTrigger>
    )
}