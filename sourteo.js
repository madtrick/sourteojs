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
		
		var time	=	this.timer(pos);
		new Effect.Parallel([
			new Effect.Move('result',
			 	{	
					sync : true,
					y: (container_height + result_height),
					duration : time,
					afterFinish : function(){

						$('result').setStyle({ top : '-' + result_height + 'px'});
						this.shake(pos + 0.25,2)

					}.bind(this)
				})
			,
			new Effect.Fade('result',
				{
					sync : true,
					duration : time/2,
					to	: 0.2,
					
					afterFinish : function(){
						$('result').appear();
					}
				})
		]);
		
	}
	,
	initShake : function(word){
		$('result').innerHTML	=	word;
		this.shakingItems = word.split(",");
		this.shake(0,2);
	}
	,
	finish :  function(pos){
		var container_height	=	$('result-box').getHeight();
		var result_height		=	$('result').getHeight();
		new Effect.Move('result',
		 	{	y: (container_height + result_height)/2,
				duration : this.timer(pos),
				afterFinish : function(){
					
					console.log("Finish");
				
				}.bind(this)
			});
	}
	,
	shake	: function(start,end){
			if ( start >= end ) {
				this.finish(start);
				return;
			}
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