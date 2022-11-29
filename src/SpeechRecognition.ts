import { CustomWindow, SpeechRecognitionEvent } from './types';
import Mic from './assets/mic.svg';
import MicFill from './assets/mic-fill.svg';
import MicMute from './assets/mic-mute.svg';
import { processMessage } from './Message';

declare const window: CustomWindow;

const InitRecognition: any =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechRecognition = InitRecognition
  ? new InitRecognition()
  : { unsupported: true };

const img = <HTMLImageElement>document.querySelector('#recognition > img');
const button = <HTMLButtonElement>document.querySelector('#recognition');
const lang = <HTMLButtonElement>document.querySelector('#recognition-lang');
const input = <HTMLInputElement>document.getElementById('message');
const send = <HTMLInputElement>document.getElementById('send');

button.onclick = () => {
  if (SpeechRecognition.unsupported) return alert('not supported');
  SpeechRecognition[SpeechRecognition.recording ? 'stop' : 'start']();
};

img.src = SpeechRecognition.unsupported ? MicMute : Mic;

lang.onclick = () => {
  if (SpeechRecognition.unsupported) return;

  switch (SpeechRecognition.lang) {
    case 'en-US':
      SpeechRecognition.lang = 'id-ID';
      lang.innerText = 'ID';
      break;
    case 'id-ID':
      SpeechRecognition.lang = 'ja-JP';
      lang.innerText = 'JA';
      break;
    case 'ja-JP':
    default:
      SpeechRecognition.lang = 'en-US';
      lang.innerText = 'EN';
  }
}

SpeechRecognition.continuous = true;
SpeechRecognition.interimResults = true;
SpeechRecognition.lang = 'en-US';
SpeechRecognition.maxAlternatives = 1;
SpeechRecognition.recording = false;
SpeechRecognition.transcript = '';

SpeechRecognition.onend = () => {
  SpeechRecognition.recording = false;
  img.src = Mic;

  if (SpeechRecognition.transcript.length) {
    processMessage(SpeechRecognition.transcript);
    SpeechRecognition.transcript = '';
    send.disabled = true;
    input.disabled = false;
    input.value = '';
  }
}

SpeechRecognition.onstart = () => {
  SpeechRecognition.recording = true;
  img.src = MicFill;
}

SpeechRecognition.onerror = ({ error }: { error: string }) => {
  const messages: { [key: string]: string } = {
    'no-speech': 'No speeches detected, try to adjust your microphone',
    'network': 'A good internet connection is required, try again later',
    'audio-capture': 'No input device detected',
    'not-allowed': 'Access to microphone was denied'
  };

  alert(messages[error]);
}

SpeechRecognition.onresult = (e: SpeechRecognitionEvent) => {
  const { results, resultIndex } = e;
  const { transcript } = results[resultIndex][0];

  SpeechRecognition.transcript = transcript;
  send.disabled = true;
  input.disabled = true;
  input.value = transcript;
}

export default SpeechRecognition;
