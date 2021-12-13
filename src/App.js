import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavPanel from "./components/form/NavPanel";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserContext from "./context/UserContext";
import cover from "./assets/cover.jpg";
import routes from "./routes/public";
// import protectedRoutes from "./routes/private";
import protectedRoutes from "./routes/lazied";
import "./App.css";
import { Button } from "reactstrap";
import HashLoader from "react-spinners/HashLoader";
// import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const [direction, setDirection] = useState("ltr");
  // const language = useSelector((state) => state.language);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("lang") == "ar") {
      document.dir = "rtl";
      setDirection("rtl");
      // dispatch({ type: "ar" });
    } else {
      document.dir = "ltr";
      setDirection("ltr");
      // dispatch({ type: "en" });
      localStorage.setItem("lang", "en");
    }
  }, []);

  const handleClick = () => {
    //check Claimant Details Modal Language Toggler
    // if (document.dir == "ltr") {
    //   document.dir = "rtl";
    //   setDirection("rtl");
    //   localStorage.setItem("lang", "ar");
    // } else if (document.dir == "rtl") {
    //   document.dir = "ltr";
    //   setDirection("ltr");
    //   localStorage.setItem("lang", "en");
    // }

    if (localStorage.getItem("lang") == "en") {
      document.dir = "rtl";
      setDirection("rtl");
      localStorage.setItem("lang", "ar");
    } else if (localStorage.getItem("lang") == "ar") {
      document.dir = "ltr";
      setDirection("ltr");
      localStorage.setItem("lang", "en");
    } else {
      alert("Please Reload the Application");
    }

    // if (language == "en") {
    //   dispatch({ type: "ar" });
    //   document.dir = "rtl";
    //   // setDirection("rtl");
    //   localStorage.setItem("lang", "ar");
    // } else if (language == "ar") {
    //   dispatch({ type: "en" });
    //   document.dir = "ltr";
    //   // setDirection("ltr");
    //   localStorage.setItem("lang", "en");
    // }
  };

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    auth: undefined,
    email: undefined,
  });

  const globalBG = {
    backgroundImage: `url(${cover})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    // paddingBottom: "5vh",
    paddingTop: "8vh",
    minHeight: "100vh",
  };

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <div style={globalBG}>
        <NavPanel />
        <React.Suspense
          fallback={
            <section
              style={{
                minHeight: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HashLoader
                color="green"
                loading={true}
                // css={override}
                size={100}
              />
            </section>
          }
        >
          <Switch>
            {routes.map((route, index = 1) => {
              return (
                <Route
                  key={index + 1}
                  exact
                  path={route.path}
                  component={route.component}
                  direction={direction}
                />
              );
            })}
            {protectedRoutes.map((route, index = 1) => {
              return (
                <ProtectedRoute
                  key={index + 1}
                  exact
                  path={route.path}
                  component={route.component}
                  direction={direction}
                />
              );
            })}
          </Switch>
        </React.Suspense>
        <Button
          className="shadow-lg"
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: "2vh",
            right: "2vh",
            color: "white",
            backgroundColor: "#008F53",
            borderRadius: "50%",
          }}
          onClick={() => handleClick()}
        >
          {direction == "ltr" ? "Ar" : "En"}
        </Button>
      </div>
    </UserContext.Provider>
  );
};

export default App;
