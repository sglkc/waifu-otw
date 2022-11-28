import NLP from "./NLP";

const form = <HTMLFormElement>document.getElementById('form');
const input = <HTMLInputElement>document.getElementById('message');
const messages = <HTMLElement>document.getElementById('messages');

const createMessage = (sender: 'user' | 'reply', message: string) => {
  const div = document.createElement('div');

  div.className = sender;
  div.innerText = message;

  messages.append(div);
  div.scrollIntoView();
}

const processMessage = (message: string) => {
  // random delay for "authenticity"
  const delay = Math.random() * 2000 + 300;

  NLP
    .process(message)
    .then((e: { answer: string }) => {
      const answer = e.answer || "Sorry, I don't speak that language";
      setTimeout(() => createMessage('reply', answer), delay)
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (!message.length) return;

  createMessage('user', message);
  processMessage(message);

  input.value = '';
});

export { createMessage, processMessage };
