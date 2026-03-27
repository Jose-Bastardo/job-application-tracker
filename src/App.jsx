import { useState } from 'react'
import './App.css'

import JobForm from './components/JobForm';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");

   function addJob(newJob){
    setJobs([...jobs, newJob]);
  }

  return (
   <div>
    {console.log(jobs)}
      <h1>Job Tracker</h1>
      <JobForm onAddJob={addJob} />
      <FilterBar onFilterChange={setFilter} filter={filter}/>
      <JobList jobs={jobs} filter={filter}/>
    </div>
  );
}

export default App
