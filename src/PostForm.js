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

    handleClick = () => {
        const {text} = this.state;
        const newItem = {
            ts: new Date(),
            message: text,
        }
        this.props.onSubmit(newItem);
    }

    render() {
        return ( 
            <div>
                <textarea onChange={this.handleEdit} value={this.state.text} />
                <button type="button" onClick={this.handleClick}>投稿</button>
            </div>
        )
    }
}