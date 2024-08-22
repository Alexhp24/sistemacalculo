$(document).ready(function () {
    var data = [
        ['CM', 0, 0, 0],
        ['CV', 0, 0, 0],
        ['CSX', 0, 0, 0],
        ['CSY', 0, 0, 0],
    ];

    var container = document.getElementById('CargaConServ');
    var hot = new Handsontable(container, {
        data: data,
        rowHeaders: true,
        colHeaders: true,
        height: 'auto',
        autoWrapRow: true,
        autoWrapCol: true,
        colWidths: 100,
        nestedHeaders: [
            ['Cargas de Servicio', 'P (Tonf)', 'Mx (Ton-m)', 'My (Ton.m)']
        ],
        collapsibleColumns: [
            { row: -1, col: 1, collapsible: false },
        ],
        licenseKey: 'non-commercial-and-evaluation'
    });

    // Captura el formulario
    $(document).ready(function () {
        $('#DataZapatageneral').on('submit', function (event) {
            event.preventDefault();
            const dataFromHandsontable = document.querySelector('#dataFromHandsontable');
            const tableData = hot.getData();
            const jsonData = JSON.stringify(tableData);

            dataFromHandsontable.value = jsonData;

            $.ajax({
                url: $(this).attr('action'),
                method: 'POST',
                data: $(this).serialize(),
                success: function (response) {
                    $('#resultadosZapataGeneral').html(response);

                },
                error: function (xhr, status, error) {
                    console.error('Error al enviar la solicitud AJAX', error);
                }
            });
        });
    });

    // const form = document.getElementById('DataZapatageneral');
    // const dataFromHandsontable = document.querySelector('#dataFromHandsontable');

    // // Agrega un manejador de eventos para el envío del formulario
    // form.addEventListener('submit', function (event) {
    //     event.preventDefault();

    //     // Obtén los datos de Handsontable y conviértelos a JSON
    //     const tableData = hot.getData();
    //     const jsonData = JSON.stringify(tableData);

    //     dataFromHandsontable.value = jsonData;
    //     const formData = new FormData(form);

    //     // Envía los datos mediante una solicitud POST AJAX
    //     $.ajax({
    //         url: $(this).attr('action'),
    //         method: 'POST',
    //         data: $(this).serialize(),
    //         success: function (response) {
    //             $('#resultadosZapataGeneral').html(response);

    //         },
    //         error: function (xhr, status, error) {
    //             console.error('Error al enviar la solicitud AJAX', error);
    //         }
    //     });

    //     // fetch('Controladores/Dzapata.php', {
    //     //     method: 'POST',
    //     //     body: formData
    //     // })
    //     //     .then(response => response.text())
    //     //     .then(data => {
    //     //         const resultadosContainer = document.getElementById('ObtenerResultados');
    //     //         resultadosContainer.innerHTML = data;
    //     //     })
    //     //     .catch(error => {
    //     //         console.error('Error al enviar la solicitud Ajax', error);
    //     //     });
    // });
});