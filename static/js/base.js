document.querySelectorAll('.is-valid').forEach(function (element) {
  element.classList.remove('is-valid');
});

// Catch session expiration and redirect to login page 
$(document).ajaxError(function (event, xhr) {
  if (xhr.status === 401) {
    try {
      let response = JSON.parse(xhr.responseText);
      window.location.href = response.login_url || "/";
    } catch (e) {
      window.location.href = "/";
    }
    return;
  }
});

var datatableTranslations = {
  info: gettext("Showing _START_ to _END_ of _TOTAL_ entries"),
  lengthMenu: gettext("_MENU_ entries per page"),
};


// initialize all tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, { delay: 200 })
})

$(document).ready(function () {
  $('.create_so_declaration').on("click", function () {
    var $popup = $("#create_so_declaration");
    var popup_url = '/securityobjectives/create';

    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
    });
  });

  $('.import_so_declaration').on("click", function () {
    let company_id = $(this).data("company-id");
    let sector_id = $(this).data("sector-id");
    let year = $(this).data("year");
    var $popup = $("#import_so_declaration");
    var popup_url = '/securityobjectives/import';

    if (company_id && sector_id && year) {
      popup_url = '/securityobjectives/import?company_id=' + company_id + '&sector_id=' + sector_id + '&year=' + year;
    }

    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
    });
  });

  $('.import_risk_analysis').on("click", function () {
    let company_id = $(this).data("company-id");
    let sector_id = $(this).data("sector-id");
    let year = $(this).data("year");
    var $popup = $("#import_risk_analysis");
    var popup_url = '/reporting/import_risk_analysis';

    if (company_id && sector_id && year) {
      popup_url = '/reporting/import_risk_analysis?company_id=' + company_id + '&sector_id=' + sector_id + '&year=' + year;
    }

    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
    });
  });
})

window.getCookie = function (name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

window.load_spinner = function () {
  $('#loading-spinner').removeClass('d-none').fadeIn();
}

window.stop_spinner = function () {
  $('#loading-spinner').fadeOut().addClass('d-none');
}
