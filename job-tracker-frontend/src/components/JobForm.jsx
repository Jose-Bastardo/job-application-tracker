import React, { useEffect, useState } from 'react';



function JobForm( {onAddJob, onJobUpdate, editableJob, onFormClear} ) {
    
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Default');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  useEffect (() => {
    function fillForm(){
    setCompany(editableJob.Company);
    setRole(editableJob.Role);
    setStatus(editableJob.Status);
    setNotes(editableJob.Notes);
    setDate(editableJob.dateApplied);
    }
    fillForm();
  }, [editableJob])

  function handleSubmit() {

    const job = {company: company, role: role, status: status, notes: notes, dateApplied: date}
    onAddJob(job);

    const clearForm = {Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: ''}
    onFormClear(clearForm);
    
  }

  function handleUpdate() {

    const job = {Id: editableJob.Id, company: company, role: role, status: status, notes: notes, dateApplied: date}
    onJobUpdate(job);

    const clearForm = {Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: ''}
    onFormClear(clearForm);
  }

  function handleCancel() {

    const clearForm = {Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: ''}
    onFormClear(clearForm);
  }

  function Buttons(){
    if(editableJob.Id ==''){
      return(<button onClick={handleSubmit}>Add</button>);
    }
    if(editableJob.Id != ''){
      return(
      <span>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleCancel}>Cancel</button>
        </span>
      );
    }
  }

  return (
    <div>
      <h2>Add Job Application</h2>
      <input 
        placeholder="Company" 
        value={company}
        onChange={(e) => setCompany(e.target.value)}/>
      <input 
        placeholder="Role" 
        value={role}
        onChange={(e) => setRole(e.target.value)}/>
      <select 
        name="status" 
        id="status"
        value={status}
        required
        onChange={(e) => setStatus(e.target.value)}>
            <option value="Default" disabled hidden>Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer" >Offer</option>
        </select>
        <input 
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}/>
        <input 
            placeholder="Notes" 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}/>
            <Buttons/>
            
    </div>
  );
}

export default JobForm;