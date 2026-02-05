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
    var $popup = $("#import_so_declaration");
    var popup_url = '/securityobjectives/import';

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
  const currentSortField = new URLSearchParams(window.location.search).get('sort_field');
  const currentSortDirection = new URLSearchParams(window.location.search).get('sort_direction') || 'desc';

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
    if ( currentSortField === null && $th.hasClass('default-sort-field')) {
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
  const sortField = $(this).data('sort-field') ? $(this).data('sort-field').trim() : null;
  const params = new URLSearchParams(window.location.search);

  const currentField = params.get('sort_field') ? params.get('sort_field').trim() : null;
  const currentDirection = params.get('sort_direction') ? params.get('sort_direction').trim() : null;

  let nextDirection = 'asc';

  if (currentField === sortField) {
    if (currentDirection === 'asc') {
      nextDirection = 'desc';
    } else if (currentDirection === 'desc') {
      params.delete('sort_field');
      params.delete('sort_direction');
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