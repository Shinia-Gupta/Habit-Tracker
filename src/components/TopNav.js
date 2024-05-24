import React from 'react'; // Importing React library
import { HStack, Heading, Icon, Menu, MenuButton, MenuItem, MenuList, Button, Tooltip, useColorMode, useToast } from "@chakra-ui/react"; // Importing necessary components from Chakra UI
import { FaUserNinja, FaBars } from "react-icons/fa"; // Importing icons from react-icons/fa
import { TbBrightnessUp } from "react-icons/tb"; // Importing TbBrightnessUp icon from react-icons/tb
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector hooks from react-redux
import { habitAction } from '../redux/habitReducer'; // Importing habitAction from habitReducer
import { dashAction, dashSelector } from '../redux/dashboardReducer'; // Importing dashAction and dashSelector from dashboardReducer
import { IoMoon } from "react-icons/io5"; // Importing IoMoon icon from react-icons/io5

function TopNav({ onOpen, title, bgColor, textColor }) {
  const dispatch = useDispatch(); // useDispatch hook
  const toast = useToast(); // useToast hook
  const { toggleColorMode } = useColorMode(); // useColorMode hook
  const { lightMode } = useSelector(dashSelector); // useSelector hook

  // Function to handle adding habit
  const handleAddHabit = () => {
    dispatch(habitAction.setShowAddForm()); // Dispatching action to show add form
  };

  // Function to clear local storage
  const clearLocalStorage = () => {
    dispatch(habitAction.deleteAllHabits()); // Dispatching action to delete all habits
    // Toast notification
    toast({
      title: "All Habits Deleted !! ",
      status: "error",
      duration: 5000,
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <HStack
      justifyContent={"space-between"} // Space between elements in the horizontal stack
      h={16} // Height of the stack
      p={8} // Padding
      boxShadow={"lg"} // Box shadow
      bg={bgColor} // Background color
      color={textColor} // Text color
      w={"full"} // Full width of the viewport
    >
      {/* Icon for opening side drawer */}
      <Icon as={FaBars} onClick={onOpen} display={{ base: "flex", lg: "none" }} />
      <Heading>{title}</Heading> {/* Title */}
      <HStack spacing={6}> {/* Horizontal stack for additional actions */}
        {/* Button to toggle color mode */}
        <Tooltip label='Toggle Mode' placement='bottom-start'>
          <Button bg={"none"} _hover={{ bgColor: "none" }} _active={{ bg: "none" }} onClick={() => {
            dispatch(dashAction.setMode()); // Dispatching action to set mode
            toggleColorMode(); // Toggling color mode
          }}>
            <Icon as={lightMode ? TbBrightnessUp : IoMoon} fontSize={20} color={"yellow.500"} _hover={{ color: "yellow.400" }} cursor={"pointer"} />
          </Button>
        </Tooltip>
        {/* Menu for additional actions */}
        <Menu>
          <Tooltip label='Click to Perform Actions' placement='bottom-start'>
            <MenuButton>
              <Icon as={FaUserNinja} fontSize={16} color={"brand.60"} _hover={{ color: "green.200" }} cursor={"pointer"} />
            </MenuButton>
          </Tooltip>
          {/* Menu list */}
          <MenuList>
            {/* Menu item to add a habit */}
            <MenuItem _hover={{ bg: "brand.6", color: "brand.40" }} onClick={handleAddHabit} color={"brand.70"}>
              Add a Habit
            </MenuItem>
            {/* Menu item to remove all habits */}
            <MenuItem _hover={{ bg: "brand.6", color: "brand.40" }} onClick={clearLocalStorage} color={"brand.70"}>
              Remove All Habits
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}

export default TopNav; // Exporting TopNav component
