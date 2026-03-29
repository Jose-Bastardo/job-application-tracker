import { useEffect, useState } from 'react'
import { fetchJobs, createJob, updateJob, deleteJob } from './api';
import './App.css'

import JobForm from './components/JobForm';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [editableJob, setEditableJob] = useState({Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: ''} );
  const [loading, setLoading] = useState(true);

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
      return(<JobList jobs={jobs} filter={filter} sort={sort} onDelete={deleteJobById} editJob={setEditableJob}/>)
    }
  }


  return (
   <div>
      <h1>Job Tracker</h1>
      <JobForm onAddJob={addJob} onJobUpdate={updateJobById} editableJob={editableJob} onFormClear={setEditableJob} />
      <FilterBar onFilterChange={setFilter} filter={filter}/>
      <SortBar onSortChange={setSort} sort={sort} />
      <List isLoading={loading} />
    </div>
  );
}

export default App
