import {
    Box, 
    Button, 
    Drawer, 
    DrawerBody, 
    DrawerContent, 
    DrawerHeader, 
    DrawerOverlay, 
    Input, 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuList, 
    Text, 
    Tooltip,
    useToast, 
   } from "@chakra-ui/react";
import {Spinner} from '@chakra-ui/spinner'
import { useDisclosure } from '@chakra-ui/hooks'
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import React, { useState } from "react";
import { ChatState } from "../../context/chatprovider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./User Avatar/UserListItem";
import { getSender } from "./ChatLogics";

 
    const SideDrawer = () => {
        const [search, setSearch] = useState("");
        const [searchResult, setSearchResult] = useState([]);
        const [loading, setLoading] = useState(false);
        const [loadingChat, setLoadingChat] = useState(false);
        const {isOpen, onOpen, onClose} = useDisclosure();
        const {user, setSelectedChat,chats,setChats,notification,setNotification } = ChatState();
        const toast = useToast();


        const handleSearch = async () => {
            if (!search) {
              toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
              });
              return;
            }
        
            try {
              setLoading(true);
        
              const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
            //   console.log (user.token)
              
              const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
        
              setLoading(false);
              setSearchResult(data);
            } catch (error) {
              toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
              });
            }
          };

          const accessChat = async (userId) => {
        //     console.log(userId);
        
            try {
              setLoadingChat(true);
              const config = {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              };


              const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);
        
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
                position: "bottom-right",
              });
            }
          };


    return(
        <>
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
        >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Friends and Groups
        </Text>
        <div>
            <Menu>
                <MenuButton padding={1}>
                {/* <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                /> */}
                <BellIcon fontSize="2xl" margin={1} />
                </MenuButton>
                <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
            </Menu>

             
             {/* **********For My Profile and Logout button************* */}
            {/* <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu> */}


        </div>

        </Box>

        <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" paddingBottom={2}>
              <Input
                placeholder="Search by name or email"
                marginRight={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
               onClick={handleSearch}
               >Go
               </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : ( 
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
          
        </>
    )};

export default SideDrawer;