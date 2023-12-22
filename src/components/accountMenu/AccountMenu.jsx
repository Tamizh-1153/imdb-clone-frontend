import {
  Avatar,
  Center,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Text,
} from "@mantine/core"
import React from "react"
import "./accountMenu.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeUser } from "../../features/user/userSlice"

const AccountMenu = ({ user }) => {
  const dispatch = useDispatch()
  const refresh = useNavigate()

  const logOut = () => {
    dispatch(removeUser())
    localStorage.removeItem("token")
    refresh("/")
    window.location.reload()
  }

  return (
    <Menu trigger="hover" width={200}>
      <MenuTarget>
        <Group>
          <Avatar
            style={{ cursor: "pointer" }}
            
            className="account_icon"
            color="cyan"
            radius="xl"
          >
            {user?.name.charAt(0)}
          </Avatar>
          <Center>Hi, {user.name}</Center>
        </Group>
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>Account</MenuLabel>
        <MenuItem
          onClick={() => {
            refresh("/add-movie")
          }}
        >
          Add Movie
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            refresh("/my_recipes")
          }}
        >
          My Recipes
        </MenuItem>
        <MenuItem
          onClick={() => {
            refresh("/my_favorites")
          }}
        >
          Favorites
        </MenuItem> */}
        <MenuItem onClick={() => logOut()}>Log out</MenuItem>
      </MenuDropdown>
    </Menu>
  )
}

export default AccountMenu
