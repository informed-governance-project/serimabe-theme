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
})
