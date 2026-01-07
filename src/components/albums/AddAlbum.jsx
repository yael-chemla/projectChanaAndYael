function AddAlbum({ newTitle, setNewTitle, handleAddAlbum }) {
  return (
    <div className="add-album">
      <input
        type="text"
        placeholder="New album title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={handleAddAlbum}>Add Album</button>
    </div>
  );
}

export default AddAlbum;
