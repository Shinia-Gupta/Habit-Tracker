import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Text,
  Tag,
  Box,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import UpdateHabitDropdown from "./updateHabitDropdown";
import { useDispatch, useSelector } from "react-redux";
import { habitAction, habitSelector } from "../redux/habitReducer";
import { MdDelete } from "react-icons/md";

// Object mapping habit status to corresponding color
const statusColor = {
  pending: "purple",
  complete: "green",
  incomplete: "red",
};

/**
 * HabitTable component renders a table to display habits.
 * @param {string} filter - Filter for displaying habits.
 * @returns {JSX.Element} Table to display habits.
 */
function HabitTable({ filter }) {
  const { habits } = useSelector(habitSelector);
  const [expandedHabit, setExpandedHabit] = useState(null); // State to track expanded habit
  const dispatch = useDispatch();

  // Filter habits based on the provided filter
  const filteredHabits = habits.filter((habit) => {
    if (filter === "all") return true;
    return habit.todayStatus === filter;
  });

  // Function to handle deletion of a habit
  const handleDelete = (data) => {
    dispatch(habitAction.setDeleteConfirmation(data));
  };

  // Function to toggle the expansion of habit details
  const toggleExpand = (id) => {
    setExpandedHabit((prev) => (prev === id ? null : id)); // Toggle the state for the clicked habit
  };

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>NAME</Th>
            <Th>DESCRIPTION</Th>
            <Th>CREATED ON</Th>
            <Th>TODAY'S STATUS</Th>
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredHabits.length === 0 ? (
            <Tr>
              <Td colSpan="6" textAlign="center">
                No habits found
              </Td>
            </Tr>
          ) : (
            filteredHabits.map((data) => (
              <React.Fragment key={data.id}>
                <Tr>
                  <Td>{data.id}</Td>
                  <Td>{data.name}</Td>
                  <Td>{data.desc}</Td>
                  <Td>
                    <Stack>
                      <Text>{data.createdOn.day}</Text>
                      <Text
                        fontSize={"sm"}
                        fontWeight={"medium"}
                        color={"black.40"}
                      >
                        {data.createdOn.time}
                      </Text>
                    </Stack>
                  </Td>
                  <Td>
                    <Tag colorScheme={statusColor[data.todayStatus]}>
                      {data.todayStatus.toUpperCase()}
                    </Tag>
                  </Td>
                  <Td>
                    <IconButton
                      icon={
                        expandedHabit === data.id ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />
                      }
                      onClick={() => toggleExpand(data.id)}
                      aria-label="Toggle Details"
                      variant="ghost"
                      color="brand.60"
                    />
                    <IconButton
                      icon={<MdDelete />}
                      onClick={() => handleDelete(data)}
                      aria-label="Delete Details"
                      variant="ghost"
                      color="red"
                    />
                  </Td>
                </Tr>
                {expandedHabit === data.id && (
                  <Tr>
                    <Td colSpan={6}>
                      <Collapse
                        in={expandedHabit === data.id}
                       
                      >
                        <Box p={4} bg="gray.100">
                          <UpdateHabitDropdown data={data} />
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default HabitTable;
