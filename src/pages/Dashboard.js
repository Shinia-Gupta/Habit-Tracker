import React from "react"; // Importing React library
import TopNav from "../components/TopNav"; // Importing TopNav component
import SideNav from "../components/SideNav"; // Importing SideNav component
import {
  Box,
  Container,
  Flex,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"; // Importing necessary components from Chakra UI
import SideDrawer from "../components/SideDrawer"; // Importing SideDrawer component

function Dashboard({ children, title }) {
  // Hooks
  const { isOpen, onClose, onOpen } = useDisclosure(); // useDisclosure hook
  const { toggleColorMode } = useColorMode(); // useColorMode hook
  const bgColor = useColorModeValue("brand.5", "brand.90"); // Background color
  const textColor = useColorModeValue("gray.600", "brand.5"); // Text color
  
  return (
    <Box>
      {/* Main container */}
      <Flex>
        {/* Side navigation (hidden on small screens) */}
        <Box
          display={{
            base: "none",
            lg: "flex",
          }}
        >
          <SideNav toggleColorMode={toggleColorMode} /> {/* SideNav component */}
        </Box>
        {/* Side drawer (visible on small screens) */}
        <SideDrawer
          isOpen={isOpen}
          onClose={onClose}
          toggleColorMode={toggleColorMode}
        />
        {/* Main content */}
        <Box flexGrow={1}>
          {/* Top navigation */}
          <TopNav
            title={title}
            onOpen={onOpen}
            toggleColorMode={toggleColorMode}
            bgColor={bgColor}
            textColor={textColor}
          />
          {/* Content container */}
          <Box px={4}>
            <Container mt={6} maxW="960px"> {/* Container for children components */}
              {children} {/* Render children components */}
            </Container>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard; // Exporting Dashboard component
