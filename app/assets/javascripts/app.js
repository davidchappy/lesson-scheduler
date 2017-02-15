jQuery( document ).ready(function( $ ) {
  $("body").on('click', '.select-week', function(event) {
    event.preventDefault();
    var target = event.target;
    console.log(target);
    $(target).toggleClass('selected');
  });
});
