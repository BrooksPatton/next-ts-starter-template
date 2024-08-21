import Link from 'next/link';
import React, { Component } from 'react';
import { Post } from '../interfaces/post';

class PostList extends Component<{ posts: Array<Post> }> {
  render() {
    const { posts } = this.props;
    if (!posts) {
      return null;
    }
    return (
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link href={`/posts/${encodeURIComponent(post.id)}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default PostList;