import React from 'react';

export const styles = {
        
        listElement: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
        },
        
        listName: {
                flexBasis: '90%',
        },

        listButton: {
                marginLeft: '5px',
                marginRight: '5px',
                
        },
        modalPane: {
                backgroundColor: 'darkslategray',
        },
        
        modalList: {
                height: '400px',
                overflowY: 'scroll',
        },

        modalBodyWrapper: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
        },

        modalBodyRight: {
                flexBasis: '45%',
        },

        modalBodyLeft: {
                flexBasis: '45%',
        },

        modalBodySeparator: {
                width: '0.2%',
                backgroundColor: '#000'
        }

}