# various

## Objective
Searches for the question id comment and add it as an attribute on output xml


## Usage
First, run npm install (to install dependences)

var AddQuestionId = require('addQuestionId').AddQuestionId;
var addQuestionId = new AddQuestionId();
addQuestionId.process(inputPath, outputPath, callback);

callback function receive two parameters:

err : false if everything went fine. An error otherwise
count : Number of processed questions.

Example:

new AddQuestionId()
    .process(
            'input/Clasificatoria 5-LEN-(Version 1).xml',
            'output/Clasificatoria 5-LEN-(Version 1).xml',
            function(error, count){
                if(error) return console.log('There was an error:' + error);
                console.log('Process finished. ' + count + ' questions processed.');
            });
            

To test : node test

## Developing


Created with [Nodeclipse v0.4](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   
