export const findCorrectIncorrect = (data) => {
  let finalAngle = data.finalDirection;
  let reportedAngle = data.reportedDirection;
  let maxLimit = (finalAngle + 20) % 360;
  let minLimit = finalAngle - 20;
  if (minLimit < 0) {
    minLimit += 360;
  }

  if (minLimit <= maxLimit) {
    return reportedAngle >= minLimit && reportedAngle <= maxLimit;
  } else {
    return reportedAngle >= minLimit || reportedAngle <= maxLimit;
  }
};

export const checkDirection = (angle, reportedAngle) => {
  let maxLimit = (angle + 20) % 360;
  let minLimit = angle - 20;
  if (minLimit < 0) {
    minLimit += 360;
  }

  if (minLimit <= maxLimit) {
    return reportedAngle >= minLimit && reportedAngle <= maxLimit;
  } else {
    return reportedAngle >= minLimit || reportedAngle <= maxLimit;
  }
};

export const radianToDegree = (angleInRadian) => {
  return (angleInRadian * (180 / Math.PI)) % 360;
};

export const countTrials = (data, setGraphData1) => {
  let array = data.data;
  let initial = 0;
  let final = 0;
  let random = 0;
  for (let i = 0; i < array.length; i++) {
    let dataPoint = array[i];
    if (dataPoint.directionType === "Initial Direction") {
      initial++;
    } else if (dataPoint.directionType === "Final Direction") {
      final++;
    } else {
      random++;
    }
  }
  setGraphData1([final, initial, random]);
};
