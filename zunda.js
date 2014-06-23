var exec     = require('child_process').exec;
var execSync = require('execsync');

var Zunda = function() {};

Zunda.prototype = {

	_parse : function(result) {

		var result = result.split('\n');
		var new_arr=[],tango=[],tangoset=[],tango_tmp=[],j=0,k=0,l=0,z=0;

		for (var i = 0; i < result.length; i ++) {

			if(result[i].match(/^#EVENT/)){	
				new_arr[k] = { "event": result[i].split('\t') , "words":"", "wakachi": "" };
				k++;
			}else{
				if(!result[i].match(/^\*/)){
					if(result[i].split('\t')[0] != "EOS" && result[i].split('\t')[0] != ""){
						tango[l] = result[i].split('\t')[0];
						tango_tmp[j] = l;
						l++; 	
						j++;
					}
				}else{
					if(l != 0){
						z++;
						j=0;
						tango_tmp=[];
					}
				}
				tangoset[z] = tango_tmp;
			}
		}

		var word_new = [];
		var last_index = 0;
		var same_flg = 0;

		//event array
		for (var i = 0; i < new_arr.length; i ++) {

			var parse_point = parseInt(new_arr[i].event[1]);
			var point_word = tango[parse_point];

			var hit = 0;
			var tmp_ward_arr = [];

			//tangoset array
			for(var j = last_index; j < tangoset.length; j++){
				tango_array = tangoset[j];
				
				//tango array
				for(var k = 0; k < tango_array.length; k++ ){

					if(tango_array[k] == parse_point){
						if(last_index == j){
							same_flg = 1;
						}else{
							word_new[i] = tmp_ward_arr;
							same_flg = 0;
							tmp_ward_arr = '';
						}
	
						last_index = j;
						hit = 1;
						break;
					}
				}

				if(same_flg == 1){
					word_new[i] = tangoset[j];
					tmp_ward_arr = '';
					same_flg = 0;
                }else{
					if( j == 0 ){
						tmp_ward_arr = tmp_ward_arr.concat(tangoset[j]);
					}
                    tmp_ward_arr = tmp_ward_arr.concat(tangoset[j+1]);
                }			
				if(hit==1) break;
			}
			
			var word_new_n = [];
			if(word_new[i]){

				for(var z = 0; z < word_new[i].length; z++){
					word_new_n[z] = tango[word_new[i][z]];
				}	
			
				new_arr[i].words = word_new_n.join('');
				new_arr[i].wakachi = word_new_n.join(' ');
			}
		}

		return new_arr;
	},

	parse : function(str, callback) {
		process.nextTick(function() { 
			exec('echo "' + str + '" | zunda |& tee /dev/null',  function(err, result) {
				if (err) { return callback(err); }
				callback(err, Zunda._parse(result));
			});
		});
	},

	parseSync : function(str) {
		var result = execSync('echo ' + str + ' | zunda');
		return Zunda._parse(result);
	}
};

for (var x in Zunda.prototype) {
	Zunda[x] = Zunda.prototype[x];
}

module.exports = Zunda;
