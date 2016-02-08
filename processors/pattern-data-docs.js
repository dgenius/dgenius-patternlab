/**
 * @dgProcessor angularPatternDataDocs
 * @description
 * Create patternlab data objects for each angular / pattern documents.
 */
module.exports = function angularPatternDataDocs() {
    return {
        data: {},
        $runAfter: ['angularPatternDocs'],
        $runBefore: ['computing-paths'],
        $process: function(docs) {
            var that = this;

            docs.forEach(function (doc) {
                if (!doc.pattern) {
                    return;
                }
                if (!that.data || Object.keys(that.data).length == 0) {
                    return;
                }

                docs.push(that.createPatternDataDoc(doc));
            });
        },

        createPatternDataDoc: function(doc) {
            return {
                id: doc.name + '-pattern-data',
                name: doc.name + '-pattern-data',
                docType: 'pattern-data',
                pattern: doc.pattern,
                template: 'patternData.template.json',
                data: this.data
            };
        }
    };
};