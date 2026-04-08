import React, { useEffect, useState } from 'react';



function JobForm({ onAddJob, onJobUpdate, editableJob, onFormClear }) {

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Default');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    function fillForm() {
      setCompany(editableJob.Company);
      setRole(editableJob.Role);
      setStatus(editableJob.Status);
      setNotes(editableJob.Notes);
      setDate(editableJob.dateApplied);
    }
    fillForm();
  }, [editableJob])

  function handleSubmit() {

    const job = { company: company, role: role, status: status, notes: notes, dateApplied: date }
    if (checkForError(job) === 1) {
      return
    }

    onAddJob(job);

    const clearForm = { Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' }
    onFormClear(clearForm);

  }

  function handleUpdate() {

    const job = { Id: editableJob.Id, company: company, role: role, status: status, notes: notes, dateApplied: date }
    if (checkForError(job) === 1) {
      return
    }

    onJobUpdate(job);

    const clearForm = { Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' }
    onFormClear(clearForm);
  }

  function handleCancel() {

    const clearForm = { Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' }
    onFormClear(clearForm);
  }

  function Buttons() {
    if (editableJob.Id == '') {
      return (<span>
        <button class="add-button" onClick={handleSubmit}>Add</button>
      </span>);
    }
    if (editableJob.Id != '') {
      return (
        <span>
          <button class="update-button" onClick={handleUpdate}>Update</button>
          <button class="cancel-button" onClick={handleCancel}>Cancel</button>
        </span>
      );
    }
  }

  function checkForError(job) {
    if (job.company === "") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    if (job.role === "") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    if (job.dateApplied === "") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    if (job.status === "Default") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    setErrorMessage(0)
    return 0
  }

  return (
    <div>
      <h2>Add/Edit Job Application</h2>
      <div>
        <label className="block-label" htmlFor="company">Company:</label>
        <input
          className="full-width-input"
          placeholder="Company"
          value={company}
          id="company"
          required={true}
          onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div>
        <label className="block-label" htmlFor="role">Role:</label>
        <input
          className="full-width-input"
          placeholder="Role"
          value={role}
          id="role"
          required={true}
          onChange={(e) => setRole(e.target.value)} />
      </div>
      <div>
        <label className="block-label" htmlFor="status">Application Status:</label>
        <select
          className="full-width-input"
          name="status"
          id="status"
          value={status}
          required={true}
          onChange={(e) => setStatus(e.target.value)}>
          <option value="Default" disabled hidden>Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer" >Offer</option>
        </select>
      </div>
      <div>
        <label className="block-label" htmlFor="date">Date Applied:</label>
        <input
          className="input"
          type="date"
          id="date"
          value={date}
          required={true}
          onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label className="block-label" htmlFor="notes">Job Notes:</label>
        <input
          className="full-width-input"
          placeholder="Notes"
          value={notes}
          id="notes"
          onChange={(e) => setNotes(e.target.value)} />
      </div>
      <Buttons />


    </div>
  );
}

export default JobForm;