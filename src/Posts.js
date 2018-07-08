import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { Link } from 'react-router-dom';
import { Provider as RebassProvider, Heading, Text } from 'rebass';
import styled from 'styled-components';

const StyledUl = styled.ul`list-style: none;`;

const StyledLi = styled.li`
	margin-bottom: 15px;
	padding-bottom: 15px;
	border-bottom: 1px solid #ccc;
	&:last-child {
		border: none;
	}
`;

class Posts extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch, post } = this.props;
		dispatch(actions.fetchPosts(post));
	}

	componentDidUpdate(prevProps) {
		const { dispatch, post } = this.props;
		if (post !== prevProps.post) {
			dispatch(actions.fetchPosts(post));
		}
	}

	getDateCreated(id) {
		var timestamp = id.toString().substring(0, 8);
		var date = new Date(parseInt(timestamp, 16) * 1000);
		return date.toString();
	}

	render() {
		const { items, isFetching } = this.props;
		return (
			<RebassProvider
				theme={{
					fonts: {
						sans: '"Avenir Next", Helvetica, sans-serif'
					},
					fontSizes: [ 12, 16, 24, 36, 48, 72 ]
				}}
			>
				<StyledUl p={0} m={0}>
					{isFetching && items.posts && items.posts.length === 0 && <h2>Loading ...</h2>}
					{!isFetching && items.posts && items.posts.length === 0 && <h2>Empty...</h2>}
					{items.posts &&
						items.posts.map((post, i) => (
							<StyledLi key={i}>
								<span>Posted on {this.getDateCreated(post._id)}</span> <span> by {post.author}</span>
								<br />
								<Link to={`/posts/${post._id}`}>{post.title}</Link>
								<br />
								{post.content}
							</StyledLi>
						))}
				</StyledUl>
			</RebassProvider>
		);
	}
}

function mapStateToProps(state){
	return {
		items: state.posts
	};
}

export default connect(mapStateToProps)(Posts);
