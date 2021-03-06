import HeaderWrapper, {
  Logo,
  MenuWrapper,
  NavSearchButton,
  NavSearchFromWrapper,
  NavSearchWrapper,
  NavbarWrapper,
  SearchCloseButton,
} from "./navbar.style";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import React, { useState } from "react";

import { DrawerProvider } from "../drawer/drawer-context";
import { Link } from "gatsby";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import SearchContainer from "../../containers/search/search";

type NavbarProps = {
  className?: string;
};

const MenuItems = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },
  {
    label: "Contact",
    url: "/contact",
  },
];

const Navbar: React.FunctionComponent<NavbarProps> = ({
  className,
  ...props
}) => {
  const [state, setState] = useState({
    toggle: false,
    search: "",
  });

  const toggleHandle = () => {
    setState({
      ...state,
      toggle: !state.toggle,
    });
  };

  // Add all classs to an array
  const addAllClasses = ["header"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <HeaderWrapper className={addAllClasses.join(" ")} {...props}>
      <NavbarWrapper className="navbar">
        <DrawerProvider>
          <MobileMenu items={MenuItems} />
        </DrawerProvider>
        <Logo>
          <Link to="/">
            <p style={{ fontSize: "20px", margin: 0 }}>&#128187;</p>
            {/* <img src={LogoImage} alt="logo" /> */}
          </Link>
        </Logo>
        <MenuWrapper>
          <Menu items={MenuItems} />
        </MenuWrapper>
        <NavSearchButton
          type="button"
          aria-label="search"
          onClick={toggleHandle}
        >
          <IoIosSearch size="23px" />
        </NavSearchButton>
      </NavbarWrapper>

      <NavSearchWrapper className={state.toggle === true ? "expand" : ""}>
        <NavSearchFromWrapper>
          <SearchContainer />
          <SearchCloseButton
            type="submit"
            aria-label="close"
            onClick={toggleHandle}
          >
            <IoIosClose />
          </SearchCloseButton>
        </NavSearchFromWrapper>
      </NavSearchWrapper>
    </HeaderWrapper>
  );
};

export default Navbar;
