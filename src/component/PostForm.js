import React from 'react';
import { connect } from 'react-redux';
import { addTweet, editValue, reset } from '../Actions.js'

class PostForm extends React.Component {
    state = {
        text: '',
    }

    handleEdit = e => {
        this.props.editValue('text', e.target.value);
    }

    handleClick = () => {
        const { form, emojiList } = this.props;
        const { text, avatar } = form;
        
        const newTweet = {
            ts: new Date(),
            message: text,
            avatar: avatar || emojiList[0],
        }
        this.props.addTweet(newTweet);
        this.props.reset();
    }

    handleChangeAvatar = e => {
        this.props.editValue('avatar', e.target.value);
    }

    render() {
        const { form, emojiList } = this.props;
        const { text, avatar } = form;

        return ( 
            <div>
                <textarea onChange={this.handleEdit} value={text} />
                <button type="button" onClick={this.handleClick}>投稿</button>
                <select
                    className="form-control form-control-sm"
                    onChange={this.handleChangeAvatar}
                    value={ avatar || emojiList[0] }
                >
                    {emojiList.map((emoji, index) => (
                        <option value={emoji} key={`emoji-${index}`}>{emoji}</option>
                    ))}
                </select>
            </div>
        )
    }
}

const mapState = (state) =>{
    return {
        emojiList: state.emojiList,
        form: state.form,
    }
};
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