import {React, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button } from 'react-bootstrap';
import './App.css';
import {useCookies} from 'react-cookie';
import axios from 'axios';

const Auth = () => {
    const [cookies, setCookies] = useCookies("access_token")
    const removeCookies = () => {
        setCookies("access_token" , "")
        window.localStorage.removeItem('adminID')
        window.location.reload(false)
    }
  return (
    <div>
      
      {
        cookies.access_token ? <Button variant='danger' onClick={removeCookies}>Logout</Button>
        :(
            <>
                <Register />
                <Login />  
            </>
        )
         
      }
    </div>
  )
}


const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = async(e) => {
        e.preventDefault();
       await axios.post("http://localhost:3001/register", {username,password})
        alert("Admin was created")
    }
    return(
        <AuthForm
       label="Register"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit= {onSubmit}                                
       />
    )
}


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [_ , setCookies] = useCookies(['access_token'])
    const onSubmit = async(e) => {
        e.preventDefault();
      const response = await axios.post("http://localhost:3001/login", {username,password})
      setCookies("access_token",response.data.token)
      window.localStorage.setItem("userID", response.data.adminID)
      window.location.reload(false)
    }
    return(
        <AuthForm
       label="Login"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit= {onSubmit}                                
       />
    )
}

const AuthForm = ({label,username, setUsername, password, setPassword, onSubmit}) => {
    return(
        <Container>
            <Form action="#" className='form' onSubmit={onSubmit}>
                <h2 className='text-white'>{label}</h2>
                
                    
                    <Form.Control type="text" placeholder='Name' id='username' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    
                    <Form.Control type="text" placeholder='Password' id='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <Button variant='success' type='submit'>{label}</Button>
                
            </Form>
        </Container>
    )
}


export default Auth
