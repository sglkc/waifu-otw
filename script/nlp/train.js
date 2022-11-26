const { writeFileSync } = require('fs');
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

(async () => {
  const container = await containerBootstrap();

  container.use(Nlp);
  container.use(LangEn);
  container.use(LangId);

  const nlp = container.get('nlp');

  nlp.settings.autoSave = false;

  // add data manually i dont know how to do this
  corpora.forEach(({ locale, data }) => {
    nlp.addLanguage(locale);

    data.forEach(({ intent, utterances, answers }) => {
      utterances.forEach((utterance) => {
        nlp.addDocument(locale, utterance, intent);
      });

      answers.forEach((answer) => {
        nlp.addAnswer(locale, intent, answer);
      });
    });
  });

  await nlp.train();
  writeFileSync('./script/nlp/model.json', nlp.export(true));
})();
