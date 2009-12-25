document.observe("dom:loaded", function(){
	new Sourteo();
});

var Sourteo	=	Class.create({
	initialize	: function(){
		this._initObservers();
	}
	,
	shakingItems : []
	,
	timer : function(pos){
		var value = .5 + Math.pow(Math.E,(pos - 1));
		console.log(value);
		return value;
	}
	,
	move	: function(pos){
		var container_height	=	$('result-box').getHeight();
		var result_height		=	$('result').getHeight();
		
		new Effect.Move('result',
		 	{	y: (container_height + result_height),
				duration : this.timer(pos),
				afterFinish : function(){
					
					$('result').setStyle({ top : '0px'});
					this.shake(pos + 0.25,2)
				
				}.bind(this)
			});
	}
	,
	initShake : function(word){
		$('result').innerHTML	=	word;
		this.shakingItems = word.split(",");
		this.shake(0,2);
	}
	,
	shake	: function(start,end){
			if ( start >= end ) return;
			var itempos	=	Math.floor(Math.random()*this.shakingItems.size());
			$('result').innerHTML	=	this.shakingItems[itempos];
			this.move(start); 
	}
	,
	_initObservers : function(){
		$('tryButton').observe('click',function(){
			this.initShake($('text').value);
		}.bind(this));
	}
});