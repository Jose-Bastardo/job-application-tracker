import { useEffect, useState } from 'react'
import { fetchJobs, createJob, updateJob, deleteJob } from './api';
import './App.css'

import JobForm from './components/JobForm';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

function App() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [editableJob, setEditableJob] = useState({ Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setLoading(true)
    await timeout(1000);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function addJob(newJob) {
    await createJob(newJob)
    await loadJobs();
  }

  async function updateJobById(updatedJob) {
    await updateJob(updatedJob)
    await loadJobs();
  }

  async function deleteJobById(idToDelete) {
    await deleteJob(idToDelete)
    await loadJobs();
  }

  function List(isLoading) {
    if (isLoading.isLoading) {
      return (<h2>Loading...</h2>)
    }
    else {
      return (<div>
        <JobList jobs={currentPageJobs} search={search} onDelete={deleteJobById} editJob={setEditableJob} />
        <Pagination numberOfPages={numberOfPages} currentPage={currentPage} onCurrentPageChange={setCurrentPage} />
      </div>)
    }
  }

  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(job => job.Status === filter)


  const searchFilteredJobs = [...filteredJobs].filter(job => {
    if (job.Company.toLowerCase().includes(search.toLowerCase())) {
      return job;
    }
    if (job.Role.toLowerCase().includes(search.toLowerCase())) {
      return job;
    }
    if (job.dateApplied.toLowerCase().includes(search.toLowerCase())) {
      return job;
    }
    if (job.Notes.toLowerCase().includes(search.toLowerCase())) {
      return job;
    }
    return 0;
  })

  const sortedJobs = [...searchFilteredJobs].sort((a, b) => {
    if (sort === 'date-desc') {
      return new Date(b.dateApplied) - new Date(a.dateApplied);
    }

    if (sort === 'date-asc') {
      return new Date(a.dateApplied) - new Date(b.dateApplied);
    }

    if (sort === 'company A-Z') {
      return a.Company.localeCompare(b.Company);
    }

    if (sort === 'company Z-A') {
      return b.Company.localeCompare(a.Company);
    }

    if (sort === 'status') {
      return a.Status.localeCompare(b.Status);
    }

    return 0;
  });

  const pageJobLimit = 7;
  const numberOfPages = Math.ceil(sortedJobs.length / pageJobLimit);
  const startIndex = (currentPage - 1) * pageJobLimit
  const endIndex = startIndex + pageJobLimit
  const currentPageJobs = sortedJobs.slice(startIndex, endIndex)


  return (
    <div>
      <div className="main-container">
        <div className="add-edit-column">
          <JobForm onAddJob={addJob} onJobUpdate={updateJobById} editableJob={editableJob} onFormClear={setEditableJob} />
        </div>
        <div className="list-column">
          <h1>Job Application Tracker</h1>
          <div class="list-options">
            <FilterBar onFilterChange={setFilter} filter={filter} />
            <SortBar onSortChange={setSort} sort={sort} />
            <SearchBar onSearchChange={setSearch} search={search} />
          </div>
          <List isLoading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App
