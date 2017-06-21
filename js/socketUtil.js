(function() {
	function PlayerAction() {}

	PlayerAction.prototype = {
		LEFT: 0,
		RIGHT: 1,
		UP: 2,
		BOTTOM: 3,
		unmask: function(index) {
			
			socket.emit("unmask", {message: index});
		},
		select: function(index) {
			
			socket.emit("select", {message: index});
		},
		eat: function(index, ) {
			
			socket.emit("select", {message: index});
		},
		go: function(index, dir) {
			
			switch(dir) {
				case this.LEFT: 
				break;
				case this.RIGHT: 
				break;
				case this.UP: 
				break;
				case this.BOTTOM: 
				break;
			}
		}
	};
	window.playerAction = new PlayerAction();
})();
