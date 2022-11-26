const { Live2DModel, MotionPreloadStrategy } = PIXI.live2d;
const canvas = document.getElementById('canvas');

(async function () {
  const app = new PIXI.Application({
    backgroundAlpha: 0,
    view: canvas,
  });

  const model = await Live2DModel.from('assets/live2d/shizuku.model.json', {
    autoInteract: false,
    motionPreload: MotionPreloadStrategy.IDLE
  });

  app.stage.addChild(model);
  window.LOADED('model');

  let mousestate = false;
  canvas.addEventListener('pointerenter', () => (mousestate = true));
  canvas.addEventListener('pointerleave', () => {
    model.internalModel.focusController.focus(0, 0);
    mousestate = false;
  });

  canvas.addEventListener('pointermove', ({ clientX, clientY }) => {
    if (mousestate) model.focus(clientX, clientY);
  });

  // expressions
  // interaction
  //model.on('hit', (hitAreas) => {
  //  if (hitAreas.includes('body')) {
  //    model.motion('tap_body');
  //  }
  //});

  window.model = model;
  window.app = app;

  // TODO: fitmodel on model loaded (event doesnt work idk)
  fitModel();
  setTimeout(() => fitModel(), 250);
})();

function fitModel() {
  const breakpoint = {
    md: window.innerWidth > 720 && window.innerWidth < 1000,
    lg: window.innerWidth >= 1000
  };

  // set canvas and renderer before model
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // width doesnt matter on md++
  if (!breakpoint.md && !breakpoint.lg) app.renderer.screen.width = window.innerWidth;
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
