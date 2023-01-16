import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Pet() {
    const defaultEyes = process.env.PUBLIC_URL + '/images/Eyes/eyes1.svg'
    const defaultNose = process.env.PUBLIC_URL + '/images/Nose/nose1.svg'
    const defaultMouth = process.env.PUBLIC_URL + '/images/Mouth/mouth1.svg'
    const defaultBody = process.env.PUBLIC_URL + '/images/Body/body1.svg'

    const [data, setData] = useState({
        name: "",
        eyesImageName: "",
        eyesImageSrc: defaultEyes,
        eyesImageId: 1,
        noseImageName: "",
        noseImageSrc: defaultNose,
        noseImageId: 1,
        mouthImageName: "",
        mouthImageSrc: defaultMouth,
        mouthImageId: 1,
        bodyImageName: "",
        bodyImageSrc: defaultBody,
        bodyImageId: 1,
    })

    const [farmId, setFarmId] = useState("")

    useEffect(() => {
        getFarm()
    }, [])

    const instance = axios.create({
        baseURL: 'https://localhost:44333/api/',
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}
    });

    function getFarm() {
        instance.get('farms').then(result => {
            console.log(result.data);
            setFarmId(result.data.id)
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
        if (data.name == "") {
            alert("Choose name.")
            return false
        }
        return true;
    }

    function submit(e) {
        e.preventDefault();
        if(validate())
        {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('eyesImageId', data.eyesImageId)
            formData.append('noseImageId', data.noseImageId)
            formData.append('mouthImageId', data.mouthImageId)
            formData.append('bodyImageId', data.bodyImageId)
            instance.post("farms/"+farmId+"/pets", formData)
            .then(result => {
                console.log(result.data)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert("Name must be unique.");
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
            });
        }
    }

    function handleEyes(eyes, id) {
        setData({...data, eyesImageSrc: eyes, eyesImageId: id})  
    }

    function handleNose(nose, id) {
        setData({...data, noseImageSrc: nose, noseImageId: id})     
    }

    function handleMouth(mouth, id) {
        setData({...data, mouthImageSrc: mouth, mouthImageId: id})     
    }

    function handleBody(body, id) {
        setData({...data, bodyImageSrc: body, bodyImageId: id})     
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

    return (
        <div>
            <div style={{width: "50%", float: "left"}}>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select eyes
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEyes(process.env.PUBLIC_URL + '/images/Eyes/eyes1.svg', 1)}><Image src={process.env.PUBLIC_URL + '/images/Eyes/eyes1.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEyes(process.env.PUBLIC_URL + '/images/Eyes/eyes2.svg', 2)}><Image src={process.env.PUBLIC_URL + '/images/Eyes/eyes2.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEyes(process.env.PUBLIC_URL + '/images/Eyes/eyes3.svg', 3)}><Image src={process.env.PUBLIC_URL + '/images/Eyes/eyes3.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEyes(process.env.PUBLIC_URL + '/images/Eyes/eyes4.svg', 4)}><Image src={process.env.PUBLIC_URL + '/images/Eyes/eyes4.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEyes(process.env.PUBLIC_URL + '/images/Eyes/eyes5.svg', 5)}><Image src={process.env.PUBLIC_URL + '/images/Eyes/eyes5.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleEyes(process.env.PUBLIC_URL + '/images/Eyes/eyes6.svg', 6)}><Image src={process.env.PUBLIC_URL + '/images/Eyes/eyes6.svg'} width="150" height="150"/></Dropdown.Item>                
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select nose
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleNose(process.env.PUBLIC_URL + '/images/Nose/nose1.svg', 1)}><Image src={process.env.PUBLIC_URL + '/images/Nose/nose1.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNose(process.env.PUBLIC_URL + '/images/Nose/nose2.svg', 2)}><Image src={process.env.PUBLIC_URL + '/images/Nose/nose2.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNose(process.env.PUBLIC_URL + '/images/Nose/nose3.svg', 3)}><Image src={process.env.PUBLIC_URL + '/images/Nose/nose3.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNose(process.env.PUBLIC_URL + '/images/Nose/nose4.svg', 4)}><Image src={process.env.PUBLIC_URL + '/images/Nose/nose4.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNose(process.env.PUBLIC_URL + '/images/Nose/nose5.svg', 5)}><Image src={process.env.PUBLIC_URL + '/images/Nose/nose5.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNose(process.env.PUBLIC_URL + '/images/Nose/nose6.svg', 6)}><Image src={process.env.PUBLIC_URL + '/images/Nose/nose6.svg'} width="150" height="150"/></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select mouth
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleMouth(process.env.PUBLIC_URL + '/images/Mouth/mouth1.svg', 1)}><Image src={process.env.PUBLIC_URL + '/images/Mouth/mouth1.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMouth(process.env.PUBLIC_URL + '/images/Mouth/mouth2.svg', 2)}><Image src={process.env.PUBLIC_URL + '/images/Mouth/mouth2.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMouth(process.env.PUBLIC_URL + '/images/Mouth/mouth3.svg', 3)}><Image src={process.env.PUBLIC_URL + '/images/Mouth/mouth3.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMouth(process.env.PUBLIC_URL + '/images/Mouth/mouth4.svg', 4)}><Image src={process.env.PUBLIC_URL + '/images/Mouth/mouth4.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMouth(process.env.PUBLIC_URL + '/images/Mouth/mouth5.svg', 5)}><Image src={process.env.PUBLIC_URL + '/images/Mouth/mouth5.svg'} width="150" height="150"/></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select body
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleBody(process.env.PUBLIC_URL + '/images/Body/body1.svg', 1)}><Image src={process.env.PUBLIC_URL + '/images/Body/body1.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBody(process.env.PUBLIC_URL + '/images/Body/body2.svg', 2)}><Image src={process.env.PUBLIC_URL + '/images/Body/body2.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBody(process.env.PUBLIC_URL + '/images/Body/body3.svg', 3)}><Image src={process.env.PUBLIC_URL + '/images/Body/body3.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBody(process.env.PUBLIC_URL + '/images/Body/body4.svg', 4)}><Image src={process.env.PUBLIC_URL + '/images/Body/body4.svg'} width="150" height="150"/></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleBody(process.env.PUBLIC_URL + '/images/Body/body5.svg', 5)}><Image src={process.env.PUBLIC_URL + '/images/Body/body5.svg'} width="150" height="150"/></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form className="mb-3" onSubmit={(e) => submit(e)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => handle(e)} id="name" value={data.name}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
            <div style={{marginLeft: "75%"}}>
                <Image src={data.eyesImageSrc} width="100" height="100"/><br/>
                <Image src={data.noseImageSrc} width="100" height="100"/><br/>
                <Image src={data.mouthImageSrc} width="100" height="100"/><br/>
                <Image src={data.bodyImageSrc} width="100" height="100"/><br/>
            </div>
        </div>
    )
}