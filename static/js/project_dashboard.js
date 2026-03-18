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

});
