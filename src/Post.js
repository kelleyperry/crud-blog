import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';

export class Post extends Component {
	getDateCreated(id) {
		var timestamp = id.toString().substring(0, 8);
		var date = new Date(parseInt(timestamp, 16) * 1000);
		return date.toString();
	}

	componentDidMount() {
		const { dispatch, match } = this.props;
		dispatch(actions.fetchPost(match.params.id));
	}

	componentDidUpdate(prevProps) {
		const { dispatch, match } = this.props;
		if (match.params.id !== prevProps.match.params.id) {
			dispatch(actions.fetchPosts(match.params.id));
		}
	}

	render() {
		const { post, isFetching } = this.props;
		return (
			<React.Fragment>
				<div>{post.activePost.author}</div>
				<div>{post.activePost.title}</div>
				<div>{post.activePost.content}</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state){
	return {
		post: state.post
	};
}

export default connect(mapStateToProps)(Post);
