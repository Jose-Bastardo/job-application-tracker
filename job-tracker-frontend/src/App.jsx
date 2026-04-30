import { useEffect, useState } from 'react'
import { fetchJobs, createJob, updateJob, deleteJob } from './api';
import './App.css'

import JobForm from './components/JobForm';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';

import application from './assets/application.png';
import addApplication from './assets/add-application.png';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [editableJob, setEditableJob] = useState({ Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setLoading(true)
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
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
      return (<div className="h-full w-full">
        <JobList jobs={sortedJobs} search={search} onDelete={deleteJobById} editJob={setEditableJob} currentPage={currentPage} setCurrentPage={setCurrentPage} isLoading={isLoading} />
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

  function onFilterChange(filter) {
    setCurrentPage(1);
    setFilter(filter);
  }

  function onSortChange(sort) {
    setCurrentPage(1);
    setSort(sort);
  }

  function onSearchChange(search) {
    setCurrentPage(1);
    setSearch(search);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="h-full w-full flex flex-row grow p-10 space-x-10 justify-content-center place-items-center">
        <div className="flex-1 h-full w-full p-10 bg-white border rounded-2xl border-[#E5E7EB] shadow-md">
          <div className="flex flex-row space-x-2 w-full mb-6 place-items-center">
            <img alt={"Add Application"} src={addApplication} className="h-12"/>
            <h2 className="text-xl font-semibold">Add/Edit Job Application</h2>
          </div>
            <JobForm onAddJob={addJob} onJobUpdate={updateJobById} editableJob={editableJob} onFormClear={setEditableJob} />
        </div>
        <div className="flex flex-col flex-3 h-full w-full py-10 bg-white border rounded-2xl border-[#E5E7EB] shadow-md">
          <div className="flex flex-row px-10 mb-6 place-items-center">
            <div className="flex-1 flex flex-row place-items-center space-x-2 text-xl font-semibold">
              <img alt="Applications" src={application} className="h-12"/>
              <h2>Applications</h2>
            </div>
            <div className="flex-3 space-x-10 place-items-center">
              <FilterBar onFilterChange={onFilterChange} filter={filter} />
              <SortBar onSortChange={onSortChange} sort={sort} />
              <SearchBar onSearchChange={onSearchChange} search={search} />
            </div>
          </div>
          <JobList jobs={sortedJobs} search={search} onDelete={deleteJobById} editJob={setEditableJob} currentPage={currentPage} setCurrentPage={setCurrentPage} isLoading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App
