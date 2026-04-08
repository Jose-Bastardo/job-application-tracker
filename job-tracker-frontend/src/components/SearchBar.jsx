function SearchBar({ onSearchChange, search }) {

  return (
    <input className="search bar"
      value={search}
      placeholder="Search"
      name="search"
      id="search"
      onChange={(e) => onSearchChange(e.target.value)} />
  );
}

export default SearchBar;