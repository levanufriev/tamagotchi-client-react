import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function FarmsOverview() {
    const [data, setData] = useState({
        id: "",
        name: "",
        petsAmount: 0
    })

    useEffect(() => {
        getFarm();
    }, [])

    const instance = axios.create({
        baseURL: 'https://localhost:44333/api',
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}
      });

    var isExist;

    function getFarm() {
        instance.get('/farms').then(result => {
            console.log(result);
            setData({id: result.data.id, name: result.data.name, petsAmount: result.data.petsAmount})
            localStorage.setItem('farmId', data.id)
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

    
    return(
        <div>
            <h1>{data.name}</h1>
            <h1>{data.petsAmount}</h1>
        </div>
    )
}