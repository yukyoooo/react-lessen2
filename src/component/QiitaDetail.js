import React from "react";
import { connect } from "react-redux";
import { fetchQiitaPost } from "../Actions";

class QiitaDetail extends React.Component{
    componentDidMount() {
        const { id, post, fetchQiitaPost } = this.props;
        if(!post) {
            fetchQiitaPost(id);
        };
    };

    render() {
        const {
            title,
            rendered_body,
            created_at,
            user: { name: user_name, id: user_id, profile_image_url } = { },
        } = this.props.post || {};

        return (
            <div>
                <h2>{ title }</h2>
                <h3>({this.props.match.params.post_id})</h3>
                <div className="mb-3 d-flex justify-content-between">
                    <div>
                        <img src={ profile_image_url } alt={ user_name || user_id } width="40" className="pr-2" />
                        { user_name || user_id }
                    </div>
                    <div>
                        <time>{ (new Date(created_at)).toLocaleString() }</time>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: rendered_body || '' }} />
            </div>
        );
    }
}

const mapState = (state, ownProps) => {
    const { match: { params: { post_id }}} = ownProps;
    return {
        id: post_id,
        post: state.qiita.post || state.qiita.posts.find(post => post.id === post_id),
    }
};
const mapDispatch = { fetchQiitaPost };

export default connect(mapState, mapDispatch)(QiitaDetail);