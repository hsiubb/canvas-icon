const FULL_WIDTH = window.innerWidth;
const FULL_HEIGHT = window.innerHeight;

const COLOR_WHITE  = '#fff';
const COLOR_BLUE   = '#38c';
const COLOR_ORANGE = '#f90';

function angleToRadian(x) {
	return x === +x && Math.PI * 2 * x / 360;
}

(function() {
  let icons = {};
  let canvas = document.getElementById('canvasIcon');
  let context = canvas.getContext("2d");

  let bgColor = COLOR_BLUE;
  let itemColor = COLOR_WHITE;

  canvas.style.width  = canvas.width  = FULL_WIDTH;
  canvas.style.height = canvas.height = FULL_HEIGHT;

  context.fillStyle = COLOR_BLUE;
  context.fillRect(0, 0, FULL_WIDTH, FULL_HEIGHT);

  icons.spaceship = function(size, color, x, y, angle) {
    let ship = {};
    ship.update = function(x, y) {
        context.save();
          context.beginPath();
            context.translate(x, y);
            context.rotate(angleToRadian(angle));
            context.moveTo( - size / 2 , size / 2 - 2 );
            context.lineTo( - 1        , size * .3    );
            context.lineTo( - 1        , - size / 2   );
            context.moveTo(   1        , - size / 2   );
            context.lineTo(   1        , size * .3    );
            context.lineTo( size / 2   , size / 2 - 2 );
          context.closePath();
          context.fillStyle = color;
          context.fill();
        context.restore();
    };

    ship.left   = x - size / 2;
    ship.right  = x + size / 2;
    ship.top    = y - size / 2;
    ship.bottom = y + size / 2;

    ship.update(x, y);

    return ship;
  };

  icons.create = function(options) {
    icons[options.element](options.size || 20, options.color || itemColor, options.x || 0, options.y || 0, options.angle || 0);
  };
  icons.update = function(element) {
      context.save();
        context.beginPath();
          context.translate(options.x || 0, options.y);
          context.rotate(angleToRadian(options.angle || 0));

        context.closePath();
        context.fillStyle = options.color || itemColor;
        context.fill();
      context.restore();
  };

  let ship = icons.create({
    element: 'spaceship',
    size: 20,
    x: 20,
    y: 20
  });

}());
