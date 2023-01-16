import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";

export default function AccountDetails() {    
    const defaultImageSource = process.env.PUBLIC_URL + '/images/no-avatar.png'

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        imageName: "",
        imageSrc: defaultImageSource,
        imageFile: null
    })

    useEffect(() => {
        getUser();
    }, [])

    const instance = axios.create({
        baseURL: 'https://localhost:44333/api',
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}
    });

    function getUser() {
        instance.get('/authentication').then(result => {
            console.log(result);
            setData({firstName: result.data.firstName, lastName: result.data.lastName, imageSrc: result.data.imageSrc});
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        });
    }

    function validate() {
        console.log("validate")
        if (data.firstName == "" || data.lastName == "") {
            alert("First name and last name fields must be not empty.")
            return false
        }
        else if (data.confirmNewPassword != data.newPassword) {
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
            formData.append('oldPassword', data.oldPassword)
            formData.append('newPassword', data.newPassword)
            formData.append('confirmNewPassword', data.confirmNewPassword)
            formData.append('imageFile', data.imageFile)
            instance.put("/authentication", formData)
            .then(result => {
                alert("Success")
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
                <Form.Label>Old password</Form.Label>
                <Form.Control type="password" placeholder="Old password" onChange={(e) => handle(e)} id="oldPassword" value={data.oldPassword}/>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
                <Form.Label>New password</Form.Label>
                <Form.Control type="password" placeholder="New password" onChange={(e) => handle(e)} id="newPassword" value={data.newPassword}/>
            </Form.Group>
            <Form.Group className="mb-3 px-5">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control type="password" placeholder="Confirm new password" onChange={(e) => handle(e)} id="confirmNewPassword" value={data.confirmNewPassword}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}