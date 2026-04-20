import { useEffect, useState } from 'react'
import Pagination from './Pagination';

function JobList({ jobs, onDelete, editJob }) {

  const [currentPage, setCurrentPage] = useState(1);

  const pageJobLimit = 7;
  const numberOfPages = Math.ceil(jobs.length / pageJobLimit);
  const startIndex = (currentPage - 1) * pageJobLimit
  const endIndex = startIndex + pageJobLimit
  const currentPageJobs = jobs.slice(startIndex, endIndex)


  function JobStatus(status) {
    switch (status.status) {
      case 'Applied': return <td><div className="status applied">Applied</div></td>
      case 'Interviewing': return <td><div className="status interviewing">Interviewing</div></td>
      case 'Rejected': return <td><div className="status rejected">Rejected</div></td>
      case 'Offer': return <td><div className="status offer">Offer</div></td>
      default: return <td><div className="status">status.status</div></td>
    }
  }

  function List() {

    if (jobs.length == 0) {
      return (<h2>No job applications yet. Add one above.</h2>)
    }
    else {
      return (
        <div>
          <table className="job-list-table">
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "17%" }} />
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
              {currentPageJobs.map((job, index) =>
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
          <Pagination numberOfPages={numberOfPages} currentPage={currentPage} onCurrentPageChange={setCurrentPage} />

        </div>
      )
    }
  }

  return (
    <div>
      <List />
    </div>
  )
}

export default JobList;