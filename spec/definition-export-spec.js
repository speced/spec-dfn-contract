const sources = ["bikeshed", "respec"];

const docTypes = new Map();
beforeAll(async () => {
  for (let source of sources) {
    docTypes.set(source, createIframe(source));
  }
});

afterAll(async () => {
  const iFrames = await Promise.all([...docTypes.values()]);
  cleanUp(iFrames);
});

for (const type of sources) {
  describe(`${type} - simple definition`, () => {
    it(`must have data-dfn-type attribute`, async () => {
      const iframe = await docTypes.get(type);
      const doc = iframe.contentDocument;
      const dfn = doc.querySelector(
        "#simple-definition dfn[data-dfn-type=dfn]"
      );
      debugger
      expect(dfn).withContext(type).not.toBeNull();
    });

    it(`must have an id attribute`, async () => {
      const iframe = await docTypes.get(type);
      const doc = iframe.contentDocument;
      const dfn = doc.querySelector("#simple-definition dfn[id]");
      expect(dfn).not.toBeNull();
    });
  });
}
