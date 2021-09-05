import React from "react";
import { connect } from 'react-redux';
import { searchQiitaPosts } from '../Actions';


class QiitaStocks extends React.PureComponent {
    componentWillMount() {
        const { user_id, searchQiitaPosts } = this.props;
        if(user_id){
            searchQiitaPosts({}, user_id);
        }
    }

    componentDidUpdate(prevProps) {
        const { user_id, searchQiitaPosts } = this.props;
        if (user_id && user_id !== prevProps.user_id) {
            searchQiitaPosts({}, user_id);
        }
    }

    render () {
        const { posts } = this.props
        return (
            <div>
                <h2>Qiita ストック一覧</h2>

                {posts.map(post =>(
                    <div>{post.title}</div>
                ))}
            </div>
        )
    };
};

const mapState = state => {
    return{
        posts: state.qiita.posts,
        user_id: state.user.profile.id,
    };
};

const mapDispatch = { searchQiitaPosts };


export default connect(mapState, mapDispatch)(QiitaStocks);