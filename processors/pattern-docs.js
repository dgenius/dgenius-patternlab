/**
 * @dgService angularPatternDocs
 * @description
 * Adds patternlab related metadata to angular documents.
 */
module.exports = function angularPatternDocs() {
	return {
		outputFolder: 'patterns',
		typePriority: '00',
		$runAfter: ['generateComponentGroupsProcessor'],
		$runBefore: ['computing-paths'],
		$validate: {
			outputFolder: { presence: true },
			typePriority: { presence: true }
		},
		$process: function(docs) {
			var that = this;
			docs.forEach(function(doc) {
				var subTypePriority;
				switch(doc.docType) {
					case 'module':
						subTypePriority = '00';
						break;
					case 'provider':
						subTypePriority = '01';
						break;
					case 'service':
						subTypePriority = '02';
						break;
					case 'directive':
						subTypePriority = '03';
						break;
					case 'filter':
						subTypePriority = '04';
						break;
					default:
						subTypePriority = '05';
						break;
				}

				doc.pattern = {
					outputFolder: that.outputFolder,
					priority: {
						type: that.typePriority,
						subType: subTypePriority
					},
					type: 'angular',
					subType: doc.docType + 's',
					name: doc.name
				};
			});
		}
	};
}
