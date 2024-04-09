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
