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
    this._questionCount = 0;
};

AddQuestionId.prototype.process = function(inputPath, outputPath, callback) {
    var self = this;
    
    this._writeStream = fs.createWriteStream(outputPath, {flags : 'w'});
    this._writeStream.on('close', function(){ callback(false, self._questionCount); });
    
    var readStream = fs.createReadStream(inputPath);
    readStream.on('close', function(){ self._writeStream.end(); });
    
    new Lazy(readStream)
        .lines
        .map(function(pLine){
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
                    self._questionCount++;
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
