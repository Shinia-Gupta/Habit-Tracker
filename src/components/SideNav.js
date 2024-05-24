import {
  Box, // Box component from Chakra UI
  HStack, // HStack component from Chakra UI
  Heading, // Heading component from Chakra UI
  Icon, // Icon component from Chakra UI
  Image, // Image component from Chakra UI
  Stack, // Stack component from Chakra UI
  Text, // Text component from Chakra UI
} from "@chakra-ui/react"; // Importing necessary components from Chakra UI
import React from "react"; // Importing React library
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import { FaHome } from "react-icons/fa"; // Importing FaHome icon from react-icons/fa
import { GrTasks } from "react-icons/gr"; // Importing GrTasks icon from react-icons/gr

function SideNav({ bgColor, textColor }) {
  // Array containing navigation links
  const navLinks = [
    {
      icon: FaHome, // Home icon
      text: "Home", // Text for Home link
      link: "/", // Link to Home page
    },
    {
      icon: GrTasks, // Tasks icon
      text: "Your Habits", // Text for Habits link
      link: "/habits", // Link to Habits page
    },
  ];

  return (
    <Stack
      boxShadow={{ // Box shadow based on screen size
        base: "none",
        lg: "lg",
      }}
      w={{ // Width based on screen size
        base: "full",
        lg: "16rem",
      }}
      justifyContent={"space-between"} // Space between elements in the stack
      h="100vh" // Full height of the viewport
      bg={bgColor} // Background color
      zIndex={1} // Z-index to control stacking order
    >
      <Box>
        <HStack pt={4} px={2}> {/* Horizontal stack for logo and title */}
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpVpAxrSB7pRUKY6RGX_sWzZM1gs2YXZ1KCxcz2lB81g&s" // Logo image source
            h={7} // Height of the image
            w={7} // Width of the image
          />
          <Heading
            fontSize={"20px"} // Font size of the heading
            as={"h1"} // Heading tag
            textAlign={"center"} // Text alignment
            color={textColor} // Text color
          >
            Habit Tracker {/* Title */}
          </Heading>
        </HStack>

        <Box mt="6" mx="3"> {/* Box for navigation links */}
          {navLinks.map((navitem) => (
            <Link to={navitem.link} key={navitem.text}> {/* Link component */}
              <HStack
                key={navitem.text} // Unique key for each navigation item
                py="3" // Padding on y-axis
                px={"4"} // Padding on x-axis
                borderRadius={"10px"} // Border radius
                _hover={{ // Styling on hover
                  bg: "brand.6", // Background color on hover
                  color: "brand.40", // Text color on hover
                }}
                color={"#797E82"} // Text color
              >
                <Icon as={navitem.icon} /> {/* Icon component */}
                <Text fontSize={"14px"} fontWeight={"large"}> {/* Text component */}
                  {navitem.text} {/* Text for navigation link */}
                </Text>
              </HStack>
            </Link>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default SideNav; // Exporting SideNav component
