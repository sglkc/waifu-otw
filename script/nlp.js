const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en-min');
const { data } = require('./corpus.json');

(async () => {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangEn);
  const nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage('en');
  data.forEach(({ intent, utterances, answers }) => {
    utterances.forEach((u) => {
      nlp.addDocument('en', u, intent);
    });

    answers.forEach((a) => {
      nlp.addAnswer('en', intent, a);
    });
  });
  await nlp.train();
  window.nlp = nlp;
})();
