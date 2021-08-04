async function createIframe(type) {
  const iframe = document.createElement("iframe");
  iframe.src = `out/${type}.html`;
  document.body.appendChild(iframe);
  await new Promise((r) => (iframe.onload = r));
  return iframe;
}

async function cleanUp(iFrames) {
  for (iframe of iFrames) {
    iframe.remove();
  }
}
