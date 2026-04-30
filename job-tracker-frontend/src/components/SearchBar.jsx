function SearchBar({ onSearchChange, search }) {

  return (
    <input className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
      value={search}
      placeholder="Search"
      name="search"
      id="search"
      onChange={(e) => onSearchChange(e.target.value)} />
  );
}

export default SearchBar;