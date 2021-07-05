async function createIframe(type) {
  const iframe = document.createElement("iframe");
  iframe.src = `src/${type}/out/index.html`;
  document.body.appendChild(iframe);
  await new Promise((r) => (iframe.onload = r));
  return iframe;
}

async function cleanUp(iframes) {
  for await (iframe of iframes) {
    iframe.remove();
  }
}
