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
  aria: { orderable: gettext(": Activate to sort") },
};

// Default options for tempus dominus
const defaultTempusdOptions = {
  allowInputToggle: true,
  promptTimeOnDateChange: true,
  promptTimeOnDateChangeTransitionDelay: 50,
  localization: {
    hourCycle: 'h23',
    format: 'yyyy-MM-dd HH:mm',
  },
  display: {
    buttons: {
      today: false,
      clear: true,
      close: true
    },
    icons: {
      time: 'bi bi-clock',
      date: 'bi bi-calendar',
      up: 'bi bi-chevron-up',
      down: 'bi bi-chevron-down',
      previous: 'bi bi-chevron-left',
      next: 'bi bi-chevron-right',
      today: 'bi bi-calendar-check',
      clear: 'bi bi-trash',
      close: 'bi bi-x-lg'
    },
    keyboardNavigation: true,
  }
};


// initialize all tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, { delay: 200 })
})

$(document).ready(function () {
  $('.multiselectcheckbox').multiselect({
    maxHeight: 400,
    buttonWidth: '100%',
    widthSynchronizationMode: 'always',
    buttonTextAlignment: 'left',
    nonSelectedText: gettext('Nothing selected'),
    nSelectedText: gettext('items selected'),
    numberDisplayed: 1,
    templates: {
      button: '<button class="multiselect form-select dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
      option: '<button class="multiselect-option dropdown-item"></button>',
    }
  });

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

  // Accesibility hack to be compliant with RGAA 11.2
  $('[data-bs-toggle="tooltip"]').filter('input, textarea, i').removeAttr('aria-label');

  $('input[placeholder]').each(function () {
    $(this).attr('title', $(this).attr('placeholder'));
  });

  // Accesibility hack to be compliant with RGAA 10.8
  $('label.visually-hidden').remove();

  $(document).on('click', '.spinner-trigger', function () {
    load_spinner();
  });

  // Sorting icons for sortable table headers
  const sort_field_from_context = $('#sort_field_ni_table').text() ? JSON.parse($('#sort_field_ni_table').text()) : null;
  const sort_direction_from_context = $('#sort_direction_ni_table').text() ? JSON.parse($('#sort_direction_ni_table').text()) : "desc";
  const currentSortField = new URLSearchParams(window.location.search).get('sort_field') || sort_field_from_context;
  const currentSortDirection = new URLSearchParams(window.location.search).get('sort_direction') || sort_direction_from_context;

  $('.sortable').each(function () {
    const $th = $(this);
    const sortField = $th.data('sort-field');

    // Wrap existing text
    const $label = $th.text().trim();
    $th.empty();

    const $container = $('<div>', {
      class: 'd-flex align-items-center justify-content-between'
    });


    const $icons = $('<span>', {
      class: 'd-flex flex-column ms-2 lh-1 sort-icons'
    });

    const $up = $('<i>', {
      class: 'bi bi-caret-up-fill'
    });

    const $down = $('<i>', {
      class: 'bi bi-caret-down-fill'
    });

    // Default muted
    $up.addClass('text-muted');
    $down.addClass('text-muted');

    // Highlight active arrow
    if (currentSortField === null && $th.hasClass('default-sort-field')) {
      $down.removeClass('text-muted').addClass('text-primary');
    }
    if (sortField === currentSortField) {
      if (currentSortDirection === 'asc') {
        $up.removeClass('text-muted').addClass('text-primary');
      } else if (currentSortDirection === 'desc') {
        $down.removeClass('text-muted').addClass('text-primary');
      }
    }

    $icons.append($up, $down);
    $container.append($label, $icons);
    $th.append($container);
  });

})

$(document).on("click","#openFilter", function () {
  $("#filterModal").modal("show");
});

window.getCsrftoken = function () {
  return $('meta[name="csrf-token"]').attr('content');
}

window.load_spinner = function () {
  $('#loading-spinner').removeClass('d-none').fadeIn();
}

window.stop_spinner = function () {
  $('#loading-spinner').fadeOut().addClass('d-none');
}

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    stop_spinner();
  }
});

window.addEventListener("load", function () {
  stop_spinner();
});

$('.sortable').on('click', function () {
  load_spinner();
  const sort_field_from_context = $('#sort_field_ni_table').text() ? JSON.parse($('#sort_field_ni_table').text()) : null;
  const sort_direction_from_context = $('#sort_direction_ni_table').text() ? JSON.parse($('#sort_direction_ni_table').text()) : "desc";
  const sortField = $(this).data('sort-field') ? $(this).data('sort-field').trim() : null;
  const params = new URLSearchParams(window.location.search);
  const currentField = params.get('sort_field') ? params.get('sort_field').trim() : sort_field_from_context;
  const currentDirection = params.get('sort_direction') ? params.get('sort_direction').trim() : sort_direction_from_context;

  let nextDirection = 'asc';

  if (currentField === sortField) {
    if (currentDirection === 'asc') {
      nextDirection = 'desc';
    } else if (currentDirection === 'desc') {
      params.delete('sort_field');
      params.delete('sort_direction');
      params.set('reset_sort', 'true');
      const query = params.toString();
      window.location.href = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;
      return;
    }
  }

    // Apply sorting
  params.set('sort_field', sortField);
  params.set('sort_direction', nextDirection);

  window.location.search = params.toString();
});


// Dashboard columns visibility management
var $tableDashboard = null;
var STORAGE_TABLE_DASHBOARD_KEY = null;
var $choiceColumnsModal = null;

function setColumnVisible(colIdx, visible) {
  $tableDashboard.find('tr').each(function () {
    $(this).children().eq(colIdx).toggle(visible);
  });
}

function saveColumnDashboardState() {
  const state = {};
  $('.column-toggle').each(function () {
    state[$(this).data('column')] = this.checked;
  });
  localStorage.setItem(STORAGE_TABLE_DASHBOARD_KEY, JSON.stringify(state));
}

function loadColumnDashboardState() {
  const saved = localStorage.getItem(STORAGE_TABLE_DASHBOARD_KEY);
  if (!saved) return;

  const state = JSON.parse(saved);

  Object.entries(state).forEach(([colIdx, visible]) => {
    setColumnVisible(Number(colIdx), visible);
    $('.column-toggle[data-column="' + colIdx + '"]').prop('checked', visible);
  });
}

$('.column-toggle').on('change', function () {
  const colIdx = $(this).data('column');
  const visible = this.checked;

  setColumnVisible(colIdx, visible);
  saveColumnDashboardState();
});

$(document).on('show.bs.modal', $choiceColumnsModal, function () {
  $('.column-toggle').each(function () {
    const colIdx = $(this).data('column');
    const isVisible = $tableDashboard.find('thead th').eq(colIdx).is(':visible');
    $(this).prop('checked', isVisible);
  });
});