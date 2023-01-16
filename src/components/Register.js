import React, {useState} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";

export default function Register() {
    const defaultImageSource = process.env.PUBLIC_URL + '/images/no-avatar.png'

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageName: "",
        imageSrc: defaultImageSource,
        imageFile: null
    })

    function validate() {
        if (data.imageFile == null) {
            alert("Choose avatar.")
            return false
        }        
        if (data.firstName == "" || data.lastName == "" 
            || data.email == "" || data.password == "" 
            || data.confirmPassword == "") {
            alert("All fields must be filled.")
            return false
        }
        if (data.confirmPassword != data.password) {
            alert("Confirm password again.")
            return false
        }
        return true;
    }

    function submit(e) {
        e.preventDefault();
        if(validate())
        {
            const formData = new FormData()
            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('email', data.email)
            formData.append('password', data.password)
            formData.append('confirmPassword', data.confirmPassword)
            formData.append('imageFile', data.imageFile)
            axios.post("https://localhost:44333/api/authentication", formData)
            .then(result => {
                console.log(result.data)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert(error.response.data);
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
            });
        }
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }    

    function showPreview(e) {
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0]
            const reader = new FileReader();
            reader.onload = x => {
                setData({
                    ...data,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setData({
                ...data,
                imageFile: null,
                imageSrc: defaultImageSource
            })
        }
    }

    return (
        <div align="center">
        <Form className="mb-3" onSubmit={(e) => submit(e)}>
            <Image src={data.imageSrc} width="150" height="150"/>
            <Form.Group className="mb-3 px-5">
                <Form.Label>Choose avatar</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={(e) => showPreview(e)}/>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" onChange={(e) => handle(e)} id="firstName" value={data.firstName}/>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" onChange={(e) => handle(e)} id="lastName" value={data.lastName}/>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => handle(e)} id="email" value={data.email}/>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => handle(e)} id="password" value={data.password}/>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" onChange={(e) => handle(e)} id="confirmPassword"value={data.confirmPassword}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}