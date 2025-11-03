$(document).ready(function () {
  const $workflow = $('#id_workflow');
  $workflow.find('option[data-regulation]').hide();

  $('#id_regulation').on('change',function () {
    const selectedReg = $(this).val();
    $workflow.find('option').each(function () {
      const wfReg = $(this).data('regulation');
      if (!wfReg || wfReg == selectedReg) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    $workflow.val('');
  });
});




