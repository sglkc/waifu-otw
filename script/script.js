const form = document.getElementById('form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');

const createMessage = (sender, message) => {
  const div = document.createElement('div');

  div.className = sender;
  div.innerText = message;

  messages.append(div);
  div.scrollIntoView();
}

const processMessage = (message) => {
  // random delay for "authenticity"
  const delay = Math.random() * 2000 + 300;
  nlp
    .process(message)
    .then((e) =>
      setTimeout(() => createMessage('shizuku', e.answer), delay)
    );
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (!message.length) return;

  createMessage('me', message);
  processMessage(message);

  input.value = '';
});
