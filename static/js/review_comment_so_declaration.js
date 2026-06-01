$(document).ready(function () {
    // Summernote Editor Initialization
  document.body.appendChild(summernoteScript);
  $review_comment = $('#id_review_comment');
  if ($review_comment.is(":disabled")) {
    $review_comment.summernote(summernoteDisabledOptions);
  }
  else {
    summernoteScript.onload = () => $review_comment.summernote(summernoteDefaultOptions);
  }
});