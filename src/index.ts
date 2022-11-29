import { CustomWindow } from './types';
import Live2D from './Live2D';
import './Message.ts';
import NLP from './NLP';
import SpeechRecognition from './SpeechRecognition';

declare const window: CustomWindow;

window.Modules = {
  live2d: Live2D,
  nlp: NLP,
  recognition: SpeechRecognition,
};

document.getElementById('loader')!.style.display = 'none';

// TODO: better help pleasze
document.getElementById('help')!.onclick = () => alert(
'The laziest type of help you\'ve ever seen.\n' +
'\n' +
'> Languages <\n' +
'Chiai can speak 3 languages! English, Bahasa Indonesia, and Japanese. She ' +
'can guess what language you\'re using and she\'ll respond in that language.\n' +
'\n' +
'> Speech Recognition <\n' +
'Click the mic button and start speaking! Speech output will be displayed on ' +
'the message input box and will be sent automatically once you stopped recording.\n' +
'NOTE: Speech Recognition is not supported on all browsers, so don\'t expect it ' +
'to work.\n' +
'\n' +
'> Anything else <\n' +
'For more information, you could visit this project\'s repository by clicking ' +
'the GitHub button, and scroll down.'
);
