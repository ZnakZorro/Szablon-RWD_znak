function JakisLosowanyTekst(){

	this.samogloski =   ['a', 'e', 'i', 'o', 'u'];
	this.spolgloski =   ['z','n','r','w','s','t','c','y','k','d','p','m','u','j','l','ł','b','g','h','f','ę','ą','ó','ż','ś','ć','ń','ź','ch','cz','dz','rz','sz','dż','dź','ob'];
	this.spojniki = ['a', 'i', 'w', 'u', 'z', 'o', 'na', 'się'];
	this.img_colors = ['sky','vine','lava','gray','industrial','social'];
	this.img_class = ['img-rounded','img-circle','img-thumbnail'];
	
		this.losuj = function(l){
			return Math.round(Math.random() * Math.random() * l);
		}
		
		this.jakisObrazek = function(ile){
			var wymiar= ile * 75;
			var align = (Math.random() > 0.5) ? 'left' : 'right';
			return '<img data-src="holder.js/'+wymiar+'x'+wymiar+'/'+this.img_colors[Math.floor(Math.random()* this.img_colors.length)]+'" class="'+this.img_class[Math.floor(Math.random()* this.img_class.length)]+'" style="margin:8px; float:'+align+'; " alt="img">';
		}
		
		this.jakiesSlowo = function(){
			var len = Math.round(Math.random()*8)+2;
			var word = '';
			var is_vowel = false;
			var arr;

			for (var i = 0; i < len; i++) {
			  if (is_vowel) arr = this.samogloski
			  else arr = this.spolgloski
			  is_vowel = !is_vowel;
			  var los = this.losuj(arr.length-1);
			  word += arr[los];
			  //word += arr[Math.round(Math.random()*(arr.length-1))];
			}
			return word;
		}

		this.jakiesZdanie = function(){
			var len = Math.round(Math.random()*10)+5;
			var zdanie =this.jakiesSlowo();
			zdanie = zdanie.charAt(0).toUpperCase() + zdanie.slice(1);
			for (var i=0; i<len; i++){
				zdanie += ' '+ this.jakiesSlowo();
				if (i % 3 == 2 && i<len-1) zdanie += ' '+ this.spojniki[Math.round(Math.random()*(this.spojniki.length-1))];
			}
			return zdanie+'. ';
		}

		this.jakisTekst = function(ile){
			ile = ile || 200;
			var zdan = Math.floor(ile/50);
			var len = Math.round(Math.random()*zdan)+2;
			var tekst ='';
			for (var i=0; i<len; i++){
				tekst += this.jakiesZdanie();
			}
			return tekst;
		}

		this.jakisBlok = function(ile){
			ile = ile || 6;
			blok=this.jakisObrazek(ile);
			for (i=0; i<ile; i++){
				blok += '<p>'+this.jakisTekst()+'<\p>';
			}
			return blok;
		}

		this.ini = function(klasa){
			klasa = klasa || "losowyTekst";
			var randomBloki = document.getElementsByClassName(klasa);
			//console.log(klasa);
			for (var i=0; i<randomBloki.length; i++){
				var blok = randomBloki[i];
				var ile  = blok.getAttribute('value');
				//console.log(ile, blok);
				blok.innerHTML = this.jakisBlok(ile);
			}
		}





		/*
		Tabela frekwencji
		znak	[%]	znak	[%]	znak	[%]	znak	[%]
		a	8.91	t	3.98	l	2.10	ż	0.83
		i	8.21	c	3.96	ł	1.82	ś	0.66
		o	7.75	y	3.76	,	?.??	ć	0.40
		e	7.66	k	3.51	b	1.47	f	0.30
		z	5.64	d	3.25	g	1.42	ń	0.20
		n	5.52	p	3.13	ę	1.11	q	0.14
		r	4.69	m	2.80	h	1.08	ź	0.06
		w	4.65	u	2.50	ą	0.99	v	0.04
		s	4.32	j	2.28	ó	0.85	x	0.02
		*/
} // EOC

var losowyTekst = new JakisLosowanyTekst;

//console.log(losowyTekst.jakisBlok(2));