var CENTER_X = 437;  
var CENTER_Y = 256;  
var RADIUS = 30;  
var CUTTER_SIZE = 46; 
var EDGE_SIZE = 8;
var START_ANGLE = -90;
var END_ANGLE = 90;
var ANGLE_INCREASEMENT = 30;

var generate = () => {
	var positions = {};  
	for(var _angle = START_ANGLE; _angle <= END_ANGLE; _angle += ANGLE_INCREASEMENT){  
		positions[_angle] = {};

		var angle = _angle * Math.PI / 180;
		var points = positions[_angle];

		//start point
		points.startCenter = {
			x: Math.round(CENTER_X - (Math.cos(angle) * RADIUS)),
			y: Math.round(CENTER_Y - (Math.sin(angle) * RADIUS))
		};

		//Edge Start point
		points.edgeCenter = {
			x: Math.round(CENTER_X - (Math.cos(angle) * (RADIUS + CUTTER_SIZE))),
			y: Math.round(CENTER_Y - (Math.sin(angle) * (RADIUS + CUTTER_SIZE)))
		};
		
		var esx = Math.round(Math.sin(angle) * EDGE_SIZE);
		var esy = -Math.round(Math.cos(angle) * EDGE_SIZE);
		
		points.start = {
			x: points.startCenter.x + esx,
			y: points.startCenter.y + esy
		}
		points.edgeStart = {
			x: points.edgeCenter.x + esx,
			y: points.edgeCenter.y + esy
		};

		points.edgeEnd = {
			x: points.edgeCenter.x - esx,
			y: points.edgeCenter.y - esy
		};
		
		points.end = {
			x: points.startCenter.x - esx,
			y: points.startCenter.y - esy
		};
	}

	Object.values = (v) => Object.keys(v).map((k) => v[k]);

	return Object.values(positions).reduce((prev, curr) => {  
		return `${prev + '\n'}<path d="M ${curr.start.x},${curr.start.y} L ${curr.edgeStart.x},${curr.edgeStart.y} L ${curr.edgeEnd.x},${curr.edgeEnd.y} L ${curr.end.x},${curr.end.y} Z" fill="#fff"/>`;
	}, '');
};

console.log(generate());