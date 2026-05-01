function SortBar({ onSortChange, sort }) {

  return (
    <div className="space-x-2 flex flex-row flex-wrap lg:flex-nowrap justify-center w-min place-items-center">
      <label htmlFor="sort">Sort By:</label>
      <select className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
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
    </div>
  );
}

export default SortBar;