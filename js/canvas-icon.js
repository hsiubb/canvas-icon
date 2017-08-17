const FULL_WIDTH = window.innerWidth;
const FULL_HEIGHT = window.innerHeight;

const COLOR_WHITE  = '#fff';
const COLOR_BLUE   = '#38c';
const COLOR_ORANGE = '#f90';

function angleToRadian(x) {
	return x === +x && Math.PI * 2 * x / 360;
}

(function() {
	let canvas = document.getElementById('canvasIcon');
	let context = canvas.getContext("2d");

	let bgColor = COLOR_BLUE;
	let itemColor = COLOR_WHITE;

	canvas.style.width  = canvas.width  = FULL_WIDTH;
	canvas.style.height = canvas.height = FULL_HEIGHT;

	context.fillStyle = COLOR_BLUE;
	context.fillRect(0, 0, FULL_WIDTH, FULL_HEIGHT);

  let icons = {
		create: function(element) {
			element.size  = element.element || 20;
			element.color = element.color   || itemColor;
			element.x     = element.x       || 0;
			element.y     = element.y       || 0;
			element.angle = element.angle   || 0;
		  icons[element.type].init(element);
			return element;
	  },
		update: function(element) {
      context.save();
        context.beginPath();
          context.translate(element.x, element.y);
          context.rotate(angleToRadian(element.angle));
			    icons[element.type].update(element);
        context.closePath();
        context.fillStyle = element.color;
        context.fill();
      context.restore();
		},
		spaceship: {
			name: 'spaceship',
			init: function(element) {
		    element.left   = element.x - element.size / 2;
		    element.right  = element.x + element.size / 2;
		    element.top    = element.y - element.size / 2;
		    element.bottom = element.y + element.size / 2;

		    icons.update(element);
			},
			update: function(element) {
				context.moveTo( - element.size / 2 , element.size / 2 - 2 );
				context.lineTo( - 1                , element.size * .3    );
				context.lineTo( - 1                , - element.size / 2   );
				context.moveTo(   1                , - element.size / 2   );
				context.lineTo(   1                , element.size * .3    );
				context.lineTo( element.size / 2   , element.size / 2 - 2 );
			}
	  }
	};

  let ship = icons.create({
    type: 'spaceship',
    size: 20,
    x: 20,
    y: 20
  });

	ship.x = 50;
	ship.y = 50;
  icons.update(ship);

}());
