import { Box } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";

function App() {
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <BrowserRouter>
      <Navbar/>
    <Routes>
     
          <Route path="/" element={<Home/>} />
          <Route path="/exercise/:id" element={<ExerciseDetail/>} />
         
        
    </Routes>
    <Footer/>
  </BrowserRouter>
  
    </Box>
  );
}

export default App;

// 2:15:10
