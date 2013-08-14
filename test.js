var AddQuestionId = require('./addQuestionId').AddQuestionId;

new AddQuestionId()
    .process(
            'input/Clasificatoria 5-LEN-(Version 1).xml',
            'output/Clasificatoria 5-LEN-(Version 1).xml',
            function(error, count){
                if(error) return console.log('There was an error:' + error);
                console.log('Process finished. ' + count + ' questions processed.');
            });

