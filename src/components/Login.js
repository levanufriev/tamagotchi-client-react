import React, {useState} from 'react'
import axios from 'axios';

export default function Login() {
    const url = "https://localhost:44333/api/authentication/login"
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const instance = axios.create({
        baseURL: 'https://localhost:44333/api/'
      });

    function submit(e) {
        e.preventDefault();
        instance.post('authentication/login',{
            email: data.email,
            password: data.password
        }).then(result => {
            console.log(result)
            const token = result.data.token
            localStorage.setItem('token', token)
            console.log(localStorage.getItem('token'))
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
                <input type="email" placeholder="Enter email" onChange={(e) => handle(e)} id="email" value={data.email}></input>
                <input type="password" placeholder="Enter password" onChange={(e) => handle(e)} id="password" value={data.password}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}