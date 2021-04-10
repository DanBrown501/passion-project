import React from 'react';
import "./PostDisplay.css";

/** Display a post:
 *
 * - show edit/delete buttons (& call parent on action)
 *
 */

function PostDisplay({ toggleEdit, deletePost, post}) {
  const { title, description, body } = post;

  return (
    <div className="PostDisplay">
        <div>
          <h2>{title}</h2>
          <p><i>{description}</i></p>
          <div>{body}</div>
        </div>

        <div className="PostDisplay-right">
          <div className="PostDisplay-edit-area">
            <i className="fas fa-edit text-primary"
                onClick={toggleEdit} />
            <i className="fas fa-times text-danger"
                onClick={deletePost} />
          </div>
        </div>
    </div>
  );
}

export default PostDisplay;