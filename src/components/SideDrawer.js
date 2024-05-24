import React from "react";
import {
  Drawer, // Importing Drawer component from Chakra UI
  DrawerBody, // Importing DrawerBody component from Chakra UI
  DrawerOverlay, // Importing DrawerOverlay component from Chakra UI
  DrawerContent, // Importing DrawerContent component from Chakra UI
  DrawerCloseButton, // Importing DrawerCloseButton component from Chakra UI
 } from "@chakra-ui/react"; // Importing necessary components from Chakra UI
import SideNav from "./SideNav"; // Importing SideNav component from local file

function SideDrawer({ isOpen, onClose, toggleColorMode }) {
  return (
    <>
      {/* Drawer component for side navigation */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay /> {/* Overlay to prevent interaction with other elements */}
        <DrawerContent>
          <DrawerCloseButton /> {/* Button to close the drawer */}
          
          {/* Body of the drawer containing the side navigation */}
          <DrawerBody>
            <SideNav /> {/* Side navigation component */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
