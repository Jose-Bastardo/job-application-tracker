function FilterBar( {onFilterChange, filter}) {

  return (
    <span>
    <label htmlFor="filter">Filter By Status:</label>
    <select className="input bar"
    value={filter}
    name="filter"
    id="filter" 
    onChange={(e) => onFilterChange(e.target.value)}>
      <option value="All">All</option>
      <option value="Applied">Applied</option>
      <option value="Interviewing">Interviewing</option>
      <option value="Rejected">Rejected</option>
      <option value="Offer">Offer</option>
    </select>
    </span>
  );
}

export default FilterBar;