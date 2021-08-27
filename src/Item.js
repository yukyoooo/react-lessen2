import React from 'react';

export default class Item extends React.Component {
    state = {
        ids:[1,2,3],
    }

    render() {
        return ( 
            this.state.ids.map(id => {
                return <div>{id}</div>;
            })
        )
    }
}