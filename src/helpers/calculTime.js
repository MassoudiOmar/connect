function calculateTimeDifference(startTime, endTime) {
    const startParts = startTime.split(":");
    const endParts = endTime.split(":");
    const startMinutes = parseInt(startParts[0]);
    const startSeconds = parseInt(startParts[1]);
    const endMinutes = parseInt(endParts[0]);
    const endSeconds = parseInt(endParts[1]);
    const totalStartSeconds = startMinutes * 60 + startSeconds;
    const totalEndSeconds = endMinutes * 60 + endSeconds;
    const secondsDifference = totalEndSeconds - totalStartSeconds;
    const minutes = Math.floor(secondsDifference / 60);
    const seconds = secondsDifference % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
    return formattedTime;
  }
  export default calculateTimeDifference