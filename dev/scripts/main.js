require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery'
	}
});

require([
	'jquery',
	'NormalClick'
], function($, NormalClick) {

	/*$('.fast.click').each(function(index, element) {
		var $click = $(element),
			$toggle = $click.siblings('.toggle');

		NormalClick(element, function() {
			$toggle.toggleClass('gone');
		});
	});*/
	var $fastclick = $('.fast.click');
	NormalClick.attachTrigger($fastclick);
	$fastclick.click(function() {
		$(this).siblings('.toggle').toggleClass('gone');
	});

	NormalClick.attachTrigger('input');

	$('.slow.click').each(function(index, element) {
		var $click = $(element),
			$toggle = $click.siblings('.toggle');

		$click.click(function() {
			$toggle.toggleClass('gone');
		});
	});

});



window.log = function(str) {
	$('#log').append($('<li>' + str + '</li>'));
};