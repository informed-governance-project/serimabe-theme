$(document).ready(function () {
  $('.multiselectcheckbox').multiselect({
    maxHeight: 400,
    buttonWidth: '100%',
    widthSynchronizationMode: 'always',
    buttonTextAlignment: 'left',
    nonSelectedText: gettext('Nothing selected'),
    nSelectedText: gettext('items selected'),
    numberDisplayed: 4,
    enableClickableOptGroups: true,
    includeSelectAllOption: true,
    enableCollapsibleOptGroups: true,
    collapseOptGroupsByDefault: true,
    disableIfEmpty: true,
    selectAllValue: 0,
    templates: {
      button: '<button class="multiselect form-select dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
      option: '<button class="multiselect-option dropdown-item"></button>',
      optionGroup: '<button type="button" class="multiselect-group dropdown-item fw-bolder"></button>',
    }
  });

  const $standard = $('#id_standard');
  $standard.find('option[data-regulation]').hide();

  $('#id_regulation').on('change', function () {
    const selectedReg = $(this).val();
    $standard.find('option').each(function () {
      const regulation = $(this).data('regulation');
      if (!regulation || regulation == selectedReg) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    $standard.val('');
  });
})
