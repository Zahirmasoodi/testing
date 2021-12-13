import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import member from "../assets/member.png";
import guest from "../assets/guest.png";
import manual from "../assets/manual.png";

const Choose = (props) => {
  useEffect(() => {
    if (localStorage.getItem("lang") == "ar") {
      document.dir = "rtl";
      setDirection("rtl");
      // alert(`Arabic ${localStorage.getItem("lang")}`);
    } else {
      document.dir = "ltr";
      setDirection("ltr");
      localStorage.setItem("lang", "en");
      // alert(`English ${localStorage.getItem("lang")}`);
    }
  }, [localStorage.getItem("lang")]);

  const [direction, setDirection] = useState();

  const handleClick = (path) => props.history.push(path);

  return (
    <Container
      style={styles.formUserContainer}
      className={document.dir == "ltr" ? "text-left" : "text-right"}
      dir={direction}
    >
      <Row style={styles.imgContainer}>
        <Col>
          <img
            style={styles.image}
            src={guest}
            alt="iicra guest"
            onClick={() => handleClick("/arbitration")}
          />
          <br />
          <Button
            onClick={() => handleClick("/arbitration")}
            className="mt-3 mb-2"
            color="success"
          >
            {direction == "ltr" ? "Guest" : "مہمان"}
          </Button>
        </Col>
        <Col>
          <img
            style={styles.image}
            src={member}
            alt="iicra member"
            onClick={() => handleClick("/memberLogin")}
          />
          <br />
          <Button
            onClick={() => handleClick("/memberLogin")}
            className="mt-3  mb-2"
            color="success"
          >
            {direction == "ltr" ? "Member" : "رکن"}
          </Button>
        </Col>
        <Col>
          <img
            style={styles.image}
            src={manual}
            alt="iicra manual"
            onClick={() => handleClick("/manual")}
          />
          <br />
          <Button
            onClick={() => handleClick("/manual")}
            className="mt-3 mb-2"
            color="success"
          >
            {direction == "ltr" ? "Manual" : "كتيب"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  formUserContainer: {
    top: "15vh",
    position: "relative",
    // top: "50%",
    // left: "50%",
    // mozTransform: "translateX(-50%) translateY(-50%)",
    // webkitTransform: "translateX(-50%) translateY(-50%)",
    // transform: "textDecorationThickness",
  },
  image: {
    height: "300px",
    cursor: "pointer",
    borderRadius: "10px",
  },
  imgContainer: {
    textAlign: "center",
  },
};

export default Choose;
