const FULL_WIDTH = window.innerWidth;
const FULL_HEIGHT = window.innerHeight;

const COLOR_WHITE  = '#fff';
const COLOR_BLUE   = '#38c';
const COLOR_ORANGE = '#f90';

let draw = {
  iconSize: 20,
  bgColor: COLOR_BLUE,
  canvas: document.getElementById('gameBox'),
  angleToRadian: function(x) {
    return x === +x && Math.PI * 2 * x / 360;
  },
  calcRadian: function(curX, curY, tarX, tarY) {
    return Math.atan2(curY - tarY , curX - tarX) + Math.PI;
  },
  calcDistance: function(curX, curY, tarX, tarY) {
    return Math.pow(Math.pow(tarY - curY, 2) + Math.pow(tarX - curX, 2), .5)
  },

  shapes: {
    /*shape: function(options) {
  		  draw.context.save();
  				draw.context.translate(options.x, options.y);
  				draw.context.beginPath();

          if(options.coloring === 'stroke') {
            draw.context.strokeStyle = options.color;
            draw.context.stroke();
          } else {
            draw.context.fillStyle = options.color;
            draw.context.fill();
          }
          draw.context.closePath();
        draw.context.restore();
      }*/

    dashBox: function(options) {
      options.width /= 2;
      options.height /= 2;
      draw.context.save();
        draw.context.translate(options.x, options.y);
        draw.context.beginPath();

          draw.context.moveTo(-options.width, -options.height);
          draw.context.setLineDash(options.lineArr);
          draw.context.lineWidth = options.lineWidth;
          draw.context.lineTo(options.width, -options.height);
          draw.context.lineTo(options.width, options.height);
          draw.context.lineTo(-options.width, options.height);
          draw.context.lineTo(-options.width, -options.height);

          draw.context.strokeStyle = options.color;
          draw.context.stroke();
        draw.context.closePath();
      draw.context.restore();
    },
		ellipse: function(options) {
      //////////////////////////////////////////////////
      //
      //  axis_x, axis_y: length of ellipse's axis
      //
      //////////////////////////////////////////////////

      options.width /=  2;
      options.height /=  2;
			let ratioX = 1,
				ratioY = 1,
				radius = (options.width > options.height) ? (ratioY = options.height / options.width, options.width) : (ratioX = options.width / options.height, options.height);

		  draw.context.save();
				draw.context.translate(options.x, options.y);
				draw.context.scale(ratioX, ratioY);
				draw.context.beginPath();
					draw.context.arc(0, 0, radius, 0, 2 * Math.PI, false);
          if(options.coloring === 'stroke') {
  					draw.context.strokeStyle = options.color;
  					draw.context.stroke();
          } else {
  					draw.context.fillStyle = options.color;
  					draw.context.fill();
          }
				draw.context.closePath();
			draw.context.restore();
		},
    roundedRect: function(options) {
      //////////////////////////////////////////////////
      //
      //  width: height: icon's size
      //  radius: round angle's radius
      //
      //////////////////////////////////////////////////

      options.x -= (options.width/2);
      options.y -= (options.height/2);
      draw.context.save();
        draw.context.translate(options.x, options.y);
        draw.context.beginPath();

          draw.context.moveTo( options.radius, 0 );
          draw.context.arcTo(  options.width, 0, options.width, options.height, options.radius );
          draw.context.arcTo(  options.width, options.height, 0, options.height, options.radius );
          draw.context.arcTo(  0, options.height, 0, 0, options.radius );
          draw.context.arcTo(  0, 0, options.width, 0, options.radius );

          if(options.coloring === 'stroke') {
            draw.context.strokeStyle = options.color;
            draw.context.stroke();
          } else {
            draw.context.fillStyle = options.color;
            draw.context.fill();
          }
        draw.context.closePath();
      draw.context.restore();
    },
    star: function(options) {
      //////////////////////////////////////////////////
      //
      //  size: icon's size (width & height)
      //
      //////////////////////////////////////////////////

      let startAngle = -Math.PI * 0.5,
          dig = (2 * Math.PI / 5) * 2;

      draw.context.save();
        draw.context.translate(options.x, options.y);
        draw.context.beginPath();

          for (let i = 0; i < 6; i++) {
            let angle = startAngle + dig * i;
            let x = Math.cos(angle) * options.size / 2;
            let y = Math.sin(angle) * options.size / 2;
            draw.context.lineTo(x, y);
          }

          if(options.coloring === 'stroke') {
  					draw.context.strokeStyle = options.color;
  					draw.context.stroke();
          } else {
  					draw.context.fillStyle = options.color;
  					draw.context.fill();
          }
        draw.context.closePath();
      draw.context.restore();
    },
    heart: function(options) {
      //////////////////////////////////////////////////
      //
      //  size: icon's size (width & height)
      //
      //////////////////////////////////////////////////

      draw.context.save();
        draw.context.translate(options.x, options.y);
        draw.context.beginPath();

          draw.context.fillStyle = COLOR_WHITE;
  				draw.context.arc(options.size/4, -options.size/4, options.size/4, Math.PI, Math.atan2(2, 2.75));
          draw.context.lineTo(0, options.size/2);
  				draw.context.arc(-options.size/4, -options.size/4, options.size/4, Math.PI-Math.atan2(2, 2.75), 2 * Math.PI);
          draw.context.strokeStyle = options.color;
          draw.context.stroke();

          if(options.coloring === 'stroke') {
            draw.context.strokeStyle = options.color;
            draw.context.stroke();
          } else {
            draw.context.fillStyle = options.color;
            draw.context.fill();
          }
        draw.context.closePath();
      draw.context.restore();
    },
    crosshair: function(options) {
      //////////////////////////////////////////////////
      //
      //  size: icon's size (width & height)
      //
      //////////////////////////////////////////////////

      options.size /= 2;
		  draw.context.save();
				draw.context.translate(options.x, options.y);
				draw.context.beginPath();

          draw.context.fillStyle = options.color;
          draw.context.fillRect(-options.size*.1, -options.size  , options.size*.2, options.size*.6);
          draw.context.fillRect(options.size*.4, -options.size*.1, options.size*.6, options.size*.2);
          draw.context.fillRect(-options.size*.1, options.size*.4, options.size*.2, options.size*.6);
          draw.context.fillRect(-options.size  , -options.size*.1, options.size*.6, options.size*.2);

        draw.context.closePath();
      draw.context.restore();
    },
    arrow: function(options) {
      options.size /= 2;
		  draw.context.save();
        draw.context.translate(options.x, options.y);
				draw.context.rotate(options.rotate);
				draw.context.beginPath();

          draw.context.fillStyle = options.color;
          draw.context.fillRect(-options.size, -options.size*.2, options.size, options.size*.4);
          draw.context.moveTo(0, -options.size*.8);
          draw.context.lineTo(options.size, 0);
          draw.context.lineTo(0, options.size*.8);
          draw.context.lineTo(0, -options.size*.8);
          draw.context.fill();

        draw.context.closePath();
      draw.context.restore();
    },
    moon: function(options) {
      //////////////////////////////////////////////////
      //
      //  size: icon's size (width & height)
      //  phase: lunar phase, shape of the illuminated(colored) portion
      //  rotate: whole icons rotate's radian
      //
      //////////////////////////////////////////////////

      options.phase %= 2;
      options.size /= 2;
      let cover_y = - options.phase * options.size;
      let node_y = -.5 * options.phase * options.size;
      let node_a_x = Math.pow(Math.pow(options.size, 2) - Math.pow(node_y, 2), .5);
      let node_b_x = - Math.pow(Math.pow(options.size, 2) - Math.pow(node_y, 2), .5);

      let cover_radian_a = draw.calcRadian(0, cover_y, node_a_x, node_y);
      let cover_radian_b = draw.calcRadian(0, cover_y, node_b_x, node_y);
      let radian_a = draw.calcRadian(0, 0, node_a_x, node_y);
      let radian_b = draw.calcRadian(0, 0, node_b_x, node_y);

		  draw.context.save();
				draw.context.translate(options.x, options.y);
				draw.context.rotate(options.rotate);
				draw.context.beginPath();

          draw.context.arc(0, cover_y, options.size, cover_radian_a, cover_radian_b);
          draw.context.moveTo(node_a_x, node_y);
          draw.context.arc(0, 0, options.size, radian_a, radian_b);

          if(options.coloring === 'stroke') {
            draw.context.strokeStyle = options.color;
            draw.context.stroke();
          } else {
            draw.context.fillStyle = options.color;
            draw.context.fill('evenodd');
          }
        draw.context.closePath();
      draw.context.restore();
    },
    shield: function(options) {
		  draw.context.save();
				draw.context.translate(options.x, options.y);
				draw.context.beginPath();

          draw.context.moveTo(-.5*options.width, -.25*options.height);
          draw.context.quadraticCurveTo(-.5*options.width, .25*options.height, 0, .5*options.height, .5*options.width);
          draw.context.quadraticCurveTo(.5*options.width, .25*options.height, .5*options.width, -.25*options.height, .5*options.width);
          draw.context.lineTo(.5*options.width, -.4*options.height);
          draw.context.quadraticCurveTo(.25*options.width, -.35*options.height, 0, -.5*options.height, .5*options.width);
          draw.context.quadraticCurveTo(-.25*options.width, -.35*options.height, -.5*options.width, -.4*options.height, .5*options.width);

          if(options.coloring === 'stroke') {
            draw.context.strokeStyle = options.color;
            draw.context.stroke();
          } else {
            draw.context.fillStyle = options.color;
            draw.context.fill('evenodd');
          }
        draw.context.closePath();
      draw.context.restore();
    },
    ring: function(options) {
      options.size /= 2;
		  draw.context.save();
				draw.context.translate(options.x, options.y);
				draw.context.beginPath();

          draw.context.lineWidth = options.thickness;
          draw.context.arc(0, 0, options.size - options.thickness / 2, 0, Math.PI * 2);

          draw.context.strokeStyle = options.color;
          draw.context.stroke();
        draw.context.closePath();
      draw.context.restore();
    },
    person: function(options) {
      options.bodySize = options.bodySize || (options.size * .05);
      options.headSize = options.headSize ? (options.headSize*.5) : (options.size * .08);
      let bodyHeight = options.size - options.headSize - options.size*.43;
		  draw.context.save();
				draw.context.translate(options.x, options.y);
				draw.context.beginPath();

        if(options.pose === 'attack1') {
          draw.context.save();
            draw.context.translate(0, (options.headSize-options.size) * .5);
            draw.context.fillStyle = options.color;
            draw.context.fillRect(-options.bodySize *.5, options.size *.1, options.bodySize, bodyHeight);
            draw.context.translate(0, options.size *.15);
            draw.context.rotate(.05*Math.PI);
            draw.context.beginPath();
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
              draw.context.rotate(-.1*Math.PI);
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
              draw.context.rotate(.05*Math.PI);
              draw.context.translate(0, bodyHeight - options.headSize*.7);
              draw.context.rotate(-.05*Math.PI);
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
              draw.context.rotate(.1*Math.PI);
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
            draw.context.closePath();
          draw.context.restore();

          draw.context.arc(0, options.headSize-options.size/2, options.headSize, 0, 2*Math.PI);
        } else {
          draw.context.save();
            draw.context.translate(0, -options.size *.5+options.headSize);
            draw.context.fillStyle = options.color;
            draw.context.fillRect(-options.bodySize *.5, options.size *.1, options.bodySize, bodyHeight - options.headSize*.3);
            draw.context.translate(0, options.size *.15);
            draw.context.rotate(.25*Math.PI);
            draw.context.beginPath();
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
              draw.context.rotate(-.5*Math.PI);
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
              draw.context.rotate(.25*Math.PI);
              draw.context.translate(0, bodyHeight - options.headSize*.7);
              draw.context.rotate(-.25*Math.PI);
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
              draw.context.rotate(.5*Math.PI);
              draw.context.fillRect(-options.bodySize *.5, 0, options.bodySize, options.size *.38);
            draw.context.closePath();
          draw.context.restore();

          draw.context.arc(0, options.headSize-options.size/2, options.headSize, 0, 2*Math.PI);
        }

				if(options.coloring === 'stroke') {
					draw.context.strokeStyle = options.color;
					draw.context.stroke();
				} else {
					draw.context.fillStyle = options.color;
					draw.context.fill();
				}
				draw.context.closePath();
			draw.context.restore();
		},
    person_active: function(options) {
      let headSize     = options.size; // 头部大小
      let bodySize     = options.size; // 身体粗细

      let torso_length = options.size; // 躯干长度
      let arm_length   = options.size; // 上臂长度
      let wrist_length = options.size; // 手腕长度
      let thigh_length = options.size; // 大腿长度
      let crus_length  = options.size; // 小腿长度

      let headPos  = [0, 0]; // 头部位置（中间）
      let neckPos  = [0, 0]; // 脖子位置
      let waistPos = [0, 0]; // 腰部位置

      let leftArmAngle    = 0; // 左手上臂角度
      let leftWristAngle  = 0; // 左手小臂角度

      let rightArmAngle   = 0; // 右手上臂角度
      let rightWristAngle = 0; // 右手小臂角度

      let leftThighAngle  = 0; // 左手大腿角度
      let leftCrusAngle   = 0; // 左手小腿角度

      let rightThighAngle = 0; // 右手大腿角度
      let rightCrusAngle  = 0; // 右手小腿角度

    },

    dashLine: function(options) {
      draw.context.save();
        draw.context.translate(options.x, options.y);
        draw.context.rotate(options.rotate);
        draw.context.beginPath();

          draw.context.moveTo(0, 0);
          draw.context.setLineDash(options.lineArr);
          draw.context.lineWidth = options.lineWidth;
          draw.context.lineTo(options.width, 0);
          draw.context.strokeStyle = options.color;
          draw.context.stroke();

        draw.context.closePath();
      draw.context.restore();
    },
    waveLine: function(options) {
      options.wavelength /= 2;
      let cur_y = options.amplitude * Math.sin(options.phase);

      draw.context.save();
        draw.context.translate(options.x, options.y);
        draw.context.rotate(options.rotate);
        draw.context.beginPath();

          draw.context.moveTo(0, options.wavelength * cur_y);
          for (let i = 0; i <= options.width; i += 1) {
            cur_y = options.amplitude * Math.sin(options.phase + i / options.wavelength);
            draw.context.lineTo(i, options.wavelength * cur_y);
          }

          draw.context.strokeStyle = options.color;
          draw.context.stroke();
        draw.context.closePath();
      draw.context.restore();
    }
  },
  start: function() {
		this.context = this.canvas.getContext("2d");

		this.canvas.width = FULL_WIDTH;
		this.canvas.height = FULL_HEIGHT;

		this.canvas.setAttribute('style', 'width:'+this.canvas.width+'px;height:'+this.canvas.height+'px;');

    this.context.lineJoin = 'round';
		this.context.fillStyle = this.bgColor;
		this.context.fillRect(0, 0, FULL_WIDTH, FULL_HEIGHT);
    let dashBoxColor = '#999';

    this.context.save();
      this.context.beginPath();
        this.context.setLineDash([5, 10]);
        this.context.moveTo(FULL_WIDTH/2, 0);
        this.context.lineTo(FULL_WIDTH/2, FULL_HEIGHT);
        this.context.moveTo(0, FULL_HEIGHT/2);
        this.context.lineTo(FULL_WIDTH, FULL_HEIGHT/2);
        this.context.lineWidth = 1;
        this.context.strokeStyle = COLOR_WHITE;
        this.context.stroke();
      this.context.closePath();
    this.context.restore();

    let distance = this.iconSize * 1.5;
    // this.shapes.CENTER({      x: FULL_WIDTH/2, y: FULL_HEIGHT / 2, size: 400, color: COLOR_WHITE });

    this.shapes.star({        x: distance * 1, y: distance, size: this.iconSize, color: COLOR_WHITE });
    this.shapes.crosshair({   x: distance * 2, y: distance, size: this.iconSize, color: COLOR_WHITE });
    this.shapes.heart({       x: distance * 3, y: distance, size: this.iconSize, color: COLOR_WHITE });
    this.shapes.arrow({       x: distance * 4, y: distance, size: this.iconSize, rotate: 0, color: COLOR_WHITE });
    this.shapes.ring({        x: distance * 5, y: distance, size: this.iconSize, thickness: 4, color: COLOR_WHITE });
    this.shapes.moon({        x: distance * 6, y: distance, size: this.iconSize, phase: .8, rotate: 1, color: COLOR_WHITE });

    this.shapes.ellipse({     x: distance * 1, y: distance * 2, width: this.iconSize, height: this.iconSize, color: COLOR_WHITE });
    this.shapes.roundedRect({ x: distance * 2, y: distance * 2, width: this.iconSize, height: this.iconSize, radius: 5, color: COLOR_WHITE });
    this.shapes.shield({      x: distance * 3, y: distance * 2, width: this.iconSize, height: this.iconSize, color: COLOR_WHITE });

    this.shapes.dashLine({   x: distance * 1 - this.iconSize / 2 , y: distance * 3, width: this.iconSize * 2, lineWidth: 2, lineArr: [6, 3], rotate: 0, color: COLOR_WHITE });
    this.shapes.waveLine({   x: distance * 3 - this.iconSize / 2 , y: distance * 3, width: this.iconSize * 2, wavelength: this.iconSize / 4, amplitude: 1, phase: 0, rotate: 0, color: COLOR_WHITE });

    // this.shapes.person({      x: FULL_WIDTH/2, y: FULL_HEIGHT / 2, size:400, pose: 'attack1', color: COLOR_WHITE });
    this.shapes.person({      x: distance * 1, y: distance * 4.5, size: this.iconSize*2, color: COLOR_WHITE });
    this.shapes.person({      x: distance * 3, y: distance * 4.5, size: this.iconSize*2, pose: 'attack1', color: COLOR_WHITE });

    // this.shapes.dashBox({ x: distance * 1,        y: distance * 4.5,     width: this.iconSize*2,     height: this.iconSize*2, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 3,        y: distance * 4.5,     width: this.iconSize*2,     height: this.iconSize*2, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: FULL_WIDTH/2, y: FULL_HEIGHT / 2,     width: 400,     height: 400, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    //



    // this.shapes.dashBox({ x: distance,        y: distance,     width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 2,    y: distance,     width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 3,    y: distance,     width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 4,    y: distance,     width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 5,    y: distance,     width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 6,    y: distance,     width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    //
    // this.shapes.dashBox({ x: distance * 1,    y: distance * 2, width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 2,    y: distance * 2, width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 3,    y: distance * 2, width: this.iconSize,     height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    //
    // this.shapes.dashBox({ x: distance * 1.35, y: distance * 3, width: this.iconSize * 2, height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});
    // this.shapes.dashBox({ x: distance * 3.35, y: distance * 3, width: this.iconSize * 2, height: this.iconSize, lineWidth: 1, lineArr: [5, 1], color: dashBoxColor});

  }
};

draw.start();
