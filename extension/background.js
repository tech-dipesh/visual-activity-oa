const backendUrl = "http://localhost:4000/api/events";
const flushIntervalMs = 5000;

let pendingEvents = [];

function queueEvent(event) {
  pendingEvents.push(event);
}

async function flushEvents() {
  if (pendingEvents.length === 0) {
    return;
  }

  const eventsToSend = pendingEvents;
  pendingEvents = [];

  try {
    await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: eventsToSend }),
    });
  } catch (error) {
    pendingEvents = eventsToSend.concat(pendingEvents);
  }
}

setInterval(flushEvents, flushIntervalMs);

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0) {
    return;
  }

  queueEvent({
    type: "VISIT",
    url: details.url,
    tabId: details.tabId,
    occurredAt: new Date().toISOString(),
  });
});

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
