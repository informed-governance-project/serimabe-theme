$(document).ready(function () {
    // Summernote Editor Initialization
  $review_comment = $('#id_review_comment');
  if ($review_comment.is(":disabled")) {
    $(".summernote").summernote(summernoteDisabledOptions);
  }
  else {
    $(".summernote").summernote(summernoteDefaultOptions);
  }
});