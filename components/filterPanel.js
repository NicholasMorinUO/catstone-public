import React, { useEffect, useState } from 'react';

export default function FilterPanel({ showPanel, onFilterCriteriaChange, children }) {
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('');
  const [selectedTimeTo, setSelectedTimeTo] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAnimalName, setSelectedAnimalName] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [selectedOwnerName, setSelectedOwnerName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSubmit = () => {
    const filterCriteria = {
      timeFrom: selectedTimeFrom,
      timeTo: selectedTimeTo,
      gender: selectedGender,
      animalName: selectedAnimalName,
      ageGroup: selectedAgeGroup,
      ownerName: selectedOwnerName,
      location: selectedLocation
    };
    onFilterCriteriaChange(filterCriteria);
  };

  const handleReset = () => {
    setSelectedTimeFrom('')
    setSelectedTimeTo('')
    setSelectedGender('')
    setSelectedAnimalName('')
    setSelectedAgeGroup('')
    setSelectedOwnerName('')
    setSelectedLocation('')
  };

  useEffect(() => {
    handleSubmit()
  }, []);

  return (
    <div className={`hidden-panel ${showPanel ? 'show' : ''}`}>
      {children}
      <div className='filterPanel-text'>
        <h6>Filters</h6>
        <p className='filterPanel-text-sub'>Use these options to filter out cats</p>
      </div>
      <div className='input-container'>
        <div className='mt-3'>
          <label htmlFor="timeFromInput" className='label'>From (Date):</label>
          <input
            type="date"
            className="form-control input"
            id="timeFromInput"
            name="time_from"
            value={selectedTimeFrom}
            onChange={(e) => setSelectedTimeFrom(e.target.value)}
          />
        </div>
        <div className='mt-3'>
          <label htmlFor="timeToInput" className='label'>To (Date):</label>
          <input
            type="date"
            className="form-control input"
            id="timeToInput"
            name="time_to"
            value={selectedTimeTo}
            onChange={(e) => setSelectedTimeTo(e.target.value)}
          />
        </div>
        <div className='mt-3'>
          <label htmlFor="genderSelect" className='label'>Gender:</label>
          <select
            className="form-control input"
            id="genderSelect"
            name="gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className='mt-3'>
          <label htmlFor="animalNameInput" className='label'>Animal Name:</label>
          <input
            type="text"
            className="form-control input"
            id="animalNameInput"
            name="animal_name"
            value={selectedAnimalName}
            onChange={(e) => setSelectedAnimalName(e.target.value)}
          />
        </div>
        <div className='mt-3'>
          <label htmlFor="ownerNameInput" className='label'>Owner Name:</label>
          <input
            type="text"
            className="form-control input"
            id="ownerNameInput"
            name="owner_name"
            value={selectedOwnerName}
            onChange={(e) => setSelectedOwnerName(e.target.value)}
          />
        </div>
        <div className='mt-3'>
          <label htmlFor="ageGroupSelect" className='label'>Age Group:</label>
          <select
            className="form-control input"
            id="ageGroupSelect"
            name="age_group"
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
          >
            <option value="">Select</option> {/*all of the above*/}
            <option value="1-3">1-3</option> {/*baby*/}
            <option value="4-10">4-10</option> {/*young adult*/}
            <option value="10-15">10-15</option> {/*adult*/}
            <option value="15-20">15-20</option> {/*senior */}
          </select>
        </div>
        <div className='mt-3'>
          <label htmlFor="locationSelect" className='label'>Location data:</label>
          <select
            className="form-control input"
            id="locationSelect"
            name="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Original</option>
            <option value="Current">Current</option>
          </select>
        </div>
      </div>
      <button type="button" className="reset-button mt-5" onClick={handleReset}>
          Reset
      </button>
      <button type="button" className="submit-button mt-5" onClick={handleSubmit}>
          Submit
      </button>
    </div>
  );
}