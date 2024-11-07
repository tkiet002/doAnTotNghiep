import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Topbar from './scenes/global/Topbar'
import './App.css'
import { Routes, Route, useLocation, matchPath } from 'react-router-dom';
import Dashboard from "./scenes/dashboard/";
import Navbar from './scenes/global/Navbar'
import Schedule from './scenes/schedule/index'
import Lessons from './scenes/lessons/lesson';
import PracticeLesson from './scenes/lessons/practiceLesson';
import CreateLesson from './scenes/lessons/AddOrEditLesson'
import LoginPage from './scenes/login/login'
import LogoutPage from './scenes/logout/logout'
import RegisterPage from './scenes/register/register'
import EditPage from './scenes/lessons/editLesson'
import {AuthContext} from './helpers/AuthContext'
import { useState } from 'react';
export default function App() {
  const [theme, colorMode] = useMode();
  const [authState, setAuthState] = useState({username: "", id: 0, status: false});
  let params = {
    headers:{
      accessToken: localStorage.getItem("accessToken")
    }
  } 

  //handle practice page

  
  const location = useLocation();
  const isPracticePage = location.pathname.startsWith("/practice")
  const isCreatingPage = location.pathname.startsWith("/create/lesson")
  const isEditPage = location.pathname.startsWith("/edit/lesson")
  const isLoginPage = location.pathname.startsWith("/login")
  const isRegisterPage = location.pathname.startsWith("/register")
  //end handle practice page
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          { !(isPracticePage || isCreatingPage || isEditPage || isLoginPage || isRegisterPage) && <Navbar /> }
            <main className={ isPracticePage ? 'practice-content' : 'content'}>
            { !(isPracticePage || isCreatingPage || isEditPage || isLoginPage || isRegisterPage) && <Topbar /> }
              <Routes>
                <Route path="/" element={<Dashboard />} /> 
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/practice/lesson/:lesson_id/" element={<PracticeLesson />} />  
                <Route path='/edit/lesson/:lesson_id/' element={<CreateLesson />} />
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="/logout" element={<LogoutPage />} /> 
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/edit" element={<EditPage />} /> 
              </Routes>
            </main>
            
          </div>
          
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthContext.Provider>
  );
} 



