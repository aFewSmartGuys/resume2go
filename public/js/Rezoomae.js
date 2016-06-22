var Rezoomae = (function() {
	"use strict";

	var parseElement = document.createElement('div');

	return {
		utils: {
			parseHTML: function(text) {
				var frag;
				parseElement.innerHTML = text;
				if(parseElement.childNodes.length > 1){
					frag = document.createDocumentFragment();
					[].slice.call(parseElement.childNodes).forEach(frag.appendChild.bind(frag));
					return frag;
				}else{
					return parseElement.firstChild;
				}
			},
			spacesToUnderscores: function(str) {
				if (typeof str === "string") {
					return str.split(" ").join("_");
				} else {
					console.log("weird object passed to spacesToUnderscores");
					return str;
				}
			}
		},
		classes: {

		}
	};
}());
