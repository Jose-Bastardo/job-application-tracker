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
  const [selectedRowId, setSelectedRowId] = useState(null);

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

  function clearForm() {
    const form = { Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' }
    setEditableJob(form);
    setSelectedRowId(null);
  }

  function onEditJob(job) {
    setSelectedRowId(job.Id);
    setEditableJob(job);
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
    clearForm();
  }

  function onSortChange(sort) {
    setCurrentPage(1);
    setSort(sort);
    clearForm();
  }

  function onSearchChange(search) {
    setCurrentPage(1);
    setSearch(search);
    clearForm();
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="h-full w-full flex flex-col lg:flex-row lg:flex-nowrap grow p-8 lg:space-x-10 space-y-8 lg:space-y-0 justify-content-center place-items-center">
        <div className="flex-1 lg:h-full w-full p-8 bg-white border rounded-2xl border-[#E5E7EB] shadow-md">
          <div className="flex flex-row space-x-2 w-full mb-6 place-items-center">
            <img alt={"Add Application"} src={addApplication} className="h-12"/>
            <h2 className="text-xl font-semibold">Add/Edit Job Application</h2>
          </div>
            <JobForm onAddJob={addJob} onJobUpdate={updateJobById} editableJob={editableJob} clearForm={clearForm} />
        </div>
        <div className="flex flex-col flex-3 lg:h-full w-full py-8 bg-white border rounded-2xl border-[#E5E7EB] shadow-md flex-nowrap">
          <div className="w-full flex flex-row px-10 mb-6 place-items-center flex-wrap md:whitespace-nowrap">
            <div className="flex-1 flex flex-row flex-wrap place-items-center justify-center space-x-2 text-xl font-semibold md:whitespace-nowrap">
              <img alt="Applications" src={application} className="h-12"/>
              <h2>Applications</h2>
            </div>
            <div className="flex-1 lg:flex-3 lg:space-x-10 space-y-4 lg:space-y-0 place-items-center justify-center flex flex-row flex-wrap">
              <FilterBar onFilterChange={onFilterChange} filter={filter} />
              <SortBar onSortChange={onSortChange} sort={sort} />
              <SearchBar onSearchChange={onSearchChange} search={search} />
            </div>
          </div>
          <JobList jobs={sortedJobs} search={search} onDelete={deleteJobById} editJob={onEditJob} currentPage={currentPage} clearForm={clearForm} setCurrentPage={setCurrentPage} isLoading={loading} selectedRowId={selectedRowId} />
        </div>
      </div>
    </div>
  );
}

export default App
