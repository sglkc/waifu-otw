declare global {
  interface Window {
    APP: any;
    LOADED: any;
    MODEL: any;
    NLP: any;
  }
}

import './style.css';
import './nlp.ts';
import './live2d.ts';

const form = <HTMLFormElement>document.getElementById('form');
const input = <HTMLInputElement>document.getElementById('message');
const messages = <HTMLElement>document.getElementById('messages');
const loader = <HTMLElement>document.getElementById('loader');

/* Handle async loader things */
const modules = [];

window.LOADED = (thing: string) => {
  modules.push(thing);
  if (modules.length === 2) loader.style.display = 'none';
}

/* begin */
const createMessage = (sender: string, message: string) => {
  const div = document.createElement('div');

  div.className = sender;
  div.innerText = message;

  messages.append(div);
  div.scrollIntoView();
}

const processMessage = (message: string) => {
  // random delay for "authenticity"
  const delay = Math.random() * 2000 + 300;

  window.NLP
    .process(message)
    .then((e: { answer: string }) => {
      const answer = e.answer || "Sorry, I don't speak that language";
      setTimeout(() => createMessage('chiai', answer), delay)
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (!message.length) return;

  createMessage('me', message);
  processMessage(message);

  input.value = '';
});
