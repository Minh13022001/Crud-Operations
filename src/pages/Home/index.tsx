import React from 'react'
import './index.scss'
import Box from '../../components/Statistic'
import student from '../../assets/graduation-cap 1.png'
import course from '../../assets/bookmark 1.png'
import payments from '../../assets/usd-square 1.png'
import user from '../../assets/Vector.png'


const Home = () => {
  
  return (
    <div className='home'>
      <Box bgColor='#F0F9FF' total={243} name='Students' imgSrc={student}/>
      <Box bgColor='#FEF6FB' total={13} name='Course'imgSrc={course}/>
      <Box bgColor='#FEFBEC' currency='INR' total={550} name='Payments' imgSrc={payments}/>
      <Box bgColor='linear-gradient(110.42deg, #FEAF00 18.27%, #F8D442 91.84%)' total={3} name='Users' imgSrc={user}/>


    </div>
  )
}

export default Home