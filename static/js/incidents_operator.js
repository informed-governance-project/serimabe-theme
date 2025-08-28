$(document).ready(function () {
    $(document).on("click", '.workflow_comment', function () {
        let $this = $(this);
        let workflowComment = $this.data('workflow-comment');
        let $modalWorkflowComment = $('#modal-workflow-comment');
        $modalWorkflowComment.html(workflowComment);
    });
});
