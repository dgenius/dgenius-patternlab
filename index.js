var path = require('canonical-path');
var Package = require('dgeni').Package;

module.exports = new Package('dgenius-patternlab', [
	require('dgeni-packages/ngdoc')
])
.factory(require('./services/encode-code-block'))
// Add Parternlab related metadata
.processor(require('./processors/pattern-docs'))
.processor(require('./processors/pattern-data-docs'))
// Configure templates rendering
.config(function(templateFinder, computePathsProcessor) {
	templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

	computePathsProcessor.pathTemplates.push({
		docTypes: ['provider', 'service', 'directive', 'input', 'object', 'function', 'filter', 'type'],
		pathTemplate: '{{ link.${pattern.type}-${name} }}',
		outputPathTemplate: '${pattern.outputFolder}/${pattern.priority.type}-${pattern.type}/${pattern.priority.subType}-${pattern.subType}/${name}.mustache'
	});
	computePathsProcessor.pathTemplates.push({
		docTypes: ['module'],
		pathTemplate: '{{ link.${pattern.type}-${name} }}',
		outputPathTemplate: '${pattern.outputFolder}/${pattern.priority.type}-${pattern.type}/${pattern.priority.subType}-${pattern.subType}/${name}.mustache'
	});
	computePathsProcessor.pathTemplates.push({
		docTypes: ['componentGroup'],
		getPath: function() {},
		getOutputPath: function() {}
	});
	computePathsProcessor.pathTemplates.push({
		docTypes: ['pattern-data'],
		getPath: function() {},
		outputPathTemplate: '${pattern.outputFolder}/${pattern.priority.type}-${pattern.type}/${pattern.priority.subType}-${pattern.subType}/${name}.json'
	});
});
