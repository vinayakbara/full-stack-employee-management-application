import  {useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom'
import { listEmployees } from '../services/EmployeeService'
import { deleteEmployee } from '../services/EmployeeService'


const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
      
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })

    }

    function addNewEmployee() {
        navigator('/add-employee')

    }

    function handleUpdate(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) => {
        
                getAllEmployees();
            
        }).catch(error => {
                console.error(error);
            })
        }
        
    
  return (
    <div><div className='container'>
        <br/>
        <div className='card col-md-16'>
    <h2>
        List of Employees
    </h2>
    <button className='btn btn-primary w-auto mb-2' onClick={addNewEmployee}>Add Employee</button>
    <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map(employee =>
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td> 
                        <td>{employee.emailId}</td>
                        <td><button className='btn btn-info me-4' onClick={() => handleUpdate(employee.id) }>Update</button>
                        <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button></td>

                    </tr>
                )
            }
        </tbody>
    </table>
    </div>
</div></div>
  )
}


export default ListEmployeeComponent
