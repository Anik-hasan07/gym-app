import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import Detail from "../components/Detail"
import ExercisesVideos from "../components/ExercisesVideos"
import SimilarExercises from "../components/SimilarExercises"
import {exerciseOptions,fetchData,youtubeOptions} from "../utils/fetchData"
import { useParams } from 'react-router-dom';

const ExerciseDetail = () => {
  const[exerciseDetail,setExerciseDetail] = useState({})
  const[exercisesVideos,setExerciseVideos]=useState([])
  const[targetMuscleExercises,setTargrtMuscleExercises]=useState([]);
  const[equipmentExercises,setEquipmentExercises]=useState([]);
  
  const{id}=useParams();

  useEffect(()=>{
  const fetchExerciseData = async()=>{
  const exerciseDbUrl="https://exercisedb.p.rapidapi.com"
  const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";

  const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOptions); 
  // console.log({exerciseDetailData});
  setExerciseDetail(exerciseDetailData);

  const exercisesVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,youtubeOptions)
  setExerciseVideos(exercisesVideosData.contents)

  const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.targrt}`,exerciseOptions);
  setTargrtMuscleExercises(targetMuscleExercisesData)
  const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.equipment}`,exerciseOptions);
  setEquipmentExercises(equipmentExercisesData);

}

fetchExerciseData();
  },[id])


  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExercisesVideos exercisesVideos={exercisesVideos} name={exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
      

      
    </Box>
   
  )
}

export default ExerciseDetail
