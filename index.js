var path = require('canonical-path');
var Package = require('dgeni').Package;

module.exports = new Package('dgenius-patternlab', [
	require('dgeni-packages/ngdoc')
])
.factory(require('./services/encode-code-block'))
// Add Parternlab related metadata
.processor(require('./processors/pattern-docs'))
// Configure templates rendering
.config(function(templateFinder, computePathsProcessor) {
	templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

	computePathsProcessor.pathTemplates.push({
		docTypes: ['provider', 'service', 'directive', 'input', 'object', 'function', 'filter', 'type'],
		pathTemplate: '/patterns/${pattern.type}/${pattern.subType}/${name}.html',
		outputPathTemplate: '${pattern.type}/${pattern.subType}/${name}.html'
	});
	computePathsProcessor.pathTemplates.push({
		docTypes: ['module'],
		pathTemplate: '/patterns/${pattern.type}/${pattern.subType}/${name}.html',
		outputPathTemplate: '${pattern.type}/${pattern.subType}/${name}.html'
	});
	computePathsProcessor.pathTemplates.push({
		docTypes: ['componentGroup'],
		getPath: function() {},
		getOutputPath: function() {}
	});
});
