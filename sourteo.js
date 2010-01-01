var Sourteo	=	Class.create({
	duration			: 2
	, 
	reelWrapperName		: 'sourteoReelWrapper'
	,
	reelContainerName	: 'sourteoReelContainer'
	,
	shakingItems 		: []
	,
	timer : function(pos){
		var value = .01 + Math.pow(Math.E,(1.5*pos - 3));
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
	_reelContainer	: function(){
		if( this._reelContainerElement == undefined)
			this._reelContainerElement	=	$(this.reelContainerName);

		return this._reelContainerElement;
	}
	,
	_reelWrapper	: function(){
		if( this._reelWrapperElement == undefined)
			this._reelWrapperElement	=	$(this.reelWrapperName);
			
		return this._reelWrapperElement;
	}
	,
	_initObservers : function(){
		$('tryButton').observe('click',function(){
			this.initShake($('text').value);
		}.bind(this));
	}
});