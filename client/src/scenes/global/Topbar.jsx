import {Box , IconButton, useTheme} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, theme_tokens } from "../../theme";
import  InputBase from "@mui/material/InputBase";
import  LightModeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import  DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import  NotificationOutlinedIcon  from "@mui/icons-material/NotificationsOutlined";
import  SettingsOutlinedIcon  from "@mui/icons-material/SettingsOutlined";
import  PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import  SearchIcon  from "@mui/icons-material/Search";
import Dropdown from "../dropdown/Dropdown";


export default function Topbar() {
  const theme = useTheme();
  const colors = theme_tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: "white" }}
          placeholder="Search"
        ></InputBase>
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display={"flex"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          
          <Dropdown />
          
        </IconButton>
      </Box>
    </Box>
  );
}



