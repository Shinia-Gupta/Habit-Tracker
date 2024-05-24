import {
  HStack, // Importing HStack component from Chakra UI
  Heading, // Importing Heading component from Chakra UI
  Select, // Importing Select component from Chakra UI
  VStack, // Importing VStack component from Chakra UI
  useColorModeValue, // Importing useColorModeValue hook from Chakra UI
} from "@chakra-ui/react"; // Importing necessary components from Chakra UI
import React from "react"; // Importing React library
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { habitAction, habitSelector } from "../redux/habitReducer"; // Importing habitAction and habitSelector from habitReducer
import { useToast } from "@chakra-ui/react"; // Importing useToast hook from Chakra UI

// Function to convert string to sentence case
const toSentenceCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Dropdown options
const options = [
  { value: "pending", text: "Pending" },
  { value: "complete", text: "Complete" },
  { value: "incomplete", text: "Incomplete" },
];

function UpdateHabitDropdown({ data }) {
  const { habits } = useSelector(habitSelector); // useSelector hook
  const habitToUpdate = habits.find((habit) => habit.id === data.id); // Finding habit to update
  const toast = useToast(); // useToast hook
  const dispatch = useDispatch(); // useDispatch hook

  // Function to handle status change
  const handleStatusChange = (id, dayIndex, value) => {
    const todayDate = new Date().toISOString().split("T")[0]; // Today's date
    // Dispatching action to update habit status
    dispatch(habitAction.updateHabit({ id, dayIndex, value, todayDate }));
    // Toast notification
    toast({
      title: "Habit Status Updated",
      description: "",
      status: "info",
      duration: 5000,
      position: "top-right",
      isClosable: true,
    });
  };

  const bgColor = useColorModeValue("brand.5", "brand.40"); // Background color
  const textColor = useColorModeValue("brand.80", "brand.5"); // Text color

  return (
    <>
      {data.id === habitToUpdate.id && ( // Conditional rendering based on habit ID
        <HStack key={data.id} spacing={4} w="100%" bg={bgColor} p={2}>
          {/* Looping through days */}
          {data.days.map((day, dayIndex) => (
            <VStack key={`${data.id}-${dayIndex}`} spacing={2} align="center">
              {/* Day */}
              <Heading fontSize="md" color={textColor}>
                {day.day}
              </Heading>
              {/* Date */}
              <Heading fontSize="md" color={textColor}>
                {day.date}
              </Heading>
              {/* Dropdown for status */}
              <Select
                size="sm"
                variant="outline"
                placeholder={toSentenceCase(day.currentStatus)}
                color={textColor}
                onChange={(e) =>
                  handleStatusChange(data.id, dayIndex, e.target.value)
                }
              >
                {/* Mapping options */}
                {options.map(
                  (option) =>
                    day.currentStatus !== option.value && (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    )
                )}
              </Select>
            </VStack>
          ))}
        </HStack>
      )}
    </>
  );
}

export default UpdateHabitDropdown; // Exporting UpdateHabitDropdown component
