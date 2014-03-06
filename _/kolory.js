function zapal(){
	var ifis = $('.color-edit-tx').length;
	//console.log(typeof(ifis), ifis);
	if (ifis=='0') {
		$('.control-edit').prepend('<input type="color" value="" onChange="kolory(this,\'color\')"       class="color-edit-tx" title="Text color" />');		
		$('.control-edit').prepend('<input type="color" value="" onChange="kolory(this,\'background\')"  class="color-edit-bg" title="Background" />');
		$('#klawisz_kasuj').show();
	}
	else {
		$('.color-edit-bg').toggle();
		$('.color-edit-tx').toggle();
		$('#klawisz_kasuj').toggle();
		$('#klawisz_zapisz').hide();
		$('#kody').hide();
	}
}

function kolory(co,kto){
	var v = $(co).val();
	var k= $(co).parent();
	k.css(kto,v);
	$('#klawisz_zapisz').show();
}

function zapisz(){
	$('#kody').empty();
	var all_css='';
	$('.control-edit').each(function(ix,el){
		var bg  = $(this).css('background');
		var tx  = $(this).css('color');
		var tag = $(this).prop("tagName");
		var klasy = $(this).prop("className");
		var arr = klasy.split(" ");
		var klasa = arr[0];
		var selektor=tag+'.'+klasa;
			var m_bg = bg.match(/rgb.?\((.*?)\)/);
			if (m_bg) bg = m_bg[0];
			var m_tx = tx.match(/rgb.?\((.*?)\)/);
			if (m_tx) tx = m_tx[0];
		var css = selektor+'{background:'+bg+'; color:'+tx+'}'+"\n";
		all_css +=css;
		$('#kody').append(css);
		$('#kody').show();
		localStorage.setItem('___RWD3___',JSON.stringify({'extra_css':all_css}));
	});
}

function kasuj(){
	localStorage.setItem('___RWD3___','');
	$('#css_dopisane').text('');
}



function rysujGrida(){
	console.log($('#grider').length);
	if ($('#grider').length>0) {$('#grider').toggle(); return true;}
	var grid_html='<div class="container"><div class="row" style="position:relative;">';
	for (var i=0; i<12; i++) grid_html += '<span class="col-md-1 grid grid-'+(i%2)+'" style="left:'+(i*8.3333)+'%;"></span>';
	grid_html += '</div></div>';
	var grid = $('<div/>',{id:'grider',html:grid_html});
	console.log(grid);
	$('body').prepend(grid);

/*	
		jQuery('<div/>', {
			id: 'foo',
			href: 'http://google.com',
			title: 'Become a Googler',
			rel: 'external',
			text: 'Go to Google!-------------------------------------'
		}).appendTo('#main_content');	
*/
}

function layout_fluid(){
	// container
	var ile = $('.container').length;
	if (ile)  $('.container').each(function(){$(this).removeClass('container').addClass("container-fluid");});
	else      $('.container-fluid').each(function(){$(this).removeClass('container-fluid').addClass("container");});
	// row
	//var ile = $('.row').length;
	//if (ile)  $('.row').each(function(){$(this).removeClass('row').addClass("row-fluid");});
	//else      $('.row-fluid').each(function(){$(this).removeClass('row-fluid').addClass("row");});
}

function layout_grid(patern){
	//var patern = $(ten).text();
	var arr = patern.split('-');
		var klasa =''; for (var i=0; i<13; i++) {if ($('#left').hasClass('col-sm-'+i)) {klasa='col-sm-'+i; break}};
		$('#left').removeClass(klasa).addClass('col-sm-'+arr[0]);
		var klasa =''; for (var i=0; i<13; i++) {if ($('#content').hasClass('col-sm-'+i)) {klasa='col-sm-'+i; break}};
		$('#content').removeClass(klasa).addClass('col-sm-'+arr[1]);
		var klasa =''; for (var i=0; i<13; i++) {if ($('#right').hasClass('col-sm-'+i)) {klasa='col-sm-'+i; break}};
		$('#right').removeClass(klasa).addClass('col-sm-'+arr[2]);
	console.log(klasa);
	var className = $('#left').attr('class').split(' ');//.join('.');
	
	//console.log($("div.row > div[class*='col-sm-3']"));
	//console.log($("div.row > div[class*='col']"));
	//$("*[class^='fade']")
	//$("*[class^='col-']").each(function(){
		//var row = $(this);
		//var cols = $(this+' div');
		//console.log(ix);
	//});
}

function suwaki() {
	var l = $('#suwak-cols-left').val();
	var p = 6-$('#suwak-cols-right').val();
	var c = 12-l-p;
	var patern=l+'-'+c+'-'+p;
	console.log(patern);
	layout_grid(patern);
}

function wybierzFont(font){
	if (typeof(font) == 'string') $(document.body).css('font-family',font);
	if (typeof(font) == 'number') $(document.body).css('font-size',font+'px');
}


$( document ).ready(function(){
	var ls_css = localStorage.getItem('___RWD3___');
	//console.log(ls_css);
	if (ls_css){
		var lokalSt = JSON.parse(ls_css);
		//console.log(lokalSt.extra_css);
		$('#css_dopisane').text(lokalSt.extra_css);
	}
});