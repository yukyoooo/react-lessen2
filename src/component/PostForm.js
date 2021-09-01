import React from 'react';
import { connect } from 'react-redux';
import { addTweet, editValue, reset } from '../Actions.js'

class PostForm extends React.Component {
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
        const newTweet = {
            ts: new Date(),
            message: text,
        }
        this.props.addTweet(newTweet);
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

const mapState = null;
const mapDispatch = (dispatch) => {
    return {
        addTweet: (newTweet) => {
            dispatch(addTweet(newTweet));
        },
        editValue: (name, value) =>{
            dispatch(editValue(name, value));
        },
        reset: () => {
            dispatch(reset());
        },
    }
}

export default connect(mapState, mapDispatch)(PostForm);