import { useState,useContext, useEffect } from "react"
import {Sidebar,SubMenu, Menu, MenuItem} from 'react-pro-sidebar'
// import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from "react-router-dom"
import { theme_tokens } from "../../theme"
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { BookRounded, CalendarTodayOutlined, ChatRounded, HomeOutlined, PieChartOutlineOutlined } from "@mui/icons-material"
import { AuthContext } from "../../helpers/AuthContext"
import axios from "axios"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = theme_tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[500],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
      
    </MenuItem>
  );
};

export default function Navbar() {
  const theme = useTheme();
  const colors = theme_tokens(theme.palette.mode)

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("Dashboard")


  const {authState} = useContext(AuthContext);
  const {setAuthState} = useContext(AuthContext);
  let params = {
    headers:{
      accessToken: localStorage.getItem("accessToken")
    }
  } 
  
  
  useEffect(() =>{
    axios.post("http://localhost:3001/auth/getAuth/", params).then((response) => {
      
      if (response.data.error) {
        setAuthState({ username: "", id: 0, status: false });
        
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        
      }
    });
  },[])

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: "400px",
        color: colors.primary[400],
      }}
    >
      <Sidebar width="300px" collapsed={isCollapsed}>
        <Menu>
          <MenuItem>
            <button
              className="sb-button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[400],
                float: "right",
                borderStyle: "none",
              }}
            >
              {!isCollapsed ? (
                <KeyboardDoubleArrowLeftOutlinedIcon />
              ) : (
                <KeyboardDoubleArrowRightOutlinedIcon />
              )}
            </button>
          </MenuItem>
          <MenuItem>
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  QUIZTHIS
                </Typography>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../../src/assets/user.png`}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    marginTop: "35px",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Welcome, {authState.username}
                </Typography>
              </Box>
            </Box>
          )}
          
          <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bài đã tạo"
              to="/lessons"
              icon={<BookRounded />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Chỉnh sửa bài tập"
              to="/edit"
              icon={<BookRounded />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Thời khóa biểu"
              to="/schedule"
              icon={<CalendarTodayOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
        </Menu>
      </Sidebar>
    </div>
  );
}
