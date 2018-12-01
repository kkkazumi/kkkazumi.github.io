var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

window.addEventListener('load', init);

var canvas;
var ctx;

var Asset = {}

// アセットの定義
Asset.assets = [
  { type: 'image', name: 'back', src: 'assets/back.png' },
  { type: 'image', name: 'box', src: 'assets/box.png' }
];

// 読み込んだ画像
Asset.images = {};

var mikanX = 0;

var lastTimestamp = null;

function init() {
  canvas = document.getElementById('maincanvas');
  ctx = canvas.getContext('2d');

  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;

  Asset.loadAssets(function(){

  requestAnimationFrame(update);
  });

  requestAnimationFrame(update);
}

function update(timestamp) {
  requestAnimationFrame(update);

var delta = 0; // 前回フレーム時間からの経過時間(単位:秒)
  if (lastTimestamp != null) {
    delta = (timestamp - lastTimestamp) / 1000;  // ミリ秒を1000で割ると秒になる(1000ミリ秒÷1000は1秒)
  }
  lastTimestamp = timestamp;

  mikanX += 100 * delta;

  render();
}

function render() {
  // 全体をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 背景を表示
  ctx.drawImage(Asset.images['back'], 0, 0);
  // みかん箱を表示
  ctx.drawImage(Asset.images['box'], mikanX, 0);
}

// アセットの読み込み
Asset.loadAssets = function(onComplete) {
  var total = Asset.assets.length; // アセットの合計数
  var loadCount = 0; // 読み込み完了したアセット数

  // アセットが読み込み終わった時に呼ばれるコールバック関数
  var onLoad = function() {
    loadCount++; // 読み込み完了数を1つ足す
    if (loadCount >= total) {
      // すべてのアセットの読み込みが終わった
      onComplete();
    }
  };

  // すべてのアセットを読み込む
  Asset.assets.forEach(function(asset) {
    switch (asset.type) {
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

// 画像の読み込み
Asset._loadImage = function(asset, onLoad) {
  var image = new Image();
  image.src = asset.src;
  image.onload = onLoad;
  Asset.images[asset.name] = image;
};


