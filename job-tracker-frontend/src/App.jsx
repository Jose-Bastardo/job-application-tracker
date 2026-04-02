import { useEffect, useState } from 'react'
import { fetchJobs, createJob, updateJob, deleteJob } from './api';
import './App.css'

import JobForm from './components/JobForm';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import SearchBar from './components/SearchBar';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [editableJob, setEditableJob] = useState({Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: ''} );
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
    return new Promise( res => setTimeout(res, delay) );
}

   async function addJob(newJob){
    await createJob(newJob)
    await loadJobs();
  }

  async function updateJobById(updatedJob){
    await updateJob(updatedJob)
   await loadJobs();
  }

  async function deleteJobById(idToDelete){
    await deleteJob(idToDelete)
    await loadJobs();
  }

  function List(isLoading){
    if(isLoading.isLoading){
      return(<h2>Loading...</h2>)
    }
    else{
      return(<JobList jobs={jobs} filter={filter} sort={sort} search={search} onDelete={deleteJobById} editJob={setEditableJob}/>)
    }
  }


  return (
   <div>
      <div className="main-container">
        <div className="add-edit-column">
          <JobForm onAddJob={addJob} onJobUpdate={updateJobById} editableJob={editableJob} onFormClear={setEditableJob} />
        </div>
        <div className="list-column">
          <h1>Job Application Tracker</h1>
          <div class="list-options">
          <FilterBar onFilterChange={setFilter} filter={filter}/>
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
