import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { Provider as RebassProvider, Heading, Text } from 'rebass';
import styled from 'styled-components';
import {
	space,
	width,
	fontSize,
	color,
	borders,
	borderColor
} from 'styled-system';

const StyledUl = styled.ul`
	${space};
	list-style: none;
`;

const StyledLi = styled.li`
	${space};
	${borders};
	${borderColor};
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
					fontSizes: [12, 16, 24, 36, 48, 72]
				}}
			>
				<StyledUl p={0} m={0}>
					{isFetching &&
						items.posts &&
						items.posts.length === 0 && <h2>Loading ...</h2>}
					{!isFetching &&
						items.posts &&
						items.posts.length === 0 && <h2>Empty...</h2>}
					{items.posts &&
						items.posts.map((post, i) => (
							<StyledLi
								mb={3}
								pb={3}
								key={i}
								borderBottom="1px solid"
								borderColor="silver"
							>
								<Text fontSize={[0, 1]}>
									<span>Posted on {this.getDateCreated(post._id)}</span>{' '}
									<span> by {post.author}</span>
								</Text>
								<Heading
									children={post.title}
									m={0}
									fontSize={[2, 3]}
									color="maroon"
									fontWeight={400}
								/>
								<Text fontSize={[0, 1]}>{post.content}</Text>
							</StyledLi>
						))}
				</StyledUl>
			</RebassProvider>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.posts
	};
}

export default connect(mapStateToProps)(Posts);
