function JobList({ jobs, filter, sort, search, onDelete, editJob }) {
 
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

      function JobStatus (status){
        switch (status.status){
          case 'Applied': return <td><div className="status applied">Applied</div></td>
          case 'Interviewing': return <td><div className="status interviewing">Interviewing</div></td>
          case 'Rejected': return <td><div className="status rejected">Rejected</div></td>
          case 'Offer': return <td><div className="status offer">Offer</div></td>
          default: return <td><div className="status">status.status</div></td>
        }
      }

function List(){
  if(jobs.length == 0){
    return(<h2>No job applications yet. Add one above.</h2>)
  }
  else{
    return(
      <div>
        <table className="job-list-table">
          <colgroup>
            <col style={{width: "15%"}} />
            <col style={{width: "20%"}} />
            <col style={{width: "15%"}} />
            <col style={{width: "20%"}} />
            <col style={{width: "13%"}} />
            <col style={{width: "17%"}} />
          </colgroup>
          <thead>
            <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Job Notes</th>
            <th>Date Applied</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedJobs.map((job, index ) => 
                <tr className="job-list-row" key={index}>
                <td>{job.Company}</td>
                <td>{job.Role}</td>
                <JobStatus status={job.Status} />
                <td>{job.Notes}</td>
                <td>{job.dateApplied}</td>
                <td>
                <button className="edit-button" name="Edit" onClick={() => editJob(job)}>Edit</button>
                <button className="delete-button" name="Delete" onClick={() => onDelete(job.Id)}>Delete</button>
                </td>
                </tr>
            )
        }
          </tbody>
        </table>
        
      </div>
    )
  }
}

    return(
  <div>
    <List />
    </div>
    )
}

export default JobList;