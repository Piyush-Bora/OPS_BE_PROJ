import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import screenfull from "screenfull";

const ExamComponent = () => {
  const [warning, setWarning] = useState(!screenfull.isFullscreen);

  useEffect(() => {
    const els = document.querySelectorAll(".disable-text-selection");
    els.forEach((e) => {
      //   .disable-text-selection{
      //     -moz-user-select:none; /* firefox */
      //     -webkit-user-select: none; /* Safari */
      //     -ms-user-select: none; /* IE*/
      //     user-select: none; /* Standard syntax */
      //  }
      e.style.mozUserSelect = "none";
      e.style.webkitUserSelect = "none";
      e.style.msUserSelect = "none";
      e.style.userSelect = "none";
    });

    const exitHandler = () => {
      if (!screenfull.isFullscreen) {
        alert(
          "You have exited full-screen mode. Please switch back to full-screen mode."
        );
      }
    };
    document.addEventListener("fullscreenchange", exitHandler);
    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
    };
  }, []);

  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        className="disable-text-selection"
        paragraph={true}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed
        fugiat distinctio, magnam repudiandae, omnis asperiores debitis nesciunt
        necessitatibus in autem delectus! Iusto doloribus molestiae sunt maiores
        eum explicabo veniam at quasi adipisci laboriosam mollitia, velit amet
        necessitatibus eius blanditiis, magni, aut aliquid facere deleniti
        voluptatum! Aperiam, minima pariatur! Totam fugit quas exercitationem ea
        deleniti inventore cupiditate? Facere voluptatem accusamus
        exercitationem ex recusandae reprehenderit ipsam laboriosam nostrum
        asperiores eum iste molestiae totam eius dolorum praesentium, voluptatum
        tempora pariatur, id dolor possimus et quibusdam. Cupiditate natus
        officiis commodi animi? Possimus neque eum beatae vel quos quam
        reprehenderit, tenetur ipsum nihil necessitatibus!
      </Typography>
    </Container>
  );
};

export default ExamComponent;
