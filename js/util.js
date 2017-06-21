function comfirmFn(params) {

	var maskDiv = document.getElementById("mask");
	var comfirmDiv = document.getElementById("comfirm");
	var title = params.title || "提示";
	var content = params.content;
	var closeFn = function() {

		maskDiv.style.display = "none";
		comfirmDiv.style.display = "none";
		cancelBtn.removeEventListener("click", cancelFn);
		okBtn.addEventListener("click", okFn);
	};
	var cancelFn = function() {
		params.cancelFn && params.cancelFn();
		closeFn();
	} || closeFn;
	var okFn = function() {
		params.okFn && params.okFn();
		closeFn();
	} || closeFn;
	var titleDiv = comfirmDiv.getElementsByClassName("title")[0];
	var contentDiv = comfirmDiv.getElementsByClassName("content")[0];
	var cancelBtn = comfirmDiv.getElementsByClassName("cancel")[0];
	var okBtn = comfirmDiv.getElementsByClassName("ok")[0];
	titleDiv.innerHTML = title;
	contentDiv.innerHTML = content;
	cancelBtn.addEventListener("click", cancelFn.bind(this));
	okBtn.addEventListener("click", okFn.bind(this));
	maskDiv.style.display = "block";
	comfirmDiv.style.display = "block";
}
function alertFn(params) {
	
	if(typeof(params) == 'string') {
		var title = "提示";
		var content = params;
	} else if(typeof(params) == 'object') {
		var title = params.title || "提示";
		var content = params.content;
	}
	var maskDiv = document.getElementById("mask");
	var msgDiv = document.getElementById("msg");
	var closeFn = function() {

		maskDiv.style.display = "none";
		msgDiv.style.display = "none";
		okBtn.addEventListener("click", okFn);
		maskDiv.removeEventListener("click", closeFn);
	};
	var okFn = function() {
		params.okFn && params.okFn();
		closeFn();
	} || closeFn;
	var titleDiv = msgDiv.getElementsByClassName("title")[0];
	var contentDiv = msgDiv.getElementsByClassName("content")[0];
	var okBtn = msgDiv.getElementsByClassName("ok")[0];
	titleDiv.innerHTML = title;
	contentDiv.innerHTML = content;
	okBtn.addEventListener("click", okFn.bind(this));
	maskDiv.addEventListener("click", closeFn);
	maskDiv.style.display = "block";
	msgDiv.style.display = "block";
}
/**
 * 获得uuid字符串
 * @private
 */
function _getUuid_() {

	var createUUID = (function(uuidRegEx, uuidReplacer) {
		return function() {
			return "xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
		};
	})(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == "x" ? r : (r & 3 | 8);
		return v.toString(16);
	});
	return createUUID();
}
Array.prototype.remove=function(dx) { 
	
  if(isNaN(dx)||dx>this.length) {return false;} 
  
  for(var i=0,n=0;i<this.length;i++) { 
  	
    if(this[i]!=this[dx]) { 
      this[n++]=this[i] 
    } 
  } 
  this.length-=1 
} 