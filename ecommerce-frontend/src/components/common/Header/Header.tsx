import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
import { changeLanguage } from "@store/translate/translateSlice";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
} from "react-bootstrap";
import styles from "./styles.module.css";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const { headerContainer, headerLogo } = styles;

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const { language, direction, EnLang } = useAppSelector(
    (state) => state.translate
  );
  const { t, i18n } = useTranslation("global");
  const isDark = useAppSelector((state) => state.theme.isDark);

  const handleLanguageToggle = () => {
    const newLang = language === "ar" ? "en" : "ar";
    dispatch(changeLanguage({ lang: newLang }));
  };

  useEffect(() => {
    // Set HTML attributes on app load from Redux state
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", direction);
    // Sync i18n with Redux state
    i18n.changeLanguage(language);
  }, [language, direction, i18n]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);
  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>{t("header.our")}</span>{" "}
          <Badge bg="info">{t("header.ecommerce")}</Badge>
        </h1>
        <HeaderLeftBar />
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`${EnLang ? "me-auto" : "ms-auto"}`}>
              <Nav.Link as={NavLink} to="/">
                {t("navbar.home")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                {t("navbar.categories")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="allProducts">
                {t("navbar.all-products")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                {t("navbar.about")}
              </Nav.Link>
            </Nav>
            <Nav className={`${EnLang ? "ms-auto" : "me-auto"}`}>
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    {t("registeration.login")}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    {t("registeration.register")}
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={`${t("navbar.welcome")} ${user?.firstName} ${
                    user?.lastName
                  }`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="profile" end>
                    {t("navbar.navdropdown.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="profile/orders">
                    {t("navbar.navdropdown.orders")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/"
                    onClick={() => dispatch(authLogout())}
                  >
                    {t("registeration.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <DarkModeToggle />
              <Button
                style={{ width: "fit-content" }}
                variant="outline-secondary"
                size="sm"
                onClick={handleLanguageToggle}
                aria-label={EnLang ? "Switch to Arabic" : "Switch to English"}
              >
                {EnLang ? "عربي" : "English"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
