import axios from "axios";
import LabelWithInput from "./LabelWithInput";
import {SyntheticEvent, useState} from "react";
import useLocalStorage from "../effects/useLocalStorage";
import { useNavigate } from "react-router-dom"; // до "шапки" файлу


const Login = () => {
    let [username, setUsername] = useState('Davyd')
    let [password, setPassword] = useState('')
    let [CancelToken,setToken] = useLocalStorage('token','')
    const navigate = useNavigate(); 


    function onSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const response = axios.post(`https://dogs.kobernyk.com/login`,{
            username,
            password
        }).then (response =>{
            setToken(response.data.token);
            setTimeout(() => navigate('/'), 10);
        });
      }


    

    return <>
        <h1>Сторінка авторизації</h1>
        <form onSubmit = {onSubmit}>
            <LabelWithInput
                labelName="Ім'я користувача"
                name='username'
                type='text'
                value={username}
                onChange={(value:string)=>{
                    setUsername(value);
                    console.log('new username',username);
                
                }}
                
                
            />
           <LabelWithInput
           labelName="Password"
           name="password"
           type="password"
           value={password}
           onChange={(value:string)=>{
            setPassword(value);
            }}
    
           />

            <button>Авторизуватися</button>
        </form>
    </>
}

export default Login;

