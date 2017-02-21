jQuery( document ).ready(function( $ ) {
  // Turn possible discount green when same as current discount
  $("body").on('click', '.select-week', function(event) {
    var possibleDiscount = $("#possibleDiscount .header-large");
    var currentDiscount = $("#currentDiscount .header-large");
    if(possibleDiscount.text() == currentDiscount.text()) {
      possibleDiscount.addClass('max-discount');
    } else {
      possibleDiscount.removeClass('max-discount');
    }
  });

  // Toggle selected class when clicking weeks
  $("body").on('click', '.select-week', function(event) {
    event.preventDefault();
    var target = event.target;
    $(target).toggleClass('selected');
  });

  // Scroll body when adding new student
  $("body").on('click', '.add-student', function(e) {
    $('html, body').animate({
        scrollTop: $("#siteFooter").offset().top
    }, 500);
  })

  $("body").on('click', '.submit-new-student', function(e) {
    $('html, body').animate({
        scrollTop: $("#siteFooter").offset().top
    }, 500);  })

  $("body").on('click', '.edit-student', function(event) {
    $(this).parents(".student-header").addClass('editing');
  });

  $("body").on('hover', '.unavailable', function() {
    // add tooltip explaining teacher has requested no lessons be scheduled this week
  });
});
