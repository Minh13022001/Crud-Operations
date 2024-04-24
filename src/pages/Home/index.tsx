import React, { useContext, useEffect, useState } from 'react'
import './index.scss'
import Box from '../../components/Statistic'
import student from '../../assets/graduation-cap 1.png'
import course from '../../assets/bookmark 1.png'
import payments from '../../assets/usd-square 1.png'
import user from '../../assets/Vector.png'
import { Result } from '../../type/result'
import { AppContext } from '../../contexts/app.context'


const Home = () => {
  const { setIsAuthenticated, isAuthenticated, setProfile, users, setUser } = useContext(AppContext);

  const fetchUsers = () => {
    fetch("https://66179268ed6b8fa434830f0b.mockapi.io/api/students", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // Specify the return type as Promise<Task[]>
        }
        // handle error
      })
      .then((data: Result[]) => {
        setUser(data);
      })
      .catch((error) => {
        console.log("you got an error", error);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div className='home'>
      <Box bgColor='#F0F9FF' total={(users as Result[]).length} name='Students' imgSrc={student}/>
      <Box bgColor='#FEF6FB' total={13} name='Course'imgSrc={course}/>
      <Box bgColor='#FEFBEC' currency='INR' total={550} name='Payments' imgSrc={payments}/>
      <Box bgColor='linear-gradient(110.42deg, #FEAF00 18.27%, #F8D442 91.84%)' total={3} name='Users' imgSrc={user}/>


    </div>
  )
}

export default Home