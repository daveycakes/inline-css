'use strict';

/**
 * Takes interpolation options and removes them from parsing, adding them back at the end.
 *
 * 
 */

 module.exports = function(src,inter){
 	var i = {
 		protected: inter,
 		src: src,
 		replacePairs : [],
 		protect: function(src,inter){
 			var count = 0;
 			i.replacePairs = [];
 			inter.forEach(function(obj){
 				var swapString = 'swapString_'+count++;
 				src = src.replace(obj, swapString);
 				i.replacePairs.push({
 					original: obj,
 					swapString: swapString
 				});
 			});
 			return {
 				src: src,
 				replacePairs: i.replacePairs
 			};
 		},
 		unProtect : function(src,pairs){
 			pairs.forEach(function(pair){
 				src = src.replace(pair.swapString, pair.original);
 			});
 			return src;
 		}


 	};

 	return i;
 };