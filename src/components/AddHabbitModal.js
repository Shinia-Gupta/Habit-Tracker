import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { habitAction, habitSelector } from "../redux/habitReducer";
import { createPortal } from "react-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

// Yup validation schema
const habitSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!Min Length - 3 characters")
    .max(30, "Too Long!Max Length - 30 characters")
    .required("Habit name is required!"),
  desc: Yup.string()
    .min(10, "Too Short!Min Length - 10 characters")
    .max(50, "Too Long!Max Length - 50 characters")
    .required("Habit description is required!"),
});

/**
 * AddHabitModal component renders a modal for adding a new habit.
 * It allows users to input habit name and description, validates the input,
 * and dispatches an action to add the habit when submitted.
 */
function AddHabitModal() {
  const { showAddForm, habits } = useSelector(habitSelector);
  const toast = useToast();
  const dispatch = useDispatch();

  /**
   * Function to generate an array of weekdays with initial status as 'pending'
   * @returns {Array} Array of weekdays with initial status
   */
  const getWeekDays = () => {
    // Array of weekdays
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const result = [];
    const today = new Date();

    // Loop through 7 days to get each weekday
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      result.push({
        day: daysOfWeek[day.getDay()],
        date: day.toISOString().split("T")[0], // format date as YYYY-MM-DD
        currentStatus: "pending",
      });
    }
    return result;
  };

  /**
   * Function to format time in AM/PM format
   * @param {Date} date - Date object
   * @returns {String} Formatted time in HH:MM AM/PM format
   */
  const formatTimeAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  /**
   * Function to handle modal close event
   */
  const handleClose = () => {
    dispatch(habitAction.setShowAddForm());
  };

  return createPortal(
    <>
      {showAddForm && (
        <Modal isOpen={showAddForm} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a habit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ name: "", desc: "" }}
                validationSchema={habitSchema}
                onSubmit={(values, actions) => {
                  // Get current date and time
                  const now = new Date();
                  const data = {
                    id:
                      (habits.length + 1) *
                      Math.floor(Math.random(0, 100) * 10),
                    name: values.name,
                    desc: values.desc,
                    createdOn: {
                      day: now.toISOString().split("T")[0], // format date as YYYY-MM-DD
                      time: formatTimeAMPM(now), // format time as HH:MM AM/PM
                    },
                    todayStatus: "pending",
                    days: getWeekDays(),
                  };
                  dispatch(habitAction.addHabit(data));
                  dispatch(habitAction.setShowAddForm());
                  toast({
                    position: "top-right",
                    render: () => (
                      <Box color="white" p={3} bg="brand.40">
                        Habit Added!
                      </Box>
                    ),
                  });
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} placeholder="Habit name" />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="desc">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.desc && form.touched.desc}
                        >
                          <FormLabel>Description</FormLabel>
                          <Input {...field} placeholder="Habit description" />
                          <FormErrorMessage>
                            {form.errors.desc}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      bgColor="brand.40"
                      color={"brand.5"}
                      _hover={{
                        bg: "yellowgreen",
                      }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>,
    document.getElementById("modal-root")
  );
}

export default AddHabitModal;
