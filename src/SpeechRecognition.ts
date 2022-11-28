import { CustomWindow } from './types';

declare const window: CustomWindow;

const InitRecognition: any =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechRecognition = InitRecognition
  ? new InitRecognition()
  : { unsupported: true };

SpeechRecognition.continuous = true;
SpeechRecognition.lang = 'en-US';
SpeechRecognition.interimResults = true;
SpeechRecognition.maxAlternatives = 1;

const img = <HTMLImageElement>document.querySelector('#recognition > img');

img.src =
  'assets/mic' + (SpeechRecognition.unsupported ? '' : '-mute') + '.svg';

export default SpeechRecognition;
