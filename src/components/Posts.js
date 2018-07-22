import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledUl = styled.ul`list-style: none;`;

const StyledLi = styled.li`
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }
`;
const PostTitle = styled.div`
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 700;
  a {
    text-decoration: none;
    color: #78a;
  }
`;
const PostAuthor = styled.div`font-size: 12px;`;

const StyledPostContent = styled.div`margin-bottom: 15px;`;

const PostContent = props => {
  return <StyledPostContent dangerouslySetInnerHTML={{ __html: props.text }} />;
};

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
      <StyledUl p={0} m={0}>
        {isFetching && items.posts && items.posts.length === 0 && <h2>Loading ...</h2>}
        {!isFetching && items.posts && items.posts.length === 0 && <h2>Loading...</h2>}
        {items.posts &&
          items.posts.map((post, i) => (
            <StyledLi key={i}>
              <PostTitle>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </PostTitle>
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

function mapStateToProps(state) {
  return {
    items: state.posts
  };
}

export default connect(mapStateToProps)(Posts);
