import { containerBootstrap } from '@nlpjs/core';
import { Nlp } from '@nlpjs/nlp';
import { LangEn } from '@nlpjs/lang-en';
import { LangId } from '@nlpjs/lang-id';
import model from './nlp/model.json';

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
