// @ts-ignore can't exclude this from build config
const { writeFileSync } = require('fs');
const { join } = require('path');
const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en');
const { LangId } = require('@nlpjs/lang-id');
const corpora = [
  require('./corpus-en.json'),
  require('./corpus-id.json'),
  require('./corpus-ja.json')
];

interface corpus {
  locale: string;
  data: Array<data>;
};

interface data {
  intent: string;
  utterances: Array<string>;
  answers: Array<string>;
}

(async () => {
  const container = await containerBootstrap();

  container.use(Nlp);
  container.use(LangEn);
  container.use(LangId);

  const nlp = container.get('nlp');

  nlp.settings.autoSave = false;

  await nlp.addCorpora(corpora);
  await nlp.train();
  writeFileSync(join(__dirname, 'model.json'), nlp.export(true));
})();
