var socket = io.connect('http://112.74.199.52:8080/');
var user = {
	isBlack: true,
	selectChess: null,
	myTurn: false
};
var mountainArr = [];//能上山的列表
var waterArr = [];//等淌水的列表
var holeArr = [];//能进洞的列表
var chessInfo = [];
var friendName = "";
function login() {

	var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;
	socket.emit("login", {name: name, password: password});
}
socket.on("loginSuccess", function(data) {

	document.getElementById('login').style.display = "none";
	document.getElementById('choose').style.display = "block";
});
socket.on("loginError", function(data) {

	alertFn(data.reason);
});
function invite() {
	
	var name = document.getElementById("friendName").value;
	socket.emit("invite", {name: name});
}
socket.on("invite", function(data) {

	comfirmFn({
		content: data.name+"邀请你对战！",
		okFn: function() {
			socket.emit("inviteOK", {name: data.name});
		},
		cancelFn: function() {
			socket.emit("inviteNO", {name: data.name});
		}
	});
});
socket.on("inviteError", function(data) {

	alertFn(data.reason);
});
socket.on("inviteNO", function(data) {

	alertFn("对方拒绝了你的邀请!");
});
function match() {
	
console.log("匹配");
	socket.emit("match");
}
socket.on("matchError", function(data) {
	
	alertFn(data.reason);
});
socket.on("init", function(data) {

console.log(data);
	document.getElementById("choose").style.display = "none";
	document.getElementById("game").style.display = "block";
	user = data.user;
	chessInfo = data.chessInfo;
	otherName = data.otherName;
	gameStart();
});
socket.on("gaming", function(data) {
	
console.log(data);
	user.myTurn = data.myTurn;
	gaming(chessInfo, data.index, data.gameUser, data.i, data.j, function () {

		if(!data.isSelect) {
			user.myTurn = !user.myTurn;
		}
	}, function(isBlackSuccess) {
		
		
	});
});
socket.on("win", function(data) {
	alertFn("你赢了");
});
socket.on("fail", function(data) {
	alertFn("你输了");
});