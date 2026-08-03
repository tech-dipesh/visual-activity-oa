const backendUrl = "http://localhost:4000/api/events";
const flushIntervalMs = 5000;

let pendingEvents = [];

function queueEvent(event) {
  pendingEvents.push(event);
}


setInterval(flushEvents, flushIntervalMs);
chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab) {
    return;
  }

  if (message.type === "CLICK") {
    queueEvent({
      type: "CLICK",
      url: sender.tab.url,
      tabId: sender.tab.id,
      elementInfo: message.elementInfo,
      occurredAt: new Date().toISOString(),
    });
  }

  if (message.type === "SCROLL") {
    queueEvent({
      type: "SCROLL",
      url: sender.tab.url,
      tabId: sender.tab.id,
      scrollDepth: message.scrollDepth,
      occurredAt: new Date().toISOString(),
    });
  }
});
