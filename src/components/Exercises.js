import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {

  const[currentPage,setCurrentPage] = useState([1]);
  // if(!exercises.length) return "Loading...";


  const exercisesPerPage  = 9;
  const indexOfLastExercise =currentPage*exercisesPerPage;
  const indexOfFirstExercise =  indexOfLastExercise-exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise,indexOfLastExercise)



  const paginate=(e,value)=>{
    setCurrentPage(value);
    Window.scrollTo({top:1800,behavior:"smooth"})

  }
  // if(!exercises.length) return "Loading...";
  useEffect(()=>{
    const fetchExerciseData = async()=>{
      let exerciseData=[];
      if(bodyPart === "all"){
        exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      }else{
        exerciseData=await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }

      setExercises(exerciseData)
    }
    fetchExerciseData()
    

  },[bodyPart])

  console.log(exercises);
  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Results</Typography>

      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise}/>
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length>9&&(
          <Pagination 
            color='secondary'
            shape='rounded'
            defaultPage={1}
            count={Math.ceil(exercises.length/exercisesPerPage)} 
            page={currentPage}
            onChange={paginate}
            size="large"

             />

        )}

      </Stack>
      
    </Box>
  )
}

export default Exercises
