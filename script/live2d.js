const { Live2DModel, MotionPreloadStrategy } = PIXI.live2d;

(async function () {
  const canvas = document.getElementById('canvas');
  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: window,
    antialias: true,
    view: canvas,
  });

  const model = await Live2DModel.from('assets/live2d/shizuku.model.json', {
    autoInteract: false,
    motionPreload: MotionPreloadStrategy.IDLE
  });

  app.stage.addChild(model);

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
    sm: window.innerWidth > 720 && window.innerWidth < 1000,
    md: window.innerWidth >= 1000
  };

  const anchor = {
    x: breakpoint.md ? 1 : 0.5,
    y: 0.85
  };

  const scale = {
    x: breakpoint.md ? 0.4 : breakpoint.sm ? 0.3 : 0.25,
    y: breakpoint.md ? 0.475 : breakpoint.sm ? 0.375 : 0.3
  };

  const width = breakpoint.sm
    ? model.width / 2
    : breakpoint.md
    ? model.width
    : app.renderer.screen.width / 2;

  const height = breakpoint.sm || breakpoint.md
    ? app.renderer.screen.height
    : model.height;

  model.anchor.set(anchor.x, anchor.y);
  model.scale.set(scale.x, scale.y);
  model.x = width;
  model.y = height;
}

window.addEventListener('resize', fitModel);
