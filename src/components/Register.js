import React, {useState} from 'react'
import axios from 'axios';

export default function Register() {
    const url = "https://localhost:44333/api/authentication"
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function submit(e) {
        e.preventDefault();
        axios.post(url,{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        }).then(result => {
            console.log(result.data)
        }).catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
            } 
          });
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input type="text" placeholder="Enter first name" onChange={(e) => handle(e)} id="firstName" value={data.firstName}></input>
                <input type="text" placeholder="Enter last name" onChange={(e) => handle(e)} id="lastName" value={data.lastName}></input>
                <input type="email" placeholder="Enter email" onChange={(e) => handle(e)} id="email" value={data.email}></input>
                <input type="password" placeholder="Enter password" onChange={(e) => handle(e)} id="password" value={data.password}></input>
                <input type="password" placeholder="Confirm password" onChange={(e) => handle(e)} id="confirmPassword" value={data.confirmPassword}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}