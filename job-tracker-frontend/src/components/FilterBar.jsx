function FilterBar({ onFilterChange, filter }) {

  return (
    <div className="space-x-2 flex flex-row flex-wrap 2xl:flex-nowrap justify-center w-min place-items-center">
      <label htmlFor="filter">Status:</label>
      <select className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
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
    </div>
  );
}

export default FilterBar;