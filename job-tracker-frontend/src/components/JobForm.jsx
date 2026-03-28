import React, { useState } from 'react';



function JobForm( {onAddJob} ) {
    
    const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit() {
    const job = {company: company, role: role, status: status, notes: notes}
    onAddJob(job);
  }


  return (
    <div>
      <h2>Add Job Application</h2>
      <input 
        placeholder="Company" 
        onChange={(e) => setCompany(e.target.value)}/>
      <input 
        placeholder="Role" 
        onChange={(e) => setRole(e.target.value)}/>
      <select 
        name="status" 
        id="status"
        value={status}
        required
        onChange={(e) => setStatus(e.target.value)}>
            <option value="" disabled selected hidden>Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer" >Offer</option>
        </select>
        <input 
            placeholder="Notes" 
            onChange={(e) => setNotes(e.target.value)}/>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default JobForm;