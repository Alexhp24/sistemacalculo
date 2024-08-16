$(document).ready(function () {
    $("#datamurosAlb").submit(function (event) {
        event.preventDefault();
        // var formData = $(this).serialize();
        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                console.log(response);
                $("#resultadoMalba").html(response);
            }
        });
    });
});