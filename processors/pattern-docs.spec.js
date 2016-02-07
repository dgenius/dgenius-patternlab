var mockPackage = require('../mocks/mock-package');
var Dgeni = require('dgeni');

var mockDoc = function(name, docType) {
	return {
		name: name,
		docType: docType
	}
}

describe("angularPatternDocs", function() {
	var processor;

	beforeEach(function() {
		var dgeni = new Dgeni([mockPackage()]);
		var injector = dgeni.configureInjector();
		processor = injector.get('angularPatternDocs');
	});

	describe('run', function() {
		it('before computing-paths processor', function() {
			expect(processor.$runBefore).toEqual(['computing-paths']);
		});
		it('after generateComponentGroupsProcessor processor', function() {
			expect(processor.$runAfter).toEqual(['generateComponentGroupsProcessor']);
		});
	});

	it('add patternlab metadata', function() {
		var docs = [
			mockDoc('$log', 'service'),
			mockDoc('myButton', 'directive'),
			mockDoc('myButton#onClick', 'function')
		];

		processor.$process(docs);

		docs.forEach(function(doc) {
			expect(doc.pattern).toBeDefined();
		});
	});

	it('assign document name as pattern name', function() {
		var docs = [
			mockDoc('$log', 'service'),
			mockDoc('myButton', 'directive'),
			mockDoc('myButton#onClick', 'function')
		];

		processor.$process(docs);

		docs.forEach(function(doc, index) {
			expect(doc.pattern.name).toEqual(docs[index].pattern.name);
		});
	});

	it('dispatch pattern subtype priority correctly', function() {
		var docs = [];
		var fixtures = {
			module: '00-modules',
			provider: '01-providers',
			service: '02-services',
			directive: '03-directives',
			filter: '04-filters',
			other: '05-others',
			unknown: '05-unknowns'
		};

		for (var docType in fixtures) {
			docs.push(mockDoc(Math.random().toString(36).substring(7), docType));
		};

		processor.$process(docs);

		docs.forEach(function(doc) {
			expect(doc.pattern.subType).toEqual(fixtures[doc.docType]);
		});
	})
});
