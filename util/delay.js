let delayId = null;

export function delay(seconds, func) {
  delayId = setTimeout(func, seconds * 1000);
}

export function terminateDelay() {
  if (delayId) {
    clearTimeout(delayId);
  }
}
