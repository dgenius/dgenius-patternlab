var Package = require('dgeni').Package;
var mockLog = require('dgeni/lib/mocks/log');

module.exports = function mockPackage(docs) {
	return new Package('mockPackage', [require('../')])
		// provide a mock log service
		.factory('log', function() {
			return mockLog(false);
		})
		.config(function(readFilesProcessor, writeFilesProcessor, renderDocsProcessor, unescapeCommentsProcessor) {
			readFilesProcessor.$enabled = false;
			writeFilesProcessor.$enabled = false;
			renderDocsProcessor.$enabled = false;
			unescapeCommentsProcessor.$enabled = false;
		});
};
