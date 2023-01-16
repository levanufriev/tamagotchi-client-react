import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function FarmsOverview() {
    const [data, setData] = useState([])
    const [farmId, setFarmId] = useState("")
    const [farmGetCompleted, setFarmGetCompleted] = useState(false)

    useEffect(() => {
        getFarm();
    }, [])

    useEffect(() => {
        if (farmGetCompleted) {
            getPets();
        }
    }, [farmGetCompleted])

    const instance = axios.create({
        baseURL: 'https://localhost:44333/api',
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}
      });

    function getFarm() {
        instance.get('/farms').then(result => {
            setFarmId(result.data.id)
            console.log(result.data.id)
            setFarmGetCompleted(true)
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

    function getPets() {
        instance.get('/farms').then(result => {
            console.log(result);
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
        console.log(farmId)
        instance.get('/farms/'+farmId+'/pets').then(result => {
            console.log(result);
            setData(result.data)
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

    function submit(e) {
        e.preventDefault();
        instance.post('farms',{
            name: data.name
        }).then(result => {
            console.log(result)
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
    }

    const arr = data.map((data, index) => {
        return (
            <Col md={4}>            
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Image src={data.eyesImageSrc} width="100" height="100"/><br/>
                    <Image src={data.noseImageSrc} width="100" height="100"/><br/>
                    <Image src={data.mouthImageSrc} width="100" height="100"/><br/>
                    <Image src={data.bodyImageSrc} width="100" height="100"/><br/>
                    <h1>{data.age}</h1>
                </Card.Body>
            </Card>
            </Col>
        )
    })

    
    return(
        <div>
            <Container>
                <Row>
                    {arr}
                </Row>
            </Container>
        </div>
    )
}