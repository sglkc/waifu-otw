import { Application } from '@pixi/app';
import { Renderer } from '@pixi/core';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { InteractionManager } from '@pixi/interaction';
import { Live2DModel, MotionPreloadStrategy } from 'pixi-live2d-display';

// @ts-ignore
Live2DModel.registerTicker(Ticker);
Application.registerPlugin(TickerPlugin);
Renderer.registerPlugin('interaction', InteractionManager);

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const app = new Application({
  backgroundAlpha: 0,
  view: canvas,
});

const model = await Live2DModel.from('live2d/shizuku.model.json', {
  autoInteract: false,
  motionPreload: MotionPreloadStrategy.IDLE
});

app.stage.addChild(model);

let mousestate = false;
canvas.addEventListener('pointerdown', (event) => model.tap(event.clientX, event.clientY));
canvas.addEventListener('pointerenter', () => (mousestate = true));
canvas.addEventListener('pointerleave', () => {
  model.internalModel.focusController.focus(0, 0);
  mousestate = false;
});

canvas.addEventListener('pointermove', ({ clientX, clientY }) => {
  if (mousestate) model.focus(clientX, clientY);
});

// interaction
model.on('hit', (hitAreas) => {
  if (hitAreas.includes('head')) model.motion('shake', 1);
});

const expressions = { happy: 1, sad: 2, angry: 3 };
const motions: {[key: string]: Array<[string, number]>} = {
  talk: [
    ['tap_body', 0],
    ['tap_body', 2],
    ['pinch_out', 0],
    ['flick_head', 1],
    ['flick_head', 2],
  ],
  cheer: [
    ['tap_body', 1]
  ],
  mouthcover: [
    ['pinch_in', 0],
    ['pinch_in', 1],
    ['pinch_in', 2],
  ],
  disagree: [
    ['pinch_out', 1],
    ['pinch_out', 2],
  ],
  surprised: [
    ['shake', 0],
    ['shake', 2],
  ],
  laugh: [
    ['shake', 1],
  ]
};

// TODO: it has to be done twice, idk why
fitModel();
setTimeout(() => fitModel(), 250);

function fitModel() {
  const breakpoint = {
    md: window.innerWidth > 720 && window.innerWidth < 1000,
    lg: window.innerWidth >= 1000
  };

  // set canvas and renderer before model
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // width doesnt matter on md++
  if (!breakpoint.md && !breakpoint.lg) {
    app.renderer.screen.width = window.innerWidth;
  }
  app.renderer.screen.height = window.innerHeight;

  const anchor = {
    x: breakpoint.lg ? 1 : 0.5,
    y: 0.85
  };

  const scale = {
    x: breakpoint.lg ? 0.4 : breakpoint.md ? 0.35 : 0.25,
    y: breakpoint.lg ? 0.475 : breakpoint.md ? 0.425 : 0.3
  };

  const width = breakpoint.md
    ? model.width / 2.35
    : breakpoint.lg
      ? model.width
      : app.renderer.screen.width / 2;

  const height = breakpoint.md || breakpoint.lg
    ? app.renderer.screen.height
    : model.height;

  model.anchor.set(anchor.x, anchor.y);
  model.scale.set(scale.x, scale.y);
  model.x = width;
  model.y = height;
}

window.addEventListener('resize', fitModel);

export default { app, expressions, model, motions };
