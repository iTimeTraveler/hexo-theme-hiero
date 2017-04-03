
// Highlight current nav item
var hasCurrent = false;
$('#main-nav > li').each(function () {
	var url = window.location.href;
	var lastIndex = url.length;//要截取的字符串最后一位的位置+1
	var lastSlashIndex = url.lastIndexOf("/");
	if (lastSlashIndex == lastIndex -1) {
		lastSlashIndex = url.lastIndexOf("/",lastSlashIndex -1)//如果url的最后一个字符串是/,则修正最后一个斜杠的位置
		lastIndex--;//如果url最后一位是/，则不截取该位
	}
	url = url.substring(lastSlashIndex,lastIndex);
	if(themeMenus[url] == $(this).text().trim()){
		$(this).addClass('current-menu-item current_page_item');
		hasCurrent = true;
	} else {
		$(this).removeClass('current-menu-item current_page_item');
	}
});

if (!hasCurrent) {
	$('#main-nav > li:first').addClass('current-menu-item current_page_item');
}



// article toc
var toc = document.getElementById('toc')

if (toc != null) {
	window.addEventListener("scroll", scrollcatelogHandler);
	var tocPosition = 194+25;

	function scrollcatelogHandler(e) {
		 var event = e || window.event,
		     target = event.target || event.srcElement;
		 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		 if (scrollTop > tocPosition) {
		     toc.classList.add("toc-fixed");
		 } else {
		     toc.classList.remove("toc-fixed");
		 }
	}
}


$('#main-navigation').on('click', function(){
    if ($('#main-navigation').hasClass('main-navigation-open')){
      $('#main-navigation').removeClass('main-navigation-open');
    } else {
      $('#main-navigation').addClass('main-navigation-open');
    }
  });

$('#content').on('click', function(){
    if ($('#main-navigation').hasClass('main-navigation-open')){
      $('#main-navigation').removeClass('main-navigation-open');
    }
  });