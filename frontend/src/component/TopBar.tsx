import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Menu,
  Avatar,
  Divider,
  ListItemIcon, ListItemText
} from "@mui/material";
import { Menu as IconMenu, AccountCircle, Logout, PersonAdd, People, Settings } from '@mui/icons-material'
import {useState} from "react";
import {gotoLib} from "../lib/gotoLib.ts";

// eslint-disable-next-line react/prop-types
// @ts-ignore
export default function TopBar ({ title, onOpenMenu }) {
  document.title = title
  const [ showUserMenu, setShowUserMenu ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget)
    setShowUserMenu(true)
  }
  const userMenuList = [
    {
      text: "用户名",
      icon: <Avatar sx={{ mr: 1 }} />,
      disable: true
    },
    { line: true },
    {
      text: "登录账号",
      icon: <People />,
      onclick: gotoLib.login
    },
    {
      text: "注册账号",
      icon: <PersonAdd />,
      onclick: gotoLib.register
    },
    {
      text: "用户中心",
      icon: <AccountCircle />
    },
    {
      text: "系统设置",
      icon: <Settings />
    },
    {
      text: "退出登录",
      icon: <Logout />
    }
  ]
  const list: any[] = []
  userMenuList.forEach(item=>{
    if (item.line) {
      list.push(
        <Divider />
      )
    } else {
      list.push(
        <MenuItem disabled={ item.disable } onClick={item.onclick}>
          <ListItemIcon>{ item.icon }</ListItemIcon>
          <ListItemText>{ item.text }</ListItemText>
        </MenuItem>
      )
    }
  })
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position={"fixed"}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            size="large" onClick={onOpenMenu}
            sx={{ mr: 2 }}>
            <IconMenu />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1}}>{ title }</Typography>
          <IconButton color="inherit" onClick={handleClick}>
            <Avatar />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }} open={showUserMenu} onClose={()=>setShowUserMenu(false)}>
            {list}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
