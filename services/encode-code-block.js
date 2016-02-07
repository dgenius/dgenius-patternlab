var encoder = new require('node-html-encoder').Encoder();

/**
 * @dgProcessor encodeCodeBlock
 * @description
 * Wraps a block of cod within an HTML code tag. This module override the encodeCodeBlock
 * processor within dgeni-packages/base to add support for language highlight.
 */
module.exports = function encodeCodeBlock() {
	return function(str, inline, lang) {
		// Encode any HTML entities in the code string
		str = encoder.htmlEncode(str, true);

		// If a language is provided then attach a CSS classes to the code element
		// For instance: language-<lang> and <lang> to accomodate all syntax hightlighters.
		lang = lang ? ' class="language-' + lang + ' ' + lang + '" data-language="' + lang + '"' : '';

		str = '<code' + lang + '>' + str + '</code>';

		// If not inline then wrap the code element in a pre element
		if ( !inline ) {
		  str = '<pre>' + str + '</pre>';
		}

		return str;
	};
};
