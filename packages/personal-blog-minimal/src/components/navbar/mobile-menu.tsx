import {
  DrawerClose,
  DrawerContentWrapper,
  DrawerHead,
  DrawerLogo,
  HamburgerIcon,
  MobileMenuWrapper,
} from "./navbar.style";
import React, { useContext } from "react";

import Drawer from "../drawer/drawer";
import { DrawerContext } from "../drawer/drawer-context";
import { FiX } from "react-icons/fi";
import { Link } from "gatsby";
import Menu from "./menu";

type MobileMenuProps = {
  items: any;
  logo?: string;
};

const MobileMenu: React.FunctionComponent<MobileMenuProps> = ({
  items,
  logo,
  ...props
}) => {
  const { state, dispatch }: any = useContext(DrawerContext);

  // Toggle drawer
  const toggleDrawer = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <MobileMenuWrapper {...props}>
      <Drawer
        width="285px"
        placement="left"
        drawerHandler={
          <HamburgerIcon>
            <span />
            <span />
            <span />
          </HamburgerIcon>
        }
        open={state.isOpen}
        toggleHandler={toggleDrawer}
      >
        <DrawerContentWrapper>
          <DrawerHead>
            <DrawerLogo>
              <Link to="/">
                <p style={{ fontSize: "20px", margin: 0 }}>&#128187;</p>
                {/* <img src={logo} alt="logo" /> */}
              </Link>
            </DrawerLogo>
            <DrawerClose onClick={toggleDrawer}>
              <FiX />
            </DrawerClose>
          </DrawerHead>
          <Menu items={items} className="mobile-menu" />
        </DrawerContentWrapper>
      </Drawer>
    </MobileMenuWrapper>
  );
};

export default MobileMenu;
