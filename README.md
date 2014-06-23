# ZundaJS

Zundaの結果をパースする Node.js 用モジュールです。

## Installation

``` shell
$ npm install zunda
```


## Usage

### Asynchronous

```javascript
	var Zunda = new require('zunda')
	  , zunda = new Zunda()
	;
	zunda.parse('次郎は大阪に行ったが、太郎は東京には行かず地元に残ろうとした', function(err, result) {
		if (err) throw err;
		console.log(result);
	});
```

### Synchronous

```javascript
	var Zunda = new require('zunda')
	  , zunda = new Zunda()
	;
	var result =  zunda.parseSync('次郎は大阪に行ったが、太郎は東京には行かず地元に残ろうとした');
	console.log(result);
```

## Result


	 [ 
	   { event: [ '#EVENT0', '4', 'wr:筆者', '非未来', '0', '叙述', '成立', '0', '0' ],
         words: '次郎は大阪に行ったが、',
    	 wakachi: '次郎 は 大阪 に 行っ た が 、' },
       { event: [ '#EVENT1', '13', 'wr:筆者', '未来', '0', '叙述', '不成立', '0', '0' ],
         words: '太郎は東京には行かず',
         wakachi: '太郎 は 東京 に は 行か ず' },
       { event: [ '#EVENT2', '17', 'wr:筆者', '未来', '0', '意志', '高確率', 'ポジティブ', '0' ],
         words: '地元に残ろうとした',
         wakachi: '地元 に 残ろ う と し た' },
       { event: [ '#EVENT3', '20', 'wr:筆者', '非未来', '0', '叙述', '成立', '0', '0' ],
         words: '残ろうとした',
         wakachi: '残ろ う と し た' } 
     ]



## Reference

hicomiさんの mecab-async https://www.npmjs.org/package/mecab-async を参考にさせていただきました。
