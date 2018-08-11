import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as palette from './Palette';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledUl = styled.ul`list-style: none;`;

const StyledLi = styled.li`
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid ${palette.PEACH};
  &:last-child {
    border: none;
  }
`;

const PostAuthor = styled.div`font-size: 12px;`;

const StyledPostContent = styled.div`margin-bottom: 15px;`;

const PostContent = props => {
  return <StyledPostContent dangerouslySetInnerHTML={{ __html: props.text }} />;
};

class Posts extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { dispatch, post } = this.props;
    dispatch(actions.fetchPosts(post));
  }

  componentDidUpdate (prevProps) {
    const { dispatch, post } = this.props;
    if (post !== prevProps.post) {
      dispatch(actions.fetchPosts(post));
    }
  }

  getDateCreated (id) {
    var timestamp = id.toString().substring(0, 8);
    var date = new Date(parseInt(timestamp, 16) * 1000);
    return date.toString();
  }

  render () {
    const { items, isFetching } = this.props;
    return (
      <StyledUl p={0} m={0}>
        {isFetching && items.posts && items.posts.length === 0 && <h2>Loading ...</h2>}
        {!isFetching && items.posts && items.posts.length === 0 && <h2>Loading...</h2>}
        {items.posts &&
          items.posts.map((post, i) => (
            <StyledLi key={i}>
              <h2>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <PostContent text={post.content} />
              <PostAuthor>
                Posted on <em>{this.getDateCreated(post._id)}</em> by <strong>{post.author}</strong>
              </PostAuthor>
            </StyledLi>
          ))}
      </StyledUl>
    );
  }
}

function mapStateToProps (state){
  return {
    items : state.posts
  };
}

export default connect(mapStateToProps)(Posts);
