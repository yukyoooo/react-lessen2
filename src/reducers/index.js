import {combineReducers} from 'redux';
import user from './user';
import emojiList from './emojiList';
import tweets from './tweets';
import form from './form';
import qiita from './qiita'
import profileModal from './profileModal';

export default combineReducers({
    user,
    emojiList,
    tweets,
    form,
    profileModal,
    qiita,
});