import GeneralSearch from "../GeneralSearch";

function SearchPost({ posts, onFilter }) {
  return (
    <GeneralSearch items={posts} onFilter={onFilter}/>
  )
}

export default SearchPost;
