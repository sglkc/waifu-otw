import { Application } from '@pixi/app';
import { Live2DModel } from 'pixi-live2d-display';

export interface SpeechRecognition {
  continuous: Boolean;
  lang: string;
  interimResults: Boolean;
  maxAlternatives: Number;
  onend: Function;
  onstart: Function;
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
