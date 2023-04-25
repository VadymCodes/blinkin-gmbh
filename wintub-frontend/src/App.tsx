import React from "react";
import {
  LinkProps as RouterLinkProps,
  Link as RouterLink,
} from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { LinkProps } from "@mui/material/Link";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import LoginModal from "./components/LoginModal";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const [isUser, setIsUser] = React.useState(() => {
    const data = localStorage.getItem("user");
    if (!data) return false;
    return true;
  });
  console.log(isUser);

  const LinkBehavior = React.forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
  >((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

  const theme = responsiveFontSizes(darkTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route
          path="/"
          element={
            !isUser ? (
              <LoginModal setIsUser={setIsUser} />
            ) : (
              <Dashboard setOpenUser={setIsUser} />
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
