$(function(){

  //////////画面スクロールでヘッダー追尾//////////
  // $(window).scroll(function(){
  //   $("header").stop().animate({"top" : $(window).scrollTop() + 0}, 500)
  // })

  //////////メインビジュアルのスクロール//////////
  // 画像の枚数
  var count = $("#visual li").length;

  // 現在表示されている画像（最初は1番目の画像）
  var current = 1;

  // 次に表示する画像
  var next = 2;

  // フェードイン／アウトのインターバル（何秒ごとに画像を切り替えるか。3000ミリ秒に設定）
  var interval = 3000;

  // フェードイン／アウトのスピード（500ミリ秒に設定）
  var duration = 1500;

  // タイマーの変数
  var timer;

  // 1番目の写真以外は非表示
  $("#visual li:not(:first-child)").hide();

  // 3000ミリ秒（変数intervalの値）ごとにslideTimer()関数を実行
  timer = setInterval(slideTimer, interval);

  // slideTimer()関数
  function slideTimer(){
    // 関数の中身
    // 現在の画像をフェードアウト
    $("#visual li:nth-child(" + current + ")").fadeOut(duration);

    // 次の画像をフェードイン
    $("#visual li:nth-child(" + next + ")").fadeIn(duration);

    // 変数currentの新しい値：変数nextの元の値
    current = next;

    // 変数nextの新しい値：変数currentの新しい値+1
    next = ++next;

    // 変数nextの値が3（画像の総数）を超える場合、1に戻す
    if(next > count){
      next = 1;
    }
    // targetクラスを削除
    $("#button li a").removeClass("target");

    // 現在のボタンにtargetクラスを追加
    $("#button li:nth-child("+ current +") a").addClass("target");
  }
  // ボタンをクリック
  $("#button li a").click(function(){
    // テキスト内容を変数nextに代入
    next = $(this).html();

    // タイマーを停止して再スタート
    clearInterval(timer);
    timer = setInterval(slideTimer, interval);

    // 初回の関数実行
    slideTimer();

    return false;
  });

  //////////画像のキャプション表示//////////
  //.box要素の最後にdiv要素を追加
  $(".caption").append("<div>");

  //.aboutのdiv要素内に画像キャプションを追加
  $(".caption div").each(function(){
    $(this).html("<p>" + $(this).parent().children("img").attr("alt") + "</p>");
  });

  //.box要素をマウスオーバー
  $(".caption").hover(function(){
    //マウスオーバー時の処理
    //キャプション部分の表示：フェードイン
    $(this).children("div").stop().fadeIn(300);

    //キャプションのテキスト位置：10pxから0pxへ移動
    $(this).children("div").children("p").stop().animate({"top" : 0}, 300);

  }, function(){
    //マウスアウト時の処理
    //キャプション部分の表示：フェードアウト
    $(this).children("div").stop().fadeOut(300);

    //キャプションのテキスト位置：0pxから10pxへ移動
    $(this).children("div").children("p").stop().animate({"top":"10px"}, 300);

  });

  //////////ページトップへ//////////
  $(function(){
    var pagetop = $('#totop');
    pagetop.hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
      } else {
            pagetop.fadeOut();
      }
    });
    pagetop.click(function () {
      $('body, html').animate({ scrollTop: 0 }, 500);
      return false;
    });
  });
})