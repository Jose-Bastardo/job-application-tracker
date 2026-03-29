function SortBar( {onSortChange, sort}) {

  return (
    <select
    value={sort}
    name="sort"
    id="sort" 
    onChange={(e) => onSortChange(e.target.value)}>
      <option value="date-desc">Date Applied Desc</option>
      <option value="date-asc">Date Applied Asc</option>
      <option value="company A-Z">Company A-Z</option>
      <option value="company Z-A">Company Z-A</option>
      <option value="status">Status</option>
    </select>
  );
}

export default SortBar;