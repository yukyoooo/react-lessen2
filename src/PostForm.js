import React from 'react';

export default class PostForm extends React.Component {
    state = {
        text: '',
    }

    handleEdit = e => (
        this.setState({
            text: e.target.value,
        })
    )

    render() {
        return ( 
            <div>
                <textarea onChange={this.handleEdit} value={this.state.text} />
                <button type="button">投稿</button>
            </div>
        )
    }
}