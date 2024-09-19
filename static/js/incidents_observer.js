$(document).ready(function () {
    $('.contacts_incident').on("click", function () {
        let $this = $(this);
        const contacts = $this.data('contacts');
        if (contacts.contact_name == contacts.technical_name) {
            $('#technical-card').remove();
            let both_subtitle = $('#translated-both-contact-text').text();
            $('#card-subtitle-contact').text(both_subtitle);
        }

        $('#contact-name').text(contacts.contact_name);
        $('#contact-email').text(contacts.contact_email);
        $('#contact-telephone').text(contacts.contact_telephone);
        $('#technical-name').text(contacts.technical_name);
        $('#technical-email').text(contacts.technical_email);
        $('#technical-telephone').text(contacts.technical_telephone);
    });
});