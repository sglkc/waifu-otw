const { Live2DModel, MotionPreloadStrategy } = PIXI.live2d;

(async function () {
  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: window,
    antialias: true,
    view: document.getElementById('canvas'),
  });

  const model = await Live2DModel.from('assets/live2d/shizuku.model.json', {
    motionPreload: MotionPreloadStrategy.IDLE
  });

  app.stage.addChild(model);

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
  const breakpoint = window.innerWidth > 720;

  const anchor = {
    x: breakpoint ? 1 : 0.5,
    y: 0.85
  };

  const scale = {
    x: breakpoint ? 0.4 : 0.25,
    y: breakpoint ? 0.475 : 0.3
  };

  const width = breakpoint
    ? model.width
    : app.renderer.screen.width / 2;

  const height = breakpoint
    ? app.renderer.screen.height
    : model.height;

  model.anchor.set(anchor.x, anchor.y);
  model.scale.set(scale.x, scale.y);
  model.x = width;
  model.y = height;
}

window.addEventListener('resize', fitModel);
