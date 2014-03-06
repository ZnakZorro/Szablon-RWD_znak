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

$( document ).ready(function(){
	var ls_css = localStorage.getItem('___RWD3___');
	//console.log(ls_css);
	if (ls_css){
		var lokalSt = JSON.parse(ls_css);
		//console.log(lokalSt.extra_css);
		$('#css_dopisane').text(lokalSt.extra_css);
	}
});