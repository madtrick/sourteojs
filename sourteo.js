document.observe("dom:loaded", function(){
	new Sourteo();
});

var Sourteo	=	Class.create({
	initialize	: function(){
		this._initObservers();
	}
	,
	_initObservers : function(){
		$('tryButton').observe('click',function(){
			this.shake($('text').value);
		}.bind(this));
	}
});