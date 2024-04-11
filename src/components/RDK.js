import React, { useEffect, useRef, useState } from "react";
import {
  findCorrectIncorrect,
  checkDirection,
  radianToDegree,
} from "../utils/calculations";

export const RDK = ({ coherence, trialTime, submitData, change }) => {
  const [initialDirection, setInitialAngle] = useState();
  const [finalDirection, setFinalDirection] = useState();
  const [angleChange, setAngleChange] = useState();
  const [showRDK, setShowRDK] = useState(true);

  const canvasStyle = {
    borderRadius: "50%",
    border: "2px solid rgba(31,41,55, 1)",
    overflow: "hidden",
    backgroundColor: "white",
  };
  const rdkCanvasRef = useRef();
  const responseCanvasRef = useRef();

  // function to give delay
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const startRDK = () => {
    const canvas = rdkCanvasRef.current;
    const context = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw a plus sign at the center
    const size = 20; // Size of the plus sign
    context.beginPath();
    context.moveTo(centerX - size / 2, centerY);
    context.lineTo(centerX + size / 2, centerY);
    context.moveTo(centerX, centerY - size / 2);
    context.lineTo(centerX, centerY + size / 2);
    context.strokeStyle = "rgba(31,41,55, 1)";
    context.stroke();

    var numDots = 800;
    var dotSize = 2;
    var dotSpeed = 1.2;
    var sameDirectionAngle = Math.random() * Math.PI * 2;
    setInitialAngle(radianToDegree(sameDirectionAngle));
    // Array to store dot positions and directions
    var dots = [];

    let countOfSameDirectionDots = parseInt((coherence / 100) * numDots);

    var j = 0;
    // Same Direction points
    for (j; j < countOfSameDirectionDots; j++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        direction: sameDirectionAngle,
      });
    }
    // Random Direction points
    for (var i = j; i < numDots; i++) {
      var direction = Math.random() * Math.PI * 2;
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        direction: direction,
      });
    }

    const drawDot = (x, y) => {
      context.beginPath();
      context.arc(x, y, dotSize, 0, Math.PI * 2);
      context.fillStyle = "rgba(31,41,55, 1)";
      context.fill();
      context.closePath();
    };
    var frameId;
    const update = () => {
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Move dots
      dots.forEach((dot) => {
        dot.x += Math.cos(dot.direction) * dotSpeed;
        dot.y += Math.sin(dot.direction) * dotSpeed;

        // Wrap around canvas edges
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        drawDot(dot.x, dot.y);
      });

      frameId = requestAnimationFrame(update);
    };

    const changeDirection = () => {
      let sign = Math.random() < 0.5 ? -1 : 1;
      let changeInAngle = sign * (Math.PI / 2);
      let newDirection = sameDirectionAngle + changeInAngle;
      //   dots.forEach(function (dot) {
      //     dot.direction = dot.direction + changeInAngle;
      //   });
      if (newDirection < 0) {
        newDirection += 2 * Math.PI;
      } else {
        newDirection = newDirection % (2 * Math.PI);
      }
      for (let k = 0; k < countOfSameDirectionDots; k++) {
        let dot = dots[k];
        let newDot = {
          ...dot,
          direction: newDirection,
        };
        dots[k] = newDot;
      }
      setAngleChange(radianToDegree(changeInAngle));
      setFinalDirection(radianToDegree(newDirection));
    };
    let timeout3 = setTimeout(update, 500);

    if (change) {
      var timeout1 = setTimeout(changeDirection, 500 + trialTime / 2);
    } else {
      setAngleChange(radianToDegree(0));
      setFinalDirection(radianToDegree(sameDirectionAngle));
    }
    let timeout2 = setTimeout(() => {
      setShowRDK(false);
    }, 500 + trialTime);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  };

  useEffect(() => {
    return startRDK();
  }, []);

  useEffect(() => {
    if (!showRDK) {
      const resCanvas = responseCanvasRef.current;
      const resContext = resCanvas.getContext("2d");

      const drawCross = () => {
        // Calculate the center coordinates of the canvas
        const centerX = resCanvas.width / 2;
        const centerY = resCanvas.height / 2;

        // Draw a plus sign at the center
        const size = 20; // Size of the plus sign
        resContext.beginPath();
        resContext.moveTo(centerX - size / 2, centerY);
        resContext.lineTo(centerX + size / 2, centerY);
        resContext.moveTo(centerX, centerY - size / 2);
        resContext.lineTo(centerX, centerY + size / 2);
        resContext.strokeStyle = "rgba(31,41,55, 1)";
        resContext.stroke();
      };
      drawCross();

      let startTime = Date.now();
      let timeout4 = setTimeout(() => {
        submitData(null);
      }, 3000);

      // // Arrow properties
      // const arrow = {
      //   startX: resCanvas.width / 2,
      //   startY: resCanvas.height / 2,
      //   endX: resCanvas.width / 2 + 50,
      //   endY: resCanvas.height / 2,
      //   color: "rgba(31,41,55, 1)",
      //   isDragging: false,
      //   isElongating: false,
      // };

      // // Function to draw the arrow
      // function drawArrow() {
      //   resContext.clearRect(0, 0, resCanvas.width, resCanvas.height);
      //   resContext.strokeStyle = arrow.color;
      //   resContext.lineWidth = 3;
      //   resContext.lineCap = "round";
      //   resContext.beginPath();
      //   resContext.moveTo(arrow.startX, arrow.startY);
      //   resContext.lineTo(arrow.endX, arrow.endY);
      //   resContext.stroke();
      //   const angle = Math.atan2(
      //     arrow.endY - arrow.startY,
      //     arrow.endX - arrow.startX
      //   );
      //   resContext.save();
      //   resContext.translate(arrow.endX, arrow.endY);
      //   resContext.rotate(angle);
      //   resContext.beginPath();
      //   resContext.moveTo(0, 0);
      //   resContext.lineTo(-10, -5);
      //   resContext.lineTo(-10, 5);
      //   resContext.closePath();
      //   resContext.fillStyle = arrow.color;
      //   resContext.fill();
      //   resContext.restore();
      // }

      // // Function to handle mouse/touch down event
      // function handleDown(event) {
      //   event.preventDefault();
      //   const touch = event.type === "mousedown" ? event : event.touches[0];
      //   const mouseX = touch.clientX - resCanvas.getBoundingClientRect().left;
      //   const mouseY = touch.clientY - resCanvas.getBoundingClientRect().top;
      //   const distance = Math.sqrt(
      //     Math.pow(mouseX - arrow.endX, 2) + Math.pow(mouseY - arrow.endY, 2)
      //   );
      //   if (distance <= 10) {
      //     arrow.isDragging = true;
      //     resCanvas.addEventListener("mousemove", handleMove);
      //     resCanvas.addEventListener("touchmove", handleMove);
      //     resCanvas.addEventListener("mouseup", handleUp);
      //     resCanvas.addEventListener("touchend", handleUp);
      //     resCanvas.addEventListener("mouseout", handleUp);
      //     resCanvas.addEventListener("touchcancel", handleUp);
      //   } else if (
      //     distance >= arrow.endX - arrow.startX - 10 &&
      //     distance <= arrow.endX - arrow.startX + 10
      //   ) {
      //     arrow.isElongating = true;
      //     resCanvas.addEventListener("mousemove", handleMove);
      //     resCanvas.addEventListener("touchmove", handleMove);
      //     resCanvas.addEventListener("mouseup", handleUp);
      //     resCanvas.addEventListener("touchend", handleUp);
      //     resCanvas.addEventListener("mouseout", handleUp);
      //     resCanvas.addEventListener("touchcancel", handleUp);
      //   }
      // }

      // // Function to handle mouse/touch move event
      // function handleMove(event) {
      //   event.preventDefault();
      //   const touch = event.type === "mousemove" ? event : event.touches[0];
      //   const mouseX = touch.clientX - resCanvas.getBoundingClientRect().left;
      //   const mouseY = touch.clientY - resCanvas.getBoundingClientRect().top;
      //   if (arrow.isDragging) {
      //     arrow.endX = mouseX;
      //     arrow.endY = mouseY;
      //   } else if (arrow.isElongating) {
      //     const angle = Math.atan2(
      //       arrow.startY - mouseY,
      //       arrow.startX - mouseX
      //     );
      //     arrow.endX = arrow.startX + Math.cos(angle) * arrow.length;
      //     arrow.endY = arrow.startY + Math.sin(angle) * arrow.length;
      //   }
      //   drawArrow();
      // }

      // // Function to handle mouse/touch up event
      // function handleUp(event) {
      //   event.preventDefault();
      //   arrow.isDragging = false;
      //   arrow.isElongating = false;
      //   resCanvas.removeEventListener("mousemove", handleMove);
      //   resCanvas.removeEventListener("touchmove", handleMove);
      //   resCanvas.removeEventListener("mouseup", handleUp);
      //   resCanvas.removeEventListener("touchend", handleUp);
      //   resCanvas.removeEventListener("mouseout", handleUp);
      //   resCanvas.removeEventListener("touchcancel", handleUp);
      //   // Calculate angle
      //   const reportedDirection = radianToDegree(
      //     2 * Math.PI +
      //       Math.atan2(arrow.endY - arrow.startY, arrow.endX - arrow.startX)
      //   );
      //   let endTime = Date.now();
      //   submitData({
      //     coherence: coherence,
      //     initialDirection,
      //     finalDirection,
      //     reportedDirection,
      //     angleChange,
      //     directionType: checkDirection(finalDirection, reportedDirection)
      //       ? "Final Direction"
      //       : checkDirection(initialDirection, reportedDirection)
      //       ? "Initial Direction"
      //       : "Random Direction",
      //     responseTime: endTime - startTime,
      //   });
      // }

      // // Add event listeners for mouse/touch events
      // resCanvas.addEventListener("mousedown", handleDown);
      // resCanvas.addEventListener("touchstart", handleDown);

      // // Initial drawing of the arrow
      // drawArrow();

      // return () => {
      //   clearTimeout(timeout4);
      // };

      var drawing = false;
      function startDrawing(e) {
        if (!drawing) {
          drawing = true;
          const { offsetX, offsetY } = e;
          resContext.beginPath();
          resContext.moveTo(offsetX, offsetY);
        }
      }

      function draw(e) {
        if (drawing) {
          const { offsetX, offsetY } = e;
          resContext.lineTo(offsetX, offsetY);
          resContext.stroke();
        }
      }

      function stopDrawing(e) {
        if (drawing) {
          const { offsetX, offsetY } = e;
          const centerX = 200;
          const centerY = 200;
          const xRelativeToCenter = offsetX - centerX;
          const yRelativeToCenter = offsetY - centerY;

          resContext.closePath();
          drawing = false;
          const reportedDirection = radianToDegree(
            2 * Math.PI + Math.atan2(yRelativeToCenter, xRelativeToCenter)
          );
          let endTime = Date.now();
          submitData({
            coherence: coherence,
            initialDirection,
            finalDirection,
            reportedDirection,
            angleChange,
            directionType: checkDirection(finalDirection, reportedDirection)
              ? "Final Direction"
              : checkDirection(initialDirection, reportedDirection)
              ? "Initial Direction"
              : "Random Direction",
            responseTime: endTime - startTime,
          });
        }
      }

      // For Mouse
      resCanvas.addEventListener("mousedown", startDrawing);
      resCanvas.addEventListener("mousemove", draw);
      resCanvas.addEventListener("mouseup", stopDrawing);
      resCanvas.addEventListener("mouseout", stopDrawing);

      let drawingTouch = false;
      const startDrawingTouch = (e) => {
        if (!drawingTouch) {
          drawingTouch = true;
          const { clientX, clientY } = e.touches[0];
          const { offsetX, offsetY } = getOffset(resCanvas, clientX, clientY);
          resContext.beginPath();
          resContext.moveTo(offsetX, offsetY);
        }
      };

      const drawTouch = (e) => {
        if (drawingTouch) {
          e.preventDefault(); // Prevent scrolling on touch devices
          const { clientX, clientY } = e.touches[0];
          const { offsetX, offsetY } = getOffset(resCanvas, clientX, clientY);
          resContext.lineTo(offsetX, offsetY);
          resContext.stroke();
        }
      };

      const stopDrawingTouch = (e) => {
        if (drawingTouch) {
          const { clientX, clientY } = e.changedTouches[0];
          const { offsetX, offsetY } = getOffset(resCanvas, clientX, clientY);
          const centerX = 200;
          const centerY = 200;
          const xRelativeToCenter = offsetX - centerX;
          const yRelativeToCenter = offsetY - centerY;
          resContext.closePath();
          drawingTouch = false;
          const reportedDirection = radianToDegree(
            2 * Math.PI + Math.atan2(yRelativeToCenter, xRelativeToCenter)
          );
          let endTime = Date.now();
          submitData({
            coherence: coherence,
            initialDirection,
            finalDirection,
            reportedDirection,
            angleChange,
            directionType: checkDirection(finalDirection, reportedDirection)
              ? "Final Direction"
              : checkDirection(initialDirection, reportedDirection)
              ? "Initial Direction"
              : "Random Direction",
            responseTime: endTime - startTime,
          });
        }
      };

      // Helper function to calculate offset of touch event relative to canvas
      const getOffset = (canvas, clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        return {
          offsetX: clientX - rect.left,
          offsetY: clientY - rect.top,
        };
      };

      // For Touch
      resCanvas.addEventListener("touchstart", startDrawingTouch);
      resCanvas.addEventListener("touchmove", drawTouch);
      resCanvas.addEventListener("touchend", stopDrawingTouch);
      resCanvas.addEventListener("touchcancel", stopDrawingTouch);
      return () => {
        resCanvas.removeEventListener("mousedown", startDrawingTouch);
        resCanvas.removeEventListener("mousemove", drawTouch);
        resCanvas.removeEventListener("mouseup", stopDrawingTouch);
        resCanvas.removeEventListener("mouseout", stopDrawingTouch);

        resCanvas.removeEventListener("touchstart", startDrawingTouch);
        resCanvas.removeEventListener("touchmove", drawTouch);
        resCanvas.removeEventListener("touchend", stopDrawingTouch);
        resCanvas.removeEventListener("touchcancel", stopDrawingTouch);
        clearTimeout(timeout4);
      };
    }
  }, [showRDK]);

  return (
    <div>
      {showRDK ? (
        <canvas
          ref={rdkCanvasRef}
          id="rdk"
          height={400}
          width={400}
          style={canvasStyle}
        ></canvas>
      ) : (
        <div>
          <canvas
            ref={responseCanvasRef}
            height={400}
            width={400}
            style={{
              zIndex: 10,
              ...canvasStyle,
            }}
            id="response"
          ></canvas>
        </div>
      )}
    </div>
  );
};
