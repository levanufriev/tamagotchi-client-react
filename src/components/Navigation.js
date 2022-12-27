import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component {
    render(){
        return(
            <Navbar>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/register'>Register</NavLink>
                <NavLink to='/farm'>Farm</NavLink>
            </Navbar>
        )
    }
} 