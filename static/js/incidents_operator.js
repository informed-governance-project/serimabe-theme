$(document).ready(function () {
  $(document).on("click", '.workflow_comment', function () {
    let $this = $(this);
    let workflowComment = decodeUnicodeEscapes($this.attr('data-workflow-comment'));
    workflowComment = htmlDecode(workflowComment);
    let $modalWorkflowComment = $('#workflow_comment').find('#modal-workflow-comment');
    $modalWorkflowComment.val(workflowComment);
  });
});
