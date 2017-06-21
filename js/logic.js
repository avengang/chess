screenWidth = document.body.scrollWidth;
screenHeight = document.body.scrollHeight;
document.getElementById("game").style.height = screenHeight+"px";
document.getElementById("game").style.width = screenWidth+"px";
var chess = document.getElementById("chess");
chess.style.borderRadius = "10px";
chess.width = screenWidth-30;
chess.height = screenWidth-30;
var bgDiv = document.getElementById("bg");
bgDiv.style.borderRadius = "10px";
bgDiv.width = screenWidth-30;
bgDiv.height = screenWidth-30;
var deltaTime = 0;
var lastTime = 0;
var w = screenWidth-30;
var chessWidth = w/5;
var context = chess.getContext("2d");
var bgContext = bgDiv.getContext("2d");

var drawBroad = function() {
	
	bgContext.save();
	bgContext.strokeStyle = "#BFBFBF";
	
	for(var i=0; i<5; i++) {
		bgContext.moveTo(chessWidth/2 + i*chessWidth, chessWidth/2);
		bgContext.lineTo(chessWidth/2 + i*chessWidth, chessWidth*4.5);
		bgContext.stroke();
		bgContext.moveTo(chessWidth/2, chessWidth/2 + i*chessWidth);
		bgContext.lineTo(chessWidth*4.5, chessWidth/2 + i*chessWidth);
		bgContext.stroke();
	}
	bgContext.restore();
};
var drawChess = function(i, j, level, isBlack, selected, mask) {
	
	if(level >= 0) {
		context.save();
		context.beginPath();
		context.arc(chessWidth/2+i*chessWidth, chessWidth/2+j*chessWidth, chessWidth/2-8, 0, 2*Math.PI);
		context.closePath();
		var gradient = context.createRadialGradient(chessWidth/2+i*chessWidth+2, chessWidth/2+j*chessWidth-2, chessWidth/2, chessWidth/2+i*chessWidth+2, chessWidth/2+j*chessWidth-2, 0);
		
		if(mask) {
			gradient.addColorStop(0, "cornflowerblue");
			gradient.addColorStop(1, "lightblue");
		} else if(selected) {
			gradient.addColorStop(0, "red");
			gradient.addColorStop(1, "orange");
		} else if(isBlack) {
			gradient.addColorStop(0, "#0A0A0A");
			gradient.addColorStop(1, "#636766");
		} else {
			gradient.addColorStop(0, "#D1D1D1");
			gradient.addColorStop(1, "#F9F9F9");
		}
		context.fillStyle = gradient;
		context.fill();
		context.restore();
	}
	
	if(!mask) {
		drawChessText(i, j, level, isBlack, selected);
	}
};
var drawChessText = function(i, j, level, isBlack, selected, drawGeographic) {

	context.save();

	if(drawGeographic) {
		context.font="20px Georgia";
		context.fillStyle = "#BFBFBF";

        if(i == 1) {
            context.fillText("山", chessWidth/2+i*chessWidth-10, chessWidth/2+j*chessWidth+6);
        } else if(i == 2) {
            context.fillText("水", chessWidth/2+i*chessWidth-10, chessWidth/2+j*chessWidth+6);
        } else if(i == 3) {
            context.fillText("洞", chessWidth/2+i*chessWidth-10, chessWidth/2+j*chessWidth+6);
        }
	} else {
		context.font="20px Georgia";

		if(selected) {
			context.fillStyle = "blueviolet";
		} else {

			if(isBlack) {
				context.fillStyle = "#BFBFBF";
			} else {
				context.fillStyle = "#333333";
			}
		}
		var texts =["鼠", "猫", "狗", "狼", "豹", "虎", "狮", "象", "红", "猎"];
		var text = "";
        context.fillText(texts[level], chessWidth/2+i*chessWidth-10, chessWidth/2+j*chessWidth+6);
    }
	context.restore();
};
function getChessInfo(chessInfo, m, n) {

	for(var i=0,ii=chessInfo.length;i<ii;i++) {

		if(chessInfo[i].i==m && chessInfo[i].j==n) {
			return i;
		}
	}
	return undefined;
};
chess.onclick = function(e) {

	if(!user.myTurn) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/chessWidth);
	var j = Math.floor(y/chessWidth);
	var index = getChessInfo(chessInfo, i, j);
	socket.emit("gaming", {index: index, i: i, j: j});
};
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();
function gameStart() {
	
	var bg = new Image();
	bg.src = "img/bg.png";
	var me = this;
	bg.onload = function() {
		
		bgContext.drawImage(bg, 0, 0, screenWidth, screenWidth);
		drawBroad();
        var nowTime = null;
        var deltaTime = 0;
        var lastTime = null;

		//需要刷新的游戏界面
		var gameLoop = function() {
			
			context.clearRect(0, 0, screenWidth-30, screenWidth-30);
		    window.stopGameLoop = window.requestAnimFrame(gameLoop); // setInterval, setTimeout
		    nowTime = Date.now();
		    deltaTime = nowTime - lastTime;
		    
		    if (deltaTime > 30) {
		        deltaTime = 30;
		    }
		    lastTime = nowTime;
			drawChessText(0, 2, -1, false, false, true);
			drawChessText(1, 2, -1, false, false, true);
			drawChessText(2, 2, -1, false, false, true);
			drawChessText(3, 2, -1, false, false, true);
			drawChessText(4, 2, -1, false, false, true);

		    for(var i=0,ii=chessInfo.length;i<ii;i++) {
		    	var chess = chessInfo[i];
		    	drawChess(chess.i, chess.j, chess.level, chess.isBlack, chess.selected, chess.mask);
		    }
		};
		gameLoop();
	}
}

