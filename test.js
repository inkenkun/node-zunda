var Zunda = new require('./zunda.js');
//var testWord = '今日はラーメンを食べた。あしたはハンバーグを食べたい';
var testWord = '次郎は大阪に行ったが、太郎は東京には行かず地元に残ろうとした'

// 非同期版
Zunda.parse(testWord, function(err, result) {
	if(err) console.log(err);	
	console.log('非同期:\n', result);
});

// 同期版
console.log('同期:\n', Zunda.parseSync(testWord) );



