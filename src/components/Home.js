import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';

export class Home extends Component {
    render(){
        return(
            <div align="center">
                <Button href="/login" variant="primary" type="submit">
                    Login
                </Button>
            </div>
        )
    }
} 