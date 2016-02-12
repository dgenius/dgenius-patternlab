# dgenius-patternlab

A dgeni package for generating patternlab's patterns from Angular source code

Out of the box, the package:

* generates patternlab's patterns as `*.mustache` files.
* generates patternlab's data JSON file used by mustache to customise variables.
* adds specific classes to the `<code>` tag to highlight code thanks to [prism](http://prismjs.com/).

## Processors

* `angularPatternDocs` - add patternlabs metadatas on all Angular documents
* `angularPatternDataDocs` - generate patternlab's data JSON documents from Angular documents. *Note that if the data is null or empty, no additional documents will be generated.*

### Deployment configuration

#### Customise patterns output folder

By default, the patterns will be generated into a `writeFilesProcessor.outputFolder + '/patterns'` folder. For instance, you might want to generate the angular patterns into the patterns' sources folder.

You can configure this in your package like so:

```js
.config(function(writeFilesProcessor, angularPatternDocs) {
    // Destination root folder path for all dgeni documents
    writeFilesProcessor.outputFolder = 'source';
    angularPatternDocs.outputFolder = '_patterns';
});
```

#### Add customised mustache data

To add data for all generated documents, you need to set the Javascript object `data`. For instance, you might want to add a custom css class on every patterns generated from the Angular source code

You can configure this in your packages like so:

```js
.config(function(angularPatternDataDocs) {
    angularPatternDataDocs.data = {
        bodyClass: 'angular-doc',
        ...
    }
});
```

## Services

* `encodeCodeBlock` - convert a block of code into HTML. *Note that it override the `encodeCodeBlock` present in the [dgeni-packages/base](https://github.com/angular/dgeni-packages/blob/master/base) to add language data and CSS class for Prism to highlight the code.*