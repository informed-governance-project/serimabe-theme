$(document).ready(function () {
  $('.so_status_form').find('option').addClass("bg-body text-dark");

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
      const placeholdertext = gettext("Justification required");
      if (textarea.length && $(this).is(':checked') && textarea.val().trim() === "") {
        textarea
          .addClass("border border-danger border-2")
          .attr("placeholder", placeholdertext);
      } else {
        textarea
          .removeClass("border border-danger border-2")
          .removeAttr('placeholder');;
      }
    });
  }

  function checkActions() {
    const $activeSlide = $('.carousel-item.active');
    const $checkboxes = $activeSlide.find(".form-check-input").not(".readonly_field")
    const $actionstextarea = $activeSlide.find(".so_actions_form");
    const $lastMaturityLevelMeasures = $activeSlide.find(".last_maturity_level_measure").length;
    const $lastMaturityLevelMeasuresCheked = $activeSlide.find(".last_maturity_level_measure").filter(":checked").length
    const allLastLevelMeasureschecked = $lastMaturityLevelMeasures > 0 && $lastMaturityLevelMeasuresCheked === $lastMaturityLevelMeasures;
    const placeholdertext = gettext("Please list your current and planned measures, including a schedule with the individual stages.");
    if ($actionstextarea.val().trim() === "" && !allLastLevelMeasureschecked && $checkboxes.is(":checked")) {
      $actionstextarea
        .attr('placeholder', placeholdertext)
        .addClass("border border-danger border-2")
    } else {
      $actionstextarea
        .removeAttr('placeholder')
        .removeClass("border border-danger border-2")
    }
  }

  function checkRequiredFields() {
    const $activeSlide = $('.carousel-item.active');
    const $checkboxes_required = $activeSlide.find(".form-check-input").not(".not-required, .readonly_field")
    const $textareas_required = $activeSlide.find(".form-control").not(".not-required, .readonly_field, .so_actions_form")
    const $checkbox_no_required = $activeSlide.find(".form-check-input.not-required").not(".readonly_field")
    const $textarea_no_required = $activeSlide.find(".form-control.not-required").not(".readonly_field")
    const $anyRequiredChecked = $checkboxes_required.is(":checked");
    const $anyNonRequiredChecked = $checkbox_no_required.is(":checked");
    
    if ($anyRequiredChecked) {
      $checkbox_no_required.prop("checked", false).prop("disabled", true);
      $textarea_no_required.prop("disabled", true);
    } else if ($anyNonRequiredChecked) {
      $checkboxes_required.prop("disabled", true);
      $textareas_required.prop("disabled", true);
    } else {
      $checkboxes_required
        .add($textareas_required)
        .add($checkbox_no_required)
        .add($textarea_no_required)
        .prop("disabled", false);
    }
  }

  $('.form-check-input').on('change', function () {
    checkImplementation();
    checkRequiredFields()
    checkActions()
  });

  $('textarea[id*="-justification"]').not(".not-required").on('input', function () {
    checkImplementation();
  });

  $('textarea[id*="-actions"]').on('input', function () {
    checkActions();
  });


  $security_objectives_carousel.on('slid.bs.carousel', function (event) {
    adjustTextareaHeights();
    checkRequiredFields();
    checkActions();
    $("#security_objective_selector").find('button[data-bs-slide-to]').removeClass("focus-effect");
    $active_button = $("#security_objective_selector").find(`[data-bs-slide-to="${event.to}"]`);
    $active_button.addClass("focus-effect .btn:hover");
  });

  adjustTextareaHeights();
  checkImplementation();
  checkRequiredFields();
  checkActions();
  $("#security_objective_selector").find(`[data-bs-slide-to="0"]`).addClass("focus-effect");
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
      .then((response) => {
        response.json()
          .then(data => {
            if (data.success == "false") return
            if (data.data.status) {
              switch (data.data.status) {
                case "PASS":
                  $('.carousel-item.active')
                    .find('.so_status_form')
                    .removeClass("bg-danger")
                    .addClass("text-white bg-success")
                  break;
                case "FAIL":
                  $('.carousel-item.active')
                    .find('.so_status_form')
                    .removeClass("bg-success")
                    .addClass("text-white bg-danger")
                  break;
                default:
                  $('.carousel-item.active')
                    .find('.so_status_form')
                    .removeClass("text-white bg-success bg-danger")
              }
            }
            if (data.objective_state) {
              so_id = data.objective_state.id;
              $so_objective_button = $("#security_objective_selector").find(`#${so_id}`);
              $so_objective_button.removeClass("btn-success btn-warning btn-light");
              if (data.objective_state.is_completed) {
                $so_objective_button.addClass("btn-success");
              } else if (data.objective_state.is_partially) {
                $so_objective_button.addClass("btn-warning");
              } else if (data.objective_state.is_not_started) {
                $so_objective_button.addClass("btn-light");
              }
            }
            if (data.so_score) {
              const $scoreElem = $('.carousel-item.active').find('#so-score');
              const label = $scoreElem.data('label');
              $scoreElem.text(`${label} : ${data.so_score}`);
            }
          })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}