// @ts-ignore
const { writeFileSync } = require('fs');
const { join } = require('path');
const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en');
const { LangId } = require('@nlpjs/lang-id');
const { LangJa } = require('@nlpjs/lang-ja');
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
  container.use(LangJa);

  const nlp = container.get('nlp');

  nlp.settings.autoSave = false;

  // add data manually i dont know how to do this
  corpora.forEach(({ locale, data }: corpus) => {
    nlp.addLanguage(locale);

    data.forEach(({ intent, utterances, answers }: data) => {
      utterances.forEach((utterance: string) => {
        nlp.addDocument(locale, utterance, intent);
      });

      answers.forEach((answer: string) => {
        nlp.addAnswer(locale, intent, answer);
      });
    });
  });

  await nlp.train();
  writeFileSync(join(__dirname, 'model.json'), nlp.export(true));
})();
