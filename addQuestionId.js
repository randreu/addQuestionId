var fs = require('fs'),
    Lazy = require('lazy');

function AddQuestionId() {
    this._init();
}

AddQuestionId.prototype._questionIdRegex = /<!-- *question: *(\d+) *-->/;
AddQuestionId.prototype._questionRegex = /(.*<question *type="[^"]+")(>)/;


exports.AddQuestionId = AddQuestionId;


AddQuestionId.prototype._init = function() {
    this._currentId = null;
    this._lineNumber = 0;
    this._writeStream = null;
};

AddQuestionId.prototype.process = function(inputPath, outputPath) {
    
    var readStream = fs.createReadStream(inputPath);
    this._writeStream = fs.createWriteStream(outputPath, {flags : 'w'});
    var self = this;
    new Lazy(readStream)
        .lines
        .forEach(function(pLine){
            self._lineNumber++;
            if(pLine.length > 1) {
                var line = pLine.toString();
                var wLine = line;
                var qMatch = self._questionRegex.exec(line);
                if(qMatch) {
                    if(null === self._currentId) {
                        throw "Line:" + self._lineNumber + " There's no matching id for current question";
                    }
                    wLine = qMatch[1] + ' id="' + self._currentId + '" ' + qMatch[2];
                    self._currentId = null;
                }
                else if(null === self._currentId) {
                    var match = self._questionIdRegex.exec(line);
                    if(match) {
                        self._currentId = match[1];
                        wLine = '';
                    }
                }
                if('' !== wLine) {
                    self._writeStream.write(wLine + '\n');
                }
            }
        });
};
