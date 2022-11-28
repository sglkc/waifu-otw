import { Application } from '@pixi/app';
import { Live2DModel } from 'pixi-live2d-display';

export interface SpeechRecognition {
  continuous: Boolean;
  interimResults: Boolean;
  lang: string;
  maxAlternatives: number;
  recording: Boolean;
  transcription: string;
  start: Function;
  stop: Function;
  onerror: Function;
  onend: Function;
  onresult: Function;
  onstart: Function;
}

export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface CustomWindow extends Window {
  SpeechRecognition: SpeechRecognition | null;
  webkitSpeechRecognition: SpeechRecognition | null;
  Modules: {
    live2d: {
      app: Application,
      model: Live2DModel
    };
    nlp: any;
    recognition: SpeechRecognition;
  }
}
