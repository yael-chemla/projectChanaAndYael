
function AddComment({ body, setBody, onAdd }) {
  return (
    <div className="add-comment-form">
      <textarea
        placeholder="Add a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="button" onClick={onAdd}>
        Add Comment
      </button>
    </div>
  );
}

export default AddComment;
