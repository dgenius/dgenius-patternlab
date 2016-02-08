var mockPackage = require('../mocks/mock-package');
var Dgeni = require('dgeni');

var mockDoc = function(name, docType) {
	return {
		name: name,
		docType: docType
	}
};

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

	describe('set type priority', function() {
		var doc;

		beforeEach(function() {
			docs = [
				mockDoc('$log', 'service'),
				mockDoc('myButton', 'directive'),
				mockDoc('myButton#onClick', 'function')
			];
		});

		it('to "00" by default', function() {
			processor.$process(docs);

			docs.forEach(function(doc) {
				expect(doc.pattern.priority.type).toEqual('00');
			});
		});

		it('to what the processor is set to', function() {
			processor.typePriority = '123';
			processor.$process(docs);

			docs.forEach(function(doc) {
				expect(doc.pattern.priority.type).toEqual(processor.typePriority);
			});
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
			module: '00',
			provider: '01',
			service: '02',
			directive: '03',
			filter: '04',
			other: '05',
			unknown: '05'
		};

		for (var fixture in fixtures) {
			docs.push(mockDoc(Math.random().toString(36).substring(7), fixture));
		}

		processor.$process(docs);

		docs.forEach(function(doc) {
			expect(doc.pattern.subType).toEqual(doc.docType + 's');
			expect(doc.pattern.priority.subType).toEqual(fixtures[doc.docType]);
		});
	});
});
