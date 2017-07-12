/**
 * my js library
 *
 */
function $(v){
	if(typeof v==='function'){
		window.onload=v;
	}else if(typeof v==='string'){
		return document.getElementById(v);
	}else if(typeof v==='object'){
		return v;
	}
}

function getStyle(obj,attr){
	attr=attr.trim();
	if($(obj).currentStyle){
			//why here use []?
			return $(obj).currentStyle[attr];
		}else{
			return getComputedStyle($(obj))[attr];
		}
}

function getId(id){
	return document.getElementById(id);
}

function getClassName(className) {
	return document.getElementsByClassName(className)[0];
}

function getTagName(tagName){
	return document.getElementsByTagName(tagName);
}