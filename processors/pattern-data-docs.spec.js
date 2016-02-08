var mockPackage = require('../mocks/mock-package');
var Dgeni = require('dgeni');

var mockDoc = function(name, docType, hasPattern) {
    var doc = {
        name: name,
        docType: docType
    };

    if (hasPattern) {
        doc.pattern = {
            priority: {
                type: '00',
                subType: '01'
            },
            type: 'angular',
            subType: docType + 's',
            name: name
        };
    }

    return doc;
};

describe("angularPatternDataDocs", function () {
    var processor;

    beforeEach(function() {
        var dgeni = new Dgeni([mockPackage()]);
        var injector = dgeni.configureInjector();
        processor = injector.get('angularPatternDataDocs');
    });

    describe('run', function() {
        it('before computing-paths processor', function () {
            expect(processor.$runBefore).toEqual(['computing-paths']);
        });
        it('after angularPatternDocs processor', function () {
            expect(processor.$runAfter).toEqual(['angularPatternDocs']);
        });
    });

    describe('create pattern data only', function() {
        it('for document which have pattern property', function () {
            var docs = [
                mockDoc('doc1', 'type1', false),
                mockDoc('doc2', 'type2', true),
                mockDoc('doc3', 'type3', false)
            ];

            processor.data = {
                hello: 'world',
                foo: 'bar'
            };
            processor.$process(docs);

            expect(docs.length).toEqual(4);
        });
        it('if data is not empty', function () {
            var docs = [mockDoc('doc1', 'type1', true)];

            processor.$process(docs);

            expect(docs.length).toEqual(1);

            processor.data = {
                hello: 'world',
                foo: 'bar'
            };
            processor.$process(docs);

            expect(docs.length).toEqual(2);
        });
    });

    it('encapsulate the pattern properties', function() {
        var docs = [
            mockDoc('doc1', 'type1', true)
        ];

        processor.data = {
            hello: 'world',
            foo: 'bar'
        };
        processor.$process(docs);

        expect(docs[1].id).toEqual(docs[0].name + '-pattern-data');
        expect(docs[1].name).toEqual(docs[0].name + '-pattern-data');
        expect(docs[1].pattern).toEqual(docs[0].pattern);
    });

    it('add globaly defined data', function() {
        var docs = [
            mockDoc('doc1', 'type1', true),
            mockDoc('doc2', 'type2', false),
            mockDoc('doc3', 'type3', true)
        ];

        processor.data = {
            hello: 'world',
            foo: 'bar'
        };
        processor.$process(docs);

        docs.forEach(function(doc) {
            if (doc.docType == 'pattern-data') {
                expect(doc.data).toEqual(processor.data);
            }
        })
    })
});