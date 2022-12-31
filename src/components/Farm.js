import React, {useState} from 'react'
import axios from 'axios'

export default function Farm() {
    const [data, setData] = useState({
        name: ""
    })

    const instance = axios.create({
        baseURL: 'https://localhost:44333/api/',
        headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}
      });

    const farm = axios.get('/farms').then(result => {
        console.log(result);
    });

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

    if (farm.data == null)
    {
        return(
            <form onSubmit={(e) => create(e)}>
                <input type="text" placeholder="Enter name" onChange={(e) => handle(e)} id="name" value={data.name}></input>
                <button>Create</button>
            </form>
        )
    }

    return (
        <div>
            <div>{data.name}</div>
        </div>
    )
}