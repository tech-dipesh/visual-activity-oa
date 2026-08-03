const reachedScrollMilestones = new Set();
const scrollMilestones = [25, 50, 75, 100];

document.addEventListener("click", (event) => {
  const clickedElement = event.target;

  chrome.runtime.sendMessage({
    type: "CLICK",
    elementInfo: describeElement(clickedElement),
  });
});
