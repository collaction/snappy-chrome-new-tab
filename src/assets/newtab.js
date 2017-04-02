$(function () {
	$('#aboutLink').click(function () {
		aboutPopup();
		return false;
	});

	$.get({
		url: 'https://snappy.collaction.hk/api_get_daily_photo',
		dataType: "JSON",
		success: function (result) {
			var op = result.op;
			$('.year__str').html(op.year.str);
			$('.year__ago').html(op.year.ago);
			$('.info__desc').html(op.desc);
			$('.info__name').html(op.name);
			$('.info__link').attr('href', op.link + '?utm_source=collaction&utm_campaign=chrome_extension&utm_medium=link');

			$('.backdrop')
				.css('background-image', 'url("' + op.image_url + '")')
				.addClass('animated fadeIn');
			$('.footer__info').show().addClass('animated fadeIn');

			setTimeout(function () {
				install_notice();
			}, 500);
		}
	});
});

function install_notice() {
	if (localStorage.getItem('install_time'))
		return;

	var now = new Date().getTime();
	localStorage.setItem('install_time', now);

	aboutPopup();
}

function aboutPopup() {
	sweetAlert({
		title: "歡迎使用 Snappy 每天放送",
		text: "只要開啟 Google Chrome 新分頁，Snappy 為您送上一張香港街景相片，每天更新一次。<br><br>您亦可以<a href=\"https://play.google.com/store/apps/details?id=hk.collaction.snappy&utm_source=collaction&utm_campaign=chrome_extension&utm_medium=popup\">下載手機應用程式</a>，拍下今昔對比照片，豐富相片資料庫。",
		confirmButtonText: "關於此計劃",
		cancelButtonText: "明白",
		confirmButtonColor: "#0099FF",
		showCancelButton: true,
		html: true,
		imageUrl: "assets/snappy-icon-128.png"
	}, function (isConfirm) {
		if (isConfirm) {
			chrome.tabs.create({
				url: "https://www.collaction.hk/s/snappy?utm_source=collaction&utm_campaign=chrome_extension&utm_medium=popup"
			});
		}
	});
}
