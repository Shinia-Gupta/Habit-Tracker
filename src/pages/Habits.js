import React, { useEffect } from "react"; // Importing React library and useEffect hook
import Dashboard from "./Dashboard"; // Importing Dashboard component
import {
  Card, // Card component from Chakra UI
  Flex, // Flex component from Chakra UI
  Tab, // Tab component from Chakra UI
  TabIndicator, // TabIndicator component from Chakra UI
  TabList, // TabList component from Chakra UI
  TabPanel, // TabPanel component from Chakra UI
  TabPanels, // TabPanels component from Chakra UI
  Tabs, // Tabs component from Chakra UI
  Tag, // Tag component from Chakra UI
} from "@chakra-ui/react"; // Importing necessary components from Chakra UI
import HabitTable from "../components/HabitTable"; // Importing HabitTable component
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { habitAction, habitSelector } from "../redux/habitReducer"; // Importing habitAction and habitSelector from habitReducer

function Habits() {
  const { habits, pendingHabits, completedHabits, incompleteHabits } = useSelector(habitSelector); // useSelector hook
  const dispatch = useDispatch(); // useDispatch hook

  // Tabs for different habit statuses
  const tabs = [
    { name: "All", count: habits.length },
    { name: "Pending", count: pendingHabits },
    { name: "Completed", count: completedHabits },
    { name: "In-complete", count: incompleteHabits },
  ];

  // Function to update today's status for habits
  const updateTodayStatus = () => {
    const today = new Date(); // Current date
    const currentDay = today.toLocaleDateString("en-US", { weekday: "long" }); // Current day
    const currentDate = today.toISOString().split("T")[0]; // Current date in ISO format

    // Iterating through habits
    habits.forEach((habit) => {
      const match = habit.days.find(
        (day) => day.day === currentDay && day.date === currentDate
      );
      if (match) {
        // If match found, update today's status
        dispatch(
          habitAction.updateHabitTodayStatus({
            id: habit.id,
            todayStatus: match.currentStatus,
          })
        );
      } else {
        // If no match found, set today's status to "pending"
        dispatch(
          habitAction.updateHabitTodayStatus({
            id: habit.id,
            todayStatus: "pending",
          })
        );
      }
    });
  };

  // useEffect to initialize habits from localStorage and update today's status on component mount
  useEffect(() => {
    const habitsArr = JSON.parse(localStorage.getItem("habits") || "[]");
    dispatch(habitAction.setHabits(habitsArr));
    updateTodayStatus();
  }, []);

  // useEffect to update habit counts whenever habits array changes
  useEffect(() => {
    dispatch(habitAction.updateCount());
  }, [habits]);

  return (
    <Dashboard title={"Your Habits"}>
      <Flex justify={"end"} mt={6} mb={3}> {/* Flex container for additional controls */}
      </Flex>
      {/* Card containing the tabs */}
      <Card>
        <Tabs position="relative" variant="unstyled">
          {/* Tab list */}
          <TabList py={4}>
            {tabs.map((t, index) => (
              <Tab display={"flex"} gap={2} key={index}> {/* Individual tab */}
                {t.name} {/* Tab name */}
                <Tag colorScheme="gray" borderRadius={"full"}>{t.count}</Tag> {/* Tag indicating count */}
              </Tab>
            ))}
          </TabList>
          {/* Tab indicator */}
          <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
          {/* Tab panels */}
          <TabPanels>
            <TabPanel>
              <HabitTable filter={"all"} /> {/* Habit table for all habits */}
            </TabPanel>
            <TabPanel>
              <HabitTable filter={"pending"} /> {/* Habit table for pending habits */}
            </TabPanel>
            <TabPanel>
              <HabitTable filter={"complete"} /> {/* Habit table for completed habits */}
            </TabPanel>
            <TabPanel>
              <HabitTable filter={"incomplete"} /> {/* Habit table for incomplete habits */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Dashboard>
  );
}

export default Habits; // Exporting Habits component
