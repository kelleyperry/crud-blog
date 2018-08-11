import React, { Component } from 'react';
import * as actions from '../actions';
import * as palette from './Palette';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledPostContent = styled.div`margin-bottom: 15px;`;

const PostAuthor = styled.div`font-size: 12px;`;

const PostContent = props => {
  return <StyledPostContent dangerouslySetInnerHTML={{ __html: props.text }} />;
};

export class Post extends Component {
  getDateCreated (id) {
    var timestamp = id.toString().substring(0, 8);
    var date = new Date(parseInt(timestamp, 16) * 1000);
    return date.toString();
  }

  componentDidMount () {
    const { dispatch, match } = this.props;
    dispatch(actions.fetchPost(match.params.id));
  }

  componentDidUpdate (prevProps) {
    const { dispatch, match } = this.props;
    if (match.params.id !== prevProps.match.params.id) {
      dispatch(actions.fetchPosts(match.params.id));
    }
  }

  render () {
    const { post, match } = this.props;
    return (
      <React.Fragment>
        <h2>{post.activePost.title}</h2>
        <PostContent text={post.activePost.content} />
        <PostAuthor>
          Posted on <em>{this.getDateCreated(match.params.id)}</em> by <strong>{post.activePost.author}</strong>
        </PostAuthor>
      </React.Fragment>
    );
  }
}

function mapStateToProps (state){
  return {
    post : state.post
  };
}

export default connect(mapStateToProps)(Post);
