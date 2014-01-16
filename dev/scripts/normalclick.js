/*jslint browser:true*/
/*global define*/

(function(factory) {
	if (typeof define !== 'undefined' && define.amd) {
		define(['jquery'], factory);
	} else {
		window.NormalClick = factory(window.jQuery);
	}
}(function($) {

	var NormalClick = {
		startX: null,
		startY: null,
		target: null,

		moveDist: 10,

		attachTrigger: function(selector) {
			var $selector = $(selector);
			$selector.bind('touchstart', NormalClick.onStart);
			NormalClick.Ghost.init();
		},

		onStart: function(event) {
			if (NormalClick.target) {
				NormalClick.reset();
			}

			var touches = event.originalEvent.touches;
			if (touches.length > 1) { // don't do anything if there's multiple fingers (pinch zoom or whatnot)
				return;
			}
			var touch = touches[0];

			NormalClick.startX = touch.pageX;
			NormalClick.startY = touch.pageY;
			NormalClick.target = event.target;

			$(NormalClick.target).on('touchmove', NormalClick.onMove);
			$(NormalClick.target).on('touchend', NormalClick.onEnd);
			$(NormalClick.target).on('touchcancel', NormalClick.onCancel);
		},

		onMove: function(event) {
			var target = event.target;
			var maxDist = NormalClick.moveDist;
			var touch = event.originalEvent.touches[0];
			var abs = Math.abs;
			var deltaX = abs(touch.pageX - NormalClick.startX);
			var deltaY = abs(touch.pageY - NormalClick.startY);
			if (target !== NormalClick.target || deltaX > maxDist || deltaY > maxDist) {
				NormalClick.reset();
			}
		},

		onCancel: function() {
			NormalClick.reset();
		},

		reset: function() {
			$(NormalClick.target).off('touchmove', NormalClick.onMove);
			$(NormalClick.target).off('touchend', NormalClick.onEnd);
			$(NormalClick.target).off('touchcancel', NormalClick.onCancel);
		},

		onEnd: function(event) {
			NormalClick.reset();

			var touch = event.originalEvent.changedTouches[0];
			var x = touch.pageX - window.pageXOffset;
			var y = touch.pageY - window.pageYOffset;

			var target = document.elementFromPoint(x, y) || event.target;

			if (target !== NormalClick.target) {
				return;
			}

			$(target).trigger('click', event);
			NormalClick.Ghost.prevent(touch.pageX, touch.pageY);
		},

		Ghost: {
			coords: [],
			popWait: 2500,
			// the click event might not be fired at the same position as we fired
			dist: 10,
			inited: false,

			init: function() {
				if (!NormalClick.Ghost.inited) {
					NormalClick.Ghost.inited = true;
					document.body.addEventListener('click', NormalClick.Ghost.onClick, true);
				}
			},

			pop: function() {
				NormalClick.Ghost.coords.splice(0, 2);
			},

			onClick: function(event) {
				var coords = NormalClick.Ghost.coords;
				var abs = Math.abs;
				var pX = event.pageX;
				var pY = event.pageY;
				var dist = NormalClick.Ghost.dist;
				for (var i = 0, l = coords.length; i < l; i += 2) {
					var x = coords[i];
					var y = coords[i + 1];
					if (abs(pX - x) < dist || abs(pY - y) < dist) {
						event.stopPropagation();
						event.preventDefault();
					}
				}
			},

			prevent: function(x, y) {
				NormalClick.Ghost.coords.push(x, y);
				window.setTimeout(NormalClick.Ghost.pop, NormalClick.Ghost.popWait);
			}
		}
	};

	return NormalClick;
}));