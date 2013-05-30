/*
 * jQuery Scout Translators
 * Encodes characters of a string into Morse Code and vice versa, and others Boy Scout Codifications
 *
 * Morse Code: Copyright (c) 2010, Murilo Santana <mvrilo@gmail.com>
 * Cenit-Polar, Murcielago, Romana, +1, -1, SUFAMELICO:
 * Copyright (c) 2013, Rodrigo Castro <r.kstro15@gmail.com> 
 * Licensed under GPL <http://www.gnu.org/licenses/gpl.html>
 *
 * Example:
 *	$.morse('test', 'encode');	// to decode a string just change the second argument to 'decode'
 *	$.morse('test');	// 'encode' is default
 * Returns:
 *	 -/./.../-/
 *  
 *  $.cenit('cenit');
 * Returns:
 *  polar
 */

(function($){
	$.extend({
		morse : function(string, option){

			// All characters based on Wikipedia <http://en.wikipedia.org/wiki/Morse_code#Letters.2C_numbers.2C_punctuation>
			var key = [' ','.',',','?',"'",'!','/','(',')','&',	// special chars
			':',';','=','+','-','_','"','$','@',			// special chars
			'0','1','2','3','4','5','6','7','8','9',		// numbers
			'ä','å','ç','š','ð','ś','ł','é','ñ','ŝ','þ','ü',	// few non-latin letters
			'a','b','c','d','e','f','g','h','i','j','k','l','m',	// letters
			'n','o','p','q','r','s','t','u','v','w','x','y','z'];	// letters

			var val = ['/','.-.-.-','--..--','..--..','.----.','-.-.--','-..-.','-.--.','-.--.-','.-...',	// special chars
			'---...','-.-.-.','-...-','.-.-.','-....-','..--.-','.-..-.','...-..-','.--.-.',		// special chars
			'-----','.----','..---','...--','....-','.....','-....','--...','---..','----.',		// numbers
			'.-.-','.--.-','-.-..','----','..--.','...-...','.-..-','..-..','--.--','...-.','.--..','..--',	// few non-latin letters
			'.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..','--',			// letters
			'-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..'];		// letters
			
			var str = string.toLowerCase();
			var enc = str.match(/[\-\.\s]+/g); //str.match(/[\-\.\/]+/g);
			var res = '&nbsp;';

			if (str.length === 0){
				return false;
			}

			if (option === "encode" || option === undefined){
				$.each(str, function(index,value){
					var i = $.inArray(value, key);
					res += val[i];
					if(val[i]!="/") res += '/';
				});

				if (res.match(/undefined/gi)){
					res = '&nbsp;';
				}
			}
			else if (option === "decode"){
				$.each(str.split("//"), function(index_, value_){
					if (!str.match(/[^\.\s\-\/]+/g)){
						$.each($.trim(value_).match(/[\-\.\s]+/g), function(index, value){
							console.log(value);
							var i = $.inArray(value, val);
							res += key[i];
							if (res.match(/undefined/gi)){
								res = '&nbsp;';
							}
						});
						res += ' ';
					}
				});
			}
			else {
				res = 'error';
			}

			return $.trim(res);
		},

		_abstractTranslate: function(diccioario, string){
			//var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@ .,¿?:-¡!ñÑ\n";
			var letters = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
															"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
															"0","1","2","3","4","5","6","7","8","9",
															"@"," ",".",",","¿","?",":","-","¡","!","ñ","Ñ","\n");

			var res = '';
			for(count = 0; count < string.length; count++) {
				daChar = string.charAt(count);
				for (i = 0; i < letters.length; i++) {
					if (daChar == letters[i]) { //charAt
						res += diccioario[i];
						break;
					}
				}
			}

			return res;
		},

		cenit: function(string){
			var polar   = new Array("i","b","p","d","o","f","g","h","a","j","k","n","m","l","e","c","q","t","s","r","u","v","w","x","y","z","I","B","P","D","O","F","G","H","A","J","K","N","M","L","E","C","Q","T","S","R","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","@"," ",".",",","¿","?",":","-","¡","!","ñ","Ñ","\n");
			return this._abstractTranslate(polar, string);
		},
		
		murcielago: function(string){
			var murci   = new Array("7","b","3","d","5","f","8","h","4","j","k","6","0","n","9","p","q","2","s","t","1","v","w","x","y","z","7","b","3","d","5","f","8","h","4","j","k","6","0","n","9","p","q","2","s","t","1","v","w","x","y","z","m","u","r","c","i","e","l","a","g","o","@"," ",".",",","¿","?",":","-","¡","!","ñ","Ñ","\n");
			return this._abstractTranslate(murci, string);
		},
		
		romana: function(txt){
			txt = txt.toLowerCase();
			var out = '';
			var romanaSet = [[  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
											 [  'I', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
											 [ 'II', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q'],
											 ['III', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']];

			for(let=0; let<txt.length; let++){
				var flag = true;
				for(j=1; j<4; j++){
					for(i=1; i<10; i++){
						if(txt.charAt(let) == romanaSet[j][i]) {
							out += romanaSet[0][i]+romanaSet[j][0]+'/';
							flag = false;
							break;
						}
					}
				}
				if(flag) out += txt.charAt(let);
			}

			return out;
		},

		plusOne: function(string){
			var pOne   = new Array("b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","p","q","r","s","t","u","v","w","x","y","z","a",
														 "B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","P","Q","R","S","T","U","V","W","X","Y","Z","A",
														 "0","1","2","3","4","5","6","7","8","9",
														 "@"," ",".",",","¿","?",":","-","¡","!","o","O","\n");
			return this._abstractTranslate(pOne, string);
		},

		minusOne: function(string){
			var mOne   = new Array("z","a","b","c","d","e","f","g","h","i","j","k","l","m","ñ","o","p","q","r","s","t","u","v","w","x","y",
														 "Z","A","B","C","D","E","F","G","H","I","J","K","L","M","Ñ","O","P","Q","R","S","T","U","V","W","X","Y",
														 "0","1","2","3","4","5","6","7","8","9",
														 "@"," ",".",",","¿","?",":","-","¡","!","n","N","\n");
			return this._abstractTranslate(mOne, string);
		},

		sufamelico: function(string){
			var sufa = new Array("f","b","o","d","m","a","g","h","l","j","k","i","e","n","c","p","q","r","u","t","s","v","w","x","y","z",
													 "F","B","O","D","M","A","G","H","L","J","K","I","E","N","C","P","Q","R","U","T","S","V","W","X","Y","Z",
													 "0","1","2","3","4","5","6","7","8","9",
													 "@"," ",".",",","¿","?",":","-","¡","!","ñ","Ñ","\n");
			return this._abstractTranslate(sufa, string);
		}

	});
})(jQuery);