import React, { useEffect, useState } from "react"; // Importing React library, useEffect, and useState hooks
import QuoteSection from "../components/quoteSection"; // Importing QuoteSection component
import Dashboard from "./Dashboard"; // Importing Dashboard component
import { Grid, GridItem } from "@chakra-ui/react"; // Importing Grid and GridItem components from Chakra UI
import CustomCard from "../components/CustomCard"; // Importing CustomCard component
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { habitAction, habitSelector } from "../redux/habitReducer"; // Importing habitAction and habitSelector from habitReducer
import { dashSelector, fetchAQuote } from "../redux/dashboardReducer"; // Importing dashSelector and fetchAQuote from dashboardReducer

function Home() {
  // Selecting relevant state values from redux store
  const { pendingHabits, completedHabits, habits, incompleteHabits } = useSelector(habitSelector);
  const [quoteBg, setQuoteBg] = useState("brand.40"); // State for quote background color
  const { quote } = useSelector(dashSelector); // Selecting quote from redux store
  const dispatch = useDispatch(); // useDispatch hook

  // Function to generate random hex color
  const getRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setQuoteBg(color); // Setting quote background color
  };

  // useEffect to initialize habits and fetch a quote on component mount
  useEffect(() => {
    const habitsArr = JSON.parse(localStorage.getItem("habits") || "[]");
    dispatch(habitAction.setHabits(habitsArr)); // Dispatching action to set habits
    getRandomHexColor(); // Generating random hex color for quote background
    dispatch(fetchAQuote()); // Fetching a quote
  }, []);

  return (
    <>
      {/* Dashboard component */}
      <Dashboard title={"Dashboard"}>
        {/* Grid layout */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Quote section */}
          <GridItem colSpan={2}>
            <QuoteSection quoteBg={quoteBg} quote={quote} />
          </GridItem>
          {/* Custom cards for different task categories */}
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <CustomCard
              title={"All"}
              desc={"All tasks for today"}
              count={habits.length}
              imgUrl={"Assets/white bg.jpg"}
              isInverted={false}
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <CustomCard
              title={"Incomplete"}
              desc={"Your incomplete tasks for today"}
              count={incompleteHabits}
              imgUrl={"Assets/green bg.avif"}
              isInverted={true}
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <CustomCard
              title={"Pending"}
              desc={"Your pending tasks for today"}
              count={pendingHabits}
              imgUrl={"Assets/greenbg2.jpg"}
              isInverted={true}
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <CustomCard
              title={"Completed"}
              desc={"Your completed tasks for today"}
              count={completedHabits}
              imgUrl={"Assets/greenbg2.jpg"}
              isInverted={true}
            />
          </GridItem>
        </Grid>
      </Dashboard>
    </>
  );
}

export default Home; // Exporting Home component
