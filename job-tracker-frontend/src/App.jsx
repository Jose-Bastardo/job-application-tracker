import { useEffect, useState } from 'react'
import { fetchJobs, createJob, deleteJob } from './api';
import './App.css'

import JobForm from './components/JobForm';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadJobs();
  }, []);

   async function addJob(newJob){
    await createJob(newJob)
    
    const updatedJobs = await fetchJobs();

    setJobs(updatedJobs);
  }

  async function deleteJobById(idToDelete){
     
    await deleteJob(idToDelete)
    
    const updatedJobs = await fetchJobs();

    setJobs(updatedJobs);
  }


  return (
   <div>
    {console.log(jobs)}
      <h1>Job Tracker</h1>
      <JobForm onAddJob={addJob} />
      <FilterBar onFilterChange={setFilter} filter={filter}/>
      <JobList jobs={jobs} filter={filter} onDelete={deleteJobById}/>
    </div>
  );
}

export default App
