import { ChatState } from "../../context/chatprovider";
import { Box, ChakraProvider } from "@chakra-ui/react";
import SideDrawer from "../miscellaneous/SideDrawer";
import MyChats from "../miscellaneous/MyChats";
import ChatBox from "../miscellaneous/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  
  

   return(
    <ChakraProvider>
    <div style = {{width: "100%"}}>
    {user && <SideDrawer/>}
    <Box backgroundColor={"red.100"} display="flex" flexDirection={"row"} justifyContent="space-between" w="100%" h="91.5vh" p="10px" >
      {user && (
      <MyChats fetchAgain = {fetchAgain} />)}
      {user && (
      <ChatBox fetchAgain = {fetchAgain} setFetchAgain={setFetchAgain}/>)}
    </Box>
    </div>
    </ChakraProvider>
    );
    
};

export default ChatPage;