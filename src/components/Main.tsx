import { Link, Navigate } from "react-router-dom"
import useLocalStorage from "../effects/useLocalStorage"
import { useEffect, useState } from "react"
import axios from "axios"
import { link } from "fs"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


const Main = () => {
  const [token,setToken] = useLocalStorage('token','')
  const [dogs, setDogs]= useState([] as any [])


  const logout = () => {
    setToken('');
  }

  const getDogs = () => {
    if (!token) {
      return;
    }
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`,{
      headers: {
        "Authorization":`Bearer ${token}`
      }
    }).then (response =>{
      setDogs(response.data);
      console.log(response.data)
  });
  }
  useEffect(getDogs,[]);

  if(token){
    return <>
      Ви авторизовані<br/>
      <button onClick={logout}>Вийти</button>
      {dogs.map(dog =>{
        return <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={dog.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Колір: {dog.color}<br/>
              Порода: {dog.breed}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <button>Detail</button>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      })}
    </>;
  } else {
    return <>
      <Link to="/login">Авторизуватися</Link>
    </>
  }
  return <>
  </>
}

export default Main
