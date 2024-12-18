import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatContext';
import Profile from './Profile';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
import './style/box.css'

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState()
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast()

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something...",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false)
      setSearchResult(data)

    } catch (error) {
      toast({
        title: "Error occured!",
        description: "Failed to Load Search Data",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
    }
  }

  const accessChat = async (userId) => {

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="6px 12px 6px 12px"
        borderWidth="5px"
        borderRadius="5"
      >
        <div className='boxp'>
          <div className="lefts">
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
              <Button variant="ghost" onClick={onOpen} >
                <i className="fas fa-search"></i>
                <Text d={{ base: "none", md: "flex" }} px={5}>
                  Search User
                </Text>
              </Button>
            </Tooltip>
          </div>

          <div className="cen">
            <center>
            <Text fontSize="2xl" mr='25%'>
              Chat App by KP
            </Text>
            </center>
          </div>
          <div className='rights'>
           
            
            {/* <Menu>
              <MenuButton>
                <BellIcon fontSize="2xl" m={1} />
              </MenuButton>
            </Menu> */}
            
           </div>
           <div className="npro">
            
            <Menu>
              <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                {/* <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} /> */}
                <Text>{user.name}</Text>
              </MenuButton>
              <MenuList>
                <Profile user={user}>
                  <MenuItem>My Profile</MenuItem>{" "}
                </Profile>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
           
          </div>

        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottom="1px">
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb="2px">
              <Input
                placeholder="Search by name or email"
                mr={1}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                width="77%"
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map(user => (
                <UserListItem
                  key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default SideDrawer