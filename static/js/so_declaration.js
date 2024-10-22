$(document).ready(function () {
  $('.delete_so_declaration').on( "click", function() {
    let $this = $(this);
    let modalDeleteButton = $("#modal-delete-declaration-button");
    let deleteUrlBase = $this.data('delete-url');
    let standardAnswerId = $this.data('standard-answer-id');
    let deleteUrl = deleteUrlBase.replace('0', standardAnswerId);
    modalDeleteButton.attr('href', deleteUrl);
  });

  $('.copy_so_declaration').on( "click", function() {
    let $this = $(this);
    let standardAnswerId = $this.data('standard-answer-id');
    let $popup = $("#copy_so_declaration");
    let popup_url = `/securityobjectives/copy/${standardAnswerId}`;
  
    $(".modal-dialog", $popup).load(popup_url, function () {
        $popup.modal("show");
    });
  });
})

function update_so_answer(form){
    const csrftoken = $('input[name=csrfmiddlewaretoken]').val();
    const id = form.name.split('-').shift();
    const name = form.name.split('-').pop();
    if (form.checked !== undefined) form.value = form.checked; 
    if (form.value) {
      data = JSON.stringify({"id":id, [name]:form.value});
      url = window.location.href.split(window.location.host).pop();   
    
      fetch(url, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
          },
          body: data
        })
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
}