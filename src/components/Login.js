import React, {useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
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
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.status == 401) {
                    alert("Wrong email or password.");
                }
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
          });
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

    return (
        <div align="center">
            <Form className="mb-3" onSubmit={(e) => submit(e)}>
                <Form.Group className="mb-3 px-5">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => handle(e)} id="email" value={data.email}/>
                </Form.Group>

                <Form.Group className="mb-3 px-5">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => handle(e)} id="password" value={data.password}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Button href="/register" variant="primary" type="submit">
                Register
            </Button>
        </div>
    )
}