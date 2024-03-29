// import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import screenfull from "screenfull";

const ExamComponent = () => {
  const [warning, setWarning] = useState(!screenfull.isFullscreen);

  const [isTabFocused, setIsTabFocused] = useState(true);

  // useEffect(() => {
  //   const handleTabBlur = () => {
  //     setIsTabFocused(false);
  //     alert("Please focus on the exam tab.");
  //     screenfull.request();
  //     setIsTabFocused(true);
  //   };

  //   const handleTabFocus = () => {
  //     setIsTabFocused(true);
  //     screenfull.request();
  //     setIsTabFocused(true);
  //   };

  //   window.addEventListener("blur", handleTabBlur);
  //   window.addEventListener("focus", handleTabFocus);

  //   return () => {
  //     window.removeEventListener("blur", handleTabBlur);
  //     window.removeEventListener("focus", handleTabFocus);
  //   };
  // }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".disable-text-selection");
    els.forEach((e) => {
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        className='disable-text-selection'
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
      </p>
    </div>
  );
};

export default ExamComponent;
