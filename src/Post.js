import React, { Component } from 'react';

export class Post extends Component {
	getDateCreated(id) {
		var timestamp = id.toString().substring(0, 8);
		var date = new Date(parseInt(timestamp, 16) * 1000);
		return date.toString();
	}

	render() {
		return (
			<React.Fragment>
				<span>Posted on {this.getDateCreated(post._id)}</span>
				<span> by {post.author}</span>
				<br />
				{post.title}
				<br />
				{post.content}
			</React.Fragment>
		);
	}
}

export default Post;
