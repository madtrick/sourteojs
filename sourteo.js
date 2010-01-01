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
		var container_height	=	this._reelWrapper().getHeight();
		var result_height		=	this._reelContainer().getHeight();
		var time	=	this.timer(pos);
		
		new Effect.Move(this.reelContainerName,
		 	{	
				y: (container_height + result_height),
				duration : time,
				afterFinish : function(){
					this._reelContainer().setStyle({ opacity : this.fadeRate(pos)});
					this._reelContainer().setStyle({ top : '-' + result_height + 'px'});
					this._spin(pos + 0.25);
				}.bind(this)
			});

	}
	,
	initSpin : function(word){
		this.spin(0);
	}
	,
	_finish :  function(pos){
		var container_height	=	this._reelWrapper().getHeight();
		var result_height		=	this._reelContainer().getHeight();
		new Effect.Move(this.reelContainerName,
		 	{	y: (container_height + result_height)/2,
				duration : this.timer(pos),
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