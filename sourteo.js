/*
*	Developed by: Farruco Sanjurjo
*	mail: madtrick@gmail.com
*	Version: 1.0
*/
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
					this._reelContainer().setStyle({ opacity : this._fadeRate(pos)});
					this._reelContainer().setStyle({ top : '-' + result_height + 'px'});
					this._spin(pos + 0.25);
				}.bind(this)
			});

	}
	,
	initSpin : function(word){
		this._spin(0);
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
	_fadeRate : function(pos){
		var result	=	(0.75*pos)/this.duration + 0.25;
		return result;
	}
	,
	_spin	: function(start){
			if ( start >= this.duration ) {
				this._finish(start);
				return;
			}
			
			var itempos	=	Math.floor(Math.random()*this.shakingItems.size());
			this._reelContainer().update();
			this._reelContainer().insert(this.shakingItems[itempos]);

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
});