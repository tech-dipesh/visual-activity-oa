const reachedScrollMilestones = new Set();
const scrollMilestones = [25, 50, 75, 100];

function describeElement(element) {
  const tag = element.tagName.toLowerCase();
  const idPart = element.id ? `#${element.id}` : "";
  const label = element.innerText ? element.innerText.trim().slice(0, 50) : "";
  return label ? `${tag}${idPart} "${label}"` : `${tag}${idPart}`;
}

document.addEventListener("click", (event) => {
  const clickedElement = event.target;

  chrome.runtime.sendMessage({
    type: "CLICK",
    elementInfo: describeElement(clickedElement),
  });
});

document.addEventListener("scroll", () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollableHeight <= 0) {
    return;
  }

  const scrollPercent = Math.round((window.scrollY / scrollableHeight) * 100);

  for (const milestone of scrollMilestones) {
    if (scrollPercent >= milestone && !reachedScrollMilestones.has(milestone)) {
      reachedScrollMilestones.add(milestone);
      chrome.runtime.sendMessage({
        type: "SCROLL",
        scrollDepth: milestone,
      });
    }
  }
});
