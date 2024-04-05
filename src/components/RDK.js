import React, { useEffect, useRef, useState } from "react";

export const RDK = ({ coherence, trialTime, submitData }) => {
  const [initialDirection, setInitialAngle] = useState();
  const [finalDirection, setFinalDirection] = useState();
  const [angleChange, setAngleChange] = useState();
  const [reportedDirection, setReportedDirection] = useState();
  const [showRDK, setShowRDK] = useState(true);
  const canvasStyle = {
    borderRadius: "50%",
    border: "2px solid black",
    overflow: "hidden",
    backgroundColor: "white",
  };
  const rdkCanvasRef = useRef();
  const responseCanvasRef = useRef();

  const radianToDegree = (angleInRadian) => {
    return (angleInRadian * (180 / Math.PI)) % 360;
  };

  const startRDK = () => {
    const canvas = rdkCanvasRef.current;
    const context = canvas.getContext("2d");
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
      context.fillStyle = "black";
      context.fill();
      context.closePath();
    };

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

      requestAnimationFrame(update);
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
    update();
    setTimeout(changeDirection, trialTime / 2);
    setTimeout(() => {
      setShowRDK(false);
    }, trialTime);
  };

  useEffect(() => {
    startRDK();
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
        resContext.strokeStyle = "black"; // Change color if needed
        resContext.stroke();
      };
      drawCross();
      let drawing = false;
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
          const angle =
            2 * Math.PI + Math.atan2(yRelativeToCenter, xRelativeToCenter);
          resContext.closePath();
          drawing = false;
          setReportedDirection(angle);
          submitData({
            coherence,
            initialDirection,
            finalDirection,
            reportedDirection: radianToDegree(angle),
            angleChange,
          });
        }
      }

      // For Mouse
      resCanvas.addEventListener("mousedown", startDrawing);
      resCanvas.addEventListener("mousemove", draw);
      resCanvas.addEventListener("mouseup", stopDrawing);
      resCanvas.addEventListener("mouseout", stopDrawing);

      // For Touch
      resCanvas.addEventListener("touchstart", startDrawing);
      resCanvas.addEventListener("touchmove", draw);
      resCanvas.addEventListener("touchend", stopDrawing);
      resCanvas.addEventListener("touchleave", stopDrawing);
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
