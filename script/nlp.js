const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en');
const { LangId } = require('@nlpjs/lang-id');
const { LangJa } = require('@nlpjs/lang-ja');
const model = require('./nlp/model.json');

(async () => {
  const container = await containerBootstrap();

  container.use(Nlp);
  container.use(LangEn);
  container.use(LangId);

  const nlp = container.get('nlp');

  nlp.settings.autoSave = false;
  nlp.import(model);

  window.NLP = nlp;
  window.LOADED('nlp');
})();
