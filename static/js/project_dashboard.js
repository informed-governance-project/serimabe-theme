$(document).ready(function () {
  // Dashboard columns sort management
  sort_field_from_context = $('#sort_field_project_dashboard_table').text() ? JSON.parse($('#sort_field_project_dashboard_table').text()) : null,
  sort_direction_from_context = $('#sort_project_dashboard_table').text() ? JSON.parse($('#sort_project_dashboard_table').text()) : "desc",

  initSortableHeaders(
    {
      sortField: sort_field_from_context,
      sortDirection: sort_direction_from_context,
    }
  );

  $(document).on("change", ".company-project-input", function () {
    onChangeCompanyProject(this);
  });

});

function onChangeCompanyProject(input) {
  const $this = $(input)
  const id = $this.data("company-project-id");
  const csrftoken = getCsrftoken();
  const url = `/reporting/company_project/${id}/update`
  const fieldName = $this.attr("name");
  const fieldValue = $this.is(":checked");
  const data = {
    field: fieldName,
    value: fieldValue,
  }
  $this.prop("disabled", true);

  $.ajax({
    type: "POST",
    url: url,
    data: data,
    headers: {
      "X-CSRFToken": csrftoken
    },
    error: function (error) {
      console.log(error);
    },
    complete: function () {
      $this.prop("disabled", false);
    }
  });
}
