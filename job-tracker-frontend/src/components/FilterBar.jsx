function FilterBar( {onFilterChange, filter}) {

  return (
    <select
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
  );
}

export default FilterBar;