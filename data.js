const characters = [
  // イナズマイレブン（1作目）
  { id:1,  name:"円堂守",     kana:"えんどうまもる",     team:"雷門中学校",       pos:"GK", series:"1", element:"土", number:1,  hissatsu:["神の手","豪炎ゴッドキャッチ"] },
  { id:2,  name:"豪炎寺修也", kana:"ごうえんじしゅうや", team:"雷門中学校",       pos:"FW", series:"1", element:"火", number:10, hissatsu:["炎のエンペラーペンギン2号","ライジングファイア"] },
  { id:3,  name:"壁山塔子",   kana:"かべやまとうこ",     team:"雷門中学校",       pos:"DF", series:"1", element:"土", number:2,  hissatsu:["グレートウォール"] },
  { id:4,  name:"宍戸太陽",   kana:"ししどたいよう",     team:"雷門中学校",       pos:"MF", series:"1", element:"土", number:6,  hissatsu:["ヘビースタンプ"] },
  { id:5,  name:"宍戸梅吉",   kana:"ししどうめきち",     team:"雷門中学校",       pos:"MF", series:"1", element:"木", number:7,  hissatsu:["プロペラヘッド"] },
  { id:6,  name:"鬼道有人",   kana:"きどうゆうと",       team:"帝国学園",         pos:"MF", series:"1", element:"闇", number:6,  hissatsu:["オルフェノクスタクティクスΩ","ツインブーストΩ"] },
  { id:7,  name:"染岡竜吾",   kana:"そめおかりゅうご",   team:"雷門中学校",       pos:"FW", series:"1", element:"火", number:9,  hissatsu:["ドラゴンクラッシュ"] },
  { id:8,  name:"錦龍馬",     kana:"にしきりゅうま",     team:"雷門中学校",       pos:"FW", series:"1", element:"木", number:11, hissatsu:["ロケットシュート"] },
  { id:9,  name:"細川純",     kana:"ほそかわじゅん",     team:"雷門中学校",       pos:"MF", series:"1", element:"木", number:8,  hissatsu:["ワープドリブル"] },
  { id:10, name:"吉良峻介",   kana:"きらしゅんすけ",     team:"雷門中学校",       pos:"MF", series:"1", element:"木", number:3,  hissatsu:["パーフェクトタワー"] },
  { id:11, name:"杉坂勉",     kana:"すぎさかつとむ",     team:"雷門中学校",       pos:"DF", series:"1", element:"土", number:4,  hissatsu:["バリケードウォール"] },
  { id:12, name:"風丸一郎",   kana:"かざまるいちろう",   team:"雷門中学校",       pos:"MF", series:"1", element:"木", number:5,  hissatsu:["かまいたち","スパイダースナイプ"] },
  { id:13, name:"豪炎寺大志", kana:"ごうえんじたいし",   team:"帝国学園",         pos:"MF", series:"1", element:"火", number:7,  hissatsu:["ファイアトルネード"] },
  { id:14, name:"源田博幸",   kana:"げんだひろゆき",     team:"雷門中学校",       pos:"GK", series:"1", element:"木", number:16, hissatsu:["ジャングルセーブ"] },
  { id:15, name:"大文字隼",   kana:"だいもんじはやぶさ", team:"帝国学園",         pos:"FW", series:"1", element:"土", number:10, hissatsu:["バルカンシュート"] },
  // イナズマイレブン GO
  { id:16, name:"神童拓人",   kana:"しんどうたくと",     team:"雷門中学校(GO)",   pos:"MF", series:"GO", element:"木", number:10, hissatsu:["オメガザストライク","コロナストーム"] },
  { id:17, name:"天馬大介",   kana:"てんまだいすけ",     team:"雷門中学校(GO)",   pos:"MF", series:"GO", element:"木", number:11, hissatsu:["グランドファイア","イレジスタブルブレイズ"] },
  { id:18, name:"霧野蘭丸",   kana:"きりのらんまる",     team:"雷門中学校(GO)",   pos:"FW", series:"GO", element:"風", number:9,  hissatsu:["デビルウィンド","コロナストーム"] },
  { id:19, name:"九十九冬士", kana:"つくもふゆじ",       team:"雷門中学校(GO)",   pos:"GK", series:"GO", element:"木", number:1,  hissatsu:["カゲロウセーブ"] },
  { id:20, name:"根津清一郎", kana:"ねずせいいちろう",   team:"雷門中学校(GO)",   pos:"DF", series:"GO", element:"土", number:3,  hissatsu:["ストーンウォール"] },
  { id:21, name:"栗松幸二",   kana:"くりまつこうじ",     team:"雷門中学校(GO)",   pos:"DF", series:"GO", element:"土", number:4,  hissatsu:["ロッキーディフェンス"] },
  { id:22, name:"剣城京介",   kana:"けんじょうきょうすけ",team:"フットニスタ",     pos:"FW", series:"GO", element:"火", number:10, hissatsu:["ブラックスラッシュ"] },
  { id:23, name:"一柳楓",     kana:"いちりゅうかえで",   team:"スカイパワーズ",   pos:"MF", series:"GO", element:"風", number:8,  hissatsu:["バタフライドリブル"] },
  // イナズマイレブン GO クロノ・ストーン
  { id:24, name:"松風天宮",   kana:"まつかぜてんぐう",   team:"El Dorado",        pos:"MF", series:"CS", element:"土", number:7,  hissatsu:["プロトサンダーゴッド"] },
  { id:25, name:"ベータ",     kana:"べーた",             team:"El Dorado",        pos:"GK", series:"CS", element:"闇", number:1,  hissatsu:["インヴィンシブルセーブ"] },
  // イナズマイレブン GO ギャラクシー
  { id:26, name:"鉄角修平",   kana:"てっかくしゅうへい", team:"惑星イナズマ",     pos:"DF", series:"Galaxy", element:"土", number:5,  hissatsu:["アイアンウォール"] },
  { id:27, name:"栗松幸造",   kana:"くりまつこうぞう",   team:"惑星イナズマ",     pos:"FW", series:"Galaxy", element:"火", number:9,  hissatsu:["スプラッシュシュート"] },
];
