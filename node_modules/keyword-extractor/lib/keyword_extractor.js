var _ = require("underscore");
_.str = require('underscore.string');
var supported_languages = ["danish","dutch","english","french","galician","german","italian","polish","portuguese","russian","spanish","swedish"];
var stopwords = require("./stopwords/stopwords");

function _extract(str, options){
    if(_.isEmpty(str)){
        return [];
    }
    if(_.isEmpty(options)){
        options = {
            remove_digits: true,
            return_changed_case: true
        };
    }
    var return_changed_case = options.return_changed_case;
    var return_chained_words = options.return_chained_words;
    var remove_digits = options.remove_digits;
    var _language = options.language || "english";
    var _remove_duplicates = options.remove_duplicates || false;

    if(supported_languages.indexOf(_language) < 0){
        throw new Error("Language must be one of ["+supported_languages.join(",")+"]");
    }

    //  strip any HTML and trim whitespace
    var text = _.str.trim(_.str.stripTags(str));
    if(_.isEmpty(text)){
        return [];
    }else{
        var words = text.split(/\s/);
        var unchanged_words = [];
        var low_words = [];
        //  change the case of all the words
        for(var x = 0;x < words.length; x++){
            var w = words[x].match(/https?:\/\/.*[\r\n]*/g) ? words[x] : words[x].replace(/\.|,|;|!|\?|\(|\)|:|"|^'|'$/g,'');
            //  remove periods, question marks, exclamation points, commas, and semi-colons
            //  if this is a short result, make sure it's not a single character or something 'odd'
            if(w.length === 1){
                w = w.replace(/-|_|@|&|#/g,'');
            }
            //  if it's a number, remove it
            var digits_match = w.match(/\d/g);
            if(remove_digits && digits_match && digits_match.length === w.length){
                w = "";
            }
            if(w.length > 0){
                low_words.push(w.toLowerCase());
                unchanged_words.push(w);
            }
        }
        var results = [];
        var _stopwords = options.stopwords || _getStopwords({ language: _language });
        var _last_result_word_index = 0;
        for(var y = 0; y < low_words.length; y++){

            if(_stopwords.indexOf(low_words[y]) < 0){
                var result_word = return_changed_case && !unchanged_words[y].match(/https?:\/\/.*[\r\n]*/g) ? low_words[y] : unchanged_words[y];

                if (return_chained_words && _last_result_word_index === y - 1) {
                  var change_pos = results.length - 1 < 0 ? 0 : results.length - 1;
                  results[change_pos] = results[change_pos] ? results[change_pos] + ' ' + result_word : result_word;
                } else {
                  results.push(result_word);
                }

                _last_result_word_index = y;
            }
        }

        if(_remove_duplicates) {
            results= _.uniq(results, function (item) {
                return item;
            });
        }

        return results;
    }
}

function _getStopwords(options){
    options = options || {};

    var _language = options.language || "english";
    if(supported_languages.indexOf(_language) < 0){
        throw new Error("Language must be one of ["+supported_languages.join(",")+"]");
    }

    return stopwords[_language];
}

module.exports = {
    extract:_extract,
    getStopwords: _getStopwords
};
