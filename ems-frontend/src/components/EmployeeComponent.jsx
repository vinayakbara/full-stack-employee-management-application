import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmail] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          if (response?.data) {
            setFirstName(response.data.firstName || '');
            setLastName(response.data.lastName || '');
            setEmail(response.data.emailId || '');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  function validateForm() {
    let valid = true;
    const errorsCopy = { firstName: '', lastName: '', emailId: '' };

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First Name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last Name is required';
      valid = false;
    }

    if (emailId.trim()) {
      errorsCopy.emailId = '';
    } else {
      errorsCopy.emailId = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, emailId };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigate('/employees');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigate('/employees');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function pageTitle() {
    return <h2 className='text-center'>{id ? 'Update Employee' : 'Add Employee'}</h2>;
  }

  return (
    <div className='container'>
      <br />
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name</label>
                <input
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={handleFirstName}
                />
                {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name</label>
                <input
                  type='text'
                  placeholder='Enter Employee Last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={handleLastName}
                />
                {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input
                  type='text'
                  placeholder='Enter Employee Email'
                  name='emailId'
                  value={emailId}
                  className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                  onChange={handleEmail}
                />
                {errors.emailId && <div className='invalid-feedback'> {errors.emailId} </div>}
              </div>
              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
