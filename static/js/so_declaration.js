$(document).ready(function () {
  let $security_objectives_carousel = $('#security_objectives_carousel');

  function adjustTextareaHeights() {
    $('.carousel-item.active').find('textarea').each(function () {
      let parentTd = $(this).closest('td');
      $(this).css({ height: parentTd.height() });
    });
  }

  function checkImplementation() {
    $('.form-check-input').each(function () {
      const checkboxId = $(this).attr('id');
      const justificationId = checkboxId.replace('is_implemented', 'justification');
      const textarea = $('#' + justificationId).not(".not-required"); 
      if (textarea.length && $(this).is(':checked') && textarea.val().trim() === "") {
        textarea
          .addClass("border border-danger border-2")
          .attr("placeholder", "Justification required");
      } else {
        textarea
          .removeClass("border border-danger border-2")
          .removeAttr('placeholder');;
      }
    });
  }

  $('.form-check-input').on('change', function () {
    checkImplementation();
  });
  $('textarea[id*="-justification"]').not(".not-required").on('input', function () {
    checkImplementation();
  });


  $security_objectives_carousel.on('slid.bs.carousel', function () {
    adjustTextareaHeights();
  });

  adjustTextareaHeights();
  checkImplementation();
});


function update_so_declaration(form) {
  const csrftoken = $('input[name=csrfmiddlewaretoken]').val();
  const id = form.name.split('-').shift();
  const name = form.name.split('-').pop();
  if (form.checked !== undefined) form.value = form.checked;
  if (form.value !== undefined) {
    data = JSON.stringify({ "id": id, [name]: form.value });
    url = window.location.href.split(window.location.host).pop();

    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: data
    })
      .then()
      .catch((error) => {
        console.log(error);
      });
  }
}