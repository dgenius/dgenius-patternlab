/**
 * @dgService angularPatternDocs
 * @description
 * Adds patternlab related metadata to angular documents.
 */
module.exports = function angularPatternDocs() {
	return {
		$runAfter: ['generateComponentGroupsProcessor'],
		$runBefore: ['computing-paths'],
		$process: function(docs) {
			docs.forEach(function(doc) {
				var priority;
				switch(doc.docType) {
					case 'module':
						priority = '00';
						break;
					case 'provider':
						priority = '01';
						break;
					case 'service':
						priority = '02';
						break;
					case 'directive':
						priority = '03';
						break;
					case 'filter':
						priority = '04';
						break;
					default:
						priority = '05';
						break;
				}

				doc.pattern = {
					type: '00-angular',
					subType: priority + '-' + doc.docType + 's',
					name: doc.name
				};
			});
		}
	};
}
