import {
    solicitudCargaT1,
    solicitudCargaDT2,
    solicitudCargaDT3,
} from './placasFormaL/solicitudCarga.js';

import {
    formDisplay,
    flexDesignT1X,
    flexDesignT1Y,
    dataTable2x,
    dataTable2y,
} from './placasFormaL/flexDesign.js';

import {
    tableData1,
    tableData1Y,
    tableData2,
    tableData3,
    tableData3Y,
    cutDesignT1X,
    cutDesignT1Y,
} from './placasFormaL/cutDesign.js';

import { diT1X, diT1Y, diagramI } from './placasFormaL/diagramaI.js';
import { vaT1X, vaT1Y } from './placasFormaL/agrietamiento.js';
import { dcpT1X, dcpT1Y } from './placasFormaL/pureCompressionDesign.js';
import { ddT1X /* ddT1Y */ } from './placasFormaL/deslizamiento.js';
import { elT1 } from './placasFormaL/efectoLocal.js';

document.addEventListener('DOMContentLoaded', function () {
    var coll = document.getElementsByClassName('collapsible-btn');
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function () {
            var targetId = this.getAttribute('data-target');
            var content = document.getElementById(targetId);

            if (content) {
                content.classList.toggle('d-none');
            }
        });
    }
    var formDataObject = {};

    var medidaAcero = [
        {
            diametro: 6,
            areaNominal: 0.28,
            diametroCm: 0.6,
            pesoNominal: 0.222,
            pesoMinimo: 0.207,
        },
        {
            diametro: 8,
            areaNominal: 0.5,
            diametroCm: 0.8,
            pesoNominal: 0.395,
            pesoMinimo: 0.371,
        },
        {
            diametro: "ø3/8''",
            areaNominal: 0.71,
            diametroCm: 0.95,
            pesoNominal: 0.56,
            pesoMinimo: 0.526,
        },
        {
            diametro: 12,
            areaNominal: 1.13,
            diametroCm: 1.2,
            pesoNominal: 0.888,
            pesoMinimo: 0.835,
        },
        {
            diametro: "ø1/2''",
            areaNominal: 1.29,
            diametroCm: 1.27,
            pesoNominal: 0.994,
            pesoMinimo: 0.934,
        },
        {
            diametro: "ø5/8''",
            areaNominal: 2.0,
            diametroCm: 1.59,
            pesoNominal: 1.552,
            pesoMinimo: 1.459,
        },
        {
            areaNominal: 2.84,
            diametroCm: 1.9,
            pesoNominal: 2.235,
            pesoMinimo: 2.101,
        },
        {
            diametro: "ø7/8''",
            areaNominal: 3.87,
            diametroCm: 2.22,
        },
        {
            diametro: "ø1''",
            areaNominal: 5.1,
            diametroCm: 2.54,
            pesoNominal: 3.973,
            pesoMinimo: 3.735,
        },
        {
            diametro: "ø1 3/8''",
            areaNominal: 10.06,
            diametroCm: 3.49,
            pesoNominal: 7.907,
            pesoMinimo: 7.433,
        },
    ];

    var factorØ = [
        {
            description: 'Flexión',
            value: 0.9,
        },
        {
            description: 'Flexo - Compresión Normal',
            value: 0.75,
        },
        {
            description: 'Flexo - Compresión en Resorte',
            subDescription: 'Sección en Resorte',
            value: 0.7,
        },
        {
            description: 'Corte',
            value: 0.85,
        },
    ];

    var factorβ = [
        {
            description: '280',
            value: 0.85,
        },
        {
            description: '350',
            value: 0.8,
        },
        {
            description: '420',
            value: 0.75,
        },
        {
            description: '490',
            value: 0.7,
        },
        {
            description: '560',
            value: 0.65,
        },
    ];

    var factorμ = [
        {
            description: '1',
            value: 1,
        },
        {
            description: '2',
            value: 2,
        },
        {
            description: '3',
            value: 3,
        },
        {
            description: '4',
            value: 4,
        },
    ];

    // Solicitaciones de carga contenedor de la tabla 1
    var contenedor1 = document.getElementById('solicitudCargaT1');
    solicitudCargaT1(contenedor1);

    // Unique form to be used for all sheets
    // Form Element, if a input change it will update other inputs related, it create the form and add its functionality
    var exDF = 0.3;
    var eyDF = 0.3;
    var lxDF = 6;
    var lyDF = 6;
    var dxDF = 0.8 * lxDF;
    var dyDF = 0.8 * lyDF;
    var zCxDF = 1.2;
    var zCyDF = 1.2;
    var ezcxDF = 0.3;
    var ezcyDF = 0.3;
    var lnucxDF = lxDF - 2 * zCxDF;
    var lnucyDF = lyDF - 2 * zCyDF;

    var fcDF = 280;
    var fyDF = 4200;
    var generalSelect = 0.9;
    var ecDF = 1500 * Math.sqrt(fcDF);
    var esDF = 2.1 * Math.pow(10, 6);
    var ƐcDF = 0.003;
    var β1DF =
        fcDF <= 280
            ? 0.85
            : fcDF <= 350
                ? 0.8
                : fcDF <= 420
                    ? 0.75
                    : fcDF <= 490
                        ? 0.7
                        : 0.65;

    var formDF = `
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">Cargar hoja</th>
        <th class="py-2 px-4" colspan="3">
            <select
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                name="generalSelect" id="generalSelect"
                aria-label="Default select example">
                <option selected disabled>Seleccione la capa</option>
                <option value="0.9" selected>Flexión</option>
                <option value="0.85">Corte</option>
                <option value="0">Interacción</option>
                <option value="1">Agrietamiento</option>
                <option value="2">Compresión</option>
                <option value="3">Deslizamiento</option>
                <option value="4">Carga Puntual</option>
                <option value="0.75">Flexo - Comprensión Normal</option>
                <option value="0.7">Columna con Estribos</option>
                <option value="0.75">Columna con Espirales</option>
            </select>
        </th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <td colspan="4">
            <div id="generalSelectText">Ø ${generalSelect}</div>
        </td>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4" colspan="4">Propiedades Geométricas</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">ex</th>
        <th class="py-2 px-4"><input type="text" name="exDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="exDF" placeholder="0.3" min="0" value="0.3" required>
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">ey</th>
        <th class="py-2 px-4"><input type="text" name="eyDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="eyDF" value="0.30" placeholder="0.30" min="0" required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Lx</th>
        <th class="py-2 px-4"><input type="text" name="lxDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="lxDF" value="6" placeholder="6" min="0" required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4"></th>
        <th class="py-2 px-4">Ly</th>
        <th class="py-2 px-4"><input type="text" name="lyDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="lyDF" value="6" placeholder="6" min="0" required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">dx</th>
        <th class="py-2 px-4"><input type="text" name="dxDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="dxDF" value="4.8" placeholder="4.8" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">dy</th>
        <th class="py-2 px-4"><input type="text" name="dyDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="dyDF" value="4.8" placeholder="4.8" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">zCx</th>
        <th class="py-2 px-4"><input type="text" name="zcxDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="zcxDF" value="1.2" placeholder="1.2" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">zCy</th>
        <th class="py-2 px-4"><input type="text" name="zCyDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="zCyDF" value="1.2" placeholder="1.2" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">ezcx</th>
        <th class="py-2 px-4"><input type="text" name="ezcxDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="ezcxDF" value="0.3" placeholder="0.3" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">ezcy</th>
        <th class="py-2 px-4"><input type="text" name="ezcyDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="ezcyDF" value="0.3" placeholder="0.3" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Lnúcleo x</th>
        <th class="py-2 px-4"><input type="text" name="lnucxDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="lnucxDF" value="3.6" placeholder="3.6" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Lnúcleo y</th>
        <th class="py-2 px-4"><input type="text" name="lnucyDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="lnucyDF" value="3.6" placeholder="3.6" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Acwx</th>
        <th class="py-2 px-4"><input type="text" name="acwxDC"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="acwxDC" value="1.44" placeholder="1.44" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m²</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Acwy</th>
        <th class="py-2 px-4"><input type="text" name="acwyDC"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="acwyDC" value="1.44" placeholder="1.44" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">m²</th>
    </tr>

    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4" colspan="4">Propiedades Mecánicas</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">f'c</th>
        <th class="py-2 px-4"><input type="text" name="fcDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="fcDF" value="280" placeholder="280" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">kg/cm²</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">fy</th>
        <th class="py-2 px-4"><input type="text" name="fyDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="fyDF" value="4200" placeholder="4200" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">kg/cm²</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="designDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="designDF" value="0.9" placeholder="0.9" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="designDC"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="designDC" value="0.85" placeholder="0.85" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="designDFCN"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="designDFCN" value="0.85" placeholder="0.85" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="designDCEst"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="designDCEst" value="0.7" placeholder="0.7" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="designDCEsp"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="designDCEsp" value="0.75" placeholder="0.75" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="designCP"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="designCP" value="0.7" placeholder="0.7" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="agVA"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="agVA" value="2.4" placeholder="2.4" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="lgxVA"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="lgxVA" value="7.2" placeholder="7.2" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4"><input type="text" name="lgyVA"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="lgyVA" value="7.2" placeholder="7.2" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Ec</th>
        <th class="py-2 px-4"><input type="text" name="ecDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="ecDF" value="${ecDF}" placeholder="${ecDF}" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">kg/cm²</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Es</th>
        <th class="py-2 px-4"><input type="text" name="esDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="esDF" value="${esDF}" placeholder="${esDF}" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">kg/cm²</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">Ɛc</th>
        <th class="py-2 px-4"><input type="text" name="ƐcDF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="ƐcDF" value="${ƐcDF}" placeholder="${ƐcDF}" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr class="bg-white dark:bg-gray-800">
        <th class="py-2 px-4">-</th>
        <th class="py-2 px-4">β1</th>
        <th class="py-2 px-4"><input type="text" name="β1DF"
                class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                id="β1DF" value="${β1DF}" placeholder="${β1DF}" min="0"
                required
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
        </th>
        <th class="py-2 px-4">-</th>
    </tr>
    <tr>
        <th class="py-2 px-4">
            <div class="input-group mb-2">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">DISEÑAR</button>
            </div>
        </th>
    </tr>
    `;

    //--------------Diseño por Flexión---------------------
    // form Flex Desing
    var formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = formDF;

    //Cambios en el input Lx
    var lxDFElement = document.getElementById('lxDF');
    lxDFElement.addEventListener('input', function (e) {
        document.getElementById('dxDF').value = (
            0.8 * parseFloat(this.value)
        ).toFixed(2);
        document.getElementById('lnucxDF').value = (
            parseFloat(this.value) -
            2 * parseFloat(document.getElementById('zcxDF').value)
        ).toFixed(2);
    });

    //Cambios en el input Ly
    var lyDFElement = document.getElementById('lyDF');
    lyDFElement.addEventListener('input', function (e) {
        document.getElementById('dyDF').value = (
            0.8 * parseFloat(this.value)
        ).toFixed(2);
        document.getElementById('lnucyDF').value = (
            parseFloat(this.value) -
            2 * parseFloat(document.getElementById('zCyDF').value)
        ).toFixed(2);
    });

    var selectFormDF = document.getElementById('generalSelect');
    selectFormDF.addEventListener('change', function (e) {
        document.getElementById('generalSelectText').innerHTML = `Ø ${this.value}`;
        generalSelect = parseFloat(this.value);
        // Colapsar divs que no son seleccionados class="d-none"
        if (generalSelect == 0.85) {
            document.getElementById('acwyDC').classList.remove('d-none');
            document.getElementById('acwxDC').classList.remove('d-none');
        } else {
            document.getElementById('acwyDC').classList.add('d-none');
            document.getElementById('acwxDC').classList.add('d-none');
        }
    });

    //Cambios en el input f'c
    var fcDFElement = document.getElementById('fcDF');
    fcDFElement.addEventListener('input', function (e) {
        document.getElementById('ecDF').value = (
            15000 * Math.sqrt(parseFloat(this.value))
        ).toFixed(2);
        document.getElementById('β1DF').value = (
            parseFloat(this.value) <= 280
                ? 0.85
                : parseFloat(this.value) <= 350
                    ? 0.8
                    : parseFloat(this.value) <= 420
                        ? 0.75
                        : parseFloat(this.value) <= 490
                            ? 0.7
                            : 0.65
        ).toFixed(2);
    });

    formDisplay();

    // LLamada y envío de datos a las funciones exportadas para Diseño por Flexión
    var generalForm = document.getElementById('generalForm');
    generalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        //var canva = document.getElementById('graphDF');
        var formData = new FormData(this);
        var formDataObject = {};
        // Itera sobre todos los pares clave/valor en el objeto FormData
        for (var pair of formData.entries()) {
            formDataObject[pair[0]] = pair[1]; // Guarda cada par clave/valor en el objeto formDataObject
        }
        var sendInsteadDT3 = [
            ['Piso 1', 1445.64, 174.234, 1682.383, 12.576, 23.586],
            ['Piso 2', 1471.7, 133.72, 1207.14, 20.73, 34.19],
            ['Piso 3', 1369.05, 109.83, 900.41, 24.86, 38.96],
            ['Piso 4', 1265.11, 98.09, 695.02, 27.05, 41.4],
            ['Piso 4', 1160.05, 89.92, 548.43, 27.74, 41.88],
        ];
        var filtroTS2 = solicitudCargaDT2.map((subarray) => {
            return [
                subarray[0], // posición 0
                subarray[2], // posición 2
                subarray[5], // posición 5
            ];
        });

        var sendInsteadFiltroTS2 = [
            [1573.0, 15.26, 2.981],
            [1246.4, 608.848, 23.586],
            [1408.222, -583.572, -18.691],
            [1208.982, 1682.383, 9.426],
            [1445.64, -1657.107, -4.531],
            [1246.4, 608.848, 23.586],
            [1408.222, -583.572, -18.691],
            [1208.982, 1682.383, 9.426],
            [1445.64, -1657.107, -4.531],
            [615.518, 601.995, 22.181],
            [777.34, -590.425, -20.096],
            [578.1, 1675.53, 8.021],
            [814.758, -1663.96, -5.936],
            [615.518, 601.995, 22.181],
            [777.34, -590.425, -20.096],
            [578.1, 1675.53, 8.021],
            [814.758, -1663.96, -5.936],
            [1471.699, -12.551, 8.622],
            [1162.94, 417.648, 34.194],
            [1320.915, -438.453, -20.047],
            [1126.251, 1201.523, 16.046],
            [1357.604, -1222.328, -1.899],
            [1162.94, 417.648, 34.194],
            [1320.915, -438.453, -20.047],
            [1126.251, 1201.523, 16.046],
            [1357.604, -1222.328, -1.899],
            [572.978, 423.262, 30.114],
            [730.953, -432.839, -24.126],
            [536.289, 1207.137, 11.967],
            [767.642, -1216.715, -5.979],
            [572.978, 423.262, 30.114],
            [730.953, -432.839, -24.126],
            [536.289, 1207.137, 11.967],
            [767.642, -1216.715, -5.979],
        ];

        if (formDataObject.generalSelect == 0.9) {
            var contenedorX = document.getElementById('flexDesingT1X');
            var contenedorY = document.getElementById('flexDesingT1Y');
            /* flexDesignT1(contenedor, solicitudCargaDT3, formDataObject); */
            flexDesignT1X(contenedorX, solicitudCargaDT3, formDataObject);
            flexDesignT1Y(contenedorY, solicitudCargaDT3, formDataObject);
            document.getElementById('content2').classList.remove('d-none');
            document.getElementById('content3').classList.add('d-none');
            document.getElementById('content4').classList.add('d-none');
            document.getElementById('content5').classList.add('d-none');
            document.getElementById('content6').classList.add('d-none');
            document.getElementById('content7').classList.add('d-none');
            document.getElementById('content8').classList.add('d-none');
            /* flexDesingT1 */
            /* dibujarLine(canva); */
        } else if (formDataObject.generalSelect == 0.85) {
            //--------------Envío de datos (contenedor, solicitaciones de carga, a Diseño por Flexión)---------------------

            //--------------Diseño por Corte---------------------

            // LLamada y envío de datos a las funciones exportadas para Diseño por Corte
            var contenedorX = document.getElementById('cutDesingT1X');
            var contenedorY = document.getElementById('cutDesingT1Y');
            /* flexDesignT1(contenedor, solicitudCargaDT3, formDataObject); */
            cutDesignT1X(contenedorX, solicitudCargaDT3, formDataObject);
            cutDesignT1Y(contenedorY, solicitudCargaDT3, formDataObject);
            document.getElementById('content2').classList.add('d-none');
            document.getElementById('content3').classList.remove('d-none');
            document.getElementById('content4').classList.add('d-none');
            document.getElementById('content5').classList.add('d-none');
            document.getElementById('content6').classList.add('d-none');
            document.getElementById('content7').classList.add('d-none');
            document.getElementById('content8').classList.add('d-none');
            /* flexDesingT1 */
            /* dibujarLine(canva); */
            //--------------Envío de datos (contenedor, solicitaciones de carga, a Diseño por Corte)---------------------
        } else if (formDataObject.generalSelect == 0) {
            //------Envío de datos (contenedor, solicitaciones de carga, a Diagrama de interacción)--------------
            var contenedorX = document.getElementById('diT1X');
            var contenedorY = document.getElementById('diT1Y');
            if (tableData1 == []) {
                alert('Llene datos en la tabla 1 X-X de diseño corte');
                return;
            }
            if (tableData1Y == []) {
                alert('Llene datos en la tabla 1 Y-Y de diseño corte');
                return;
            }
            if (dataTable2x == []) {
                alert('Llene datos en la tabla 2 X-X de diseño flexión');
                return;
            }
            if (dataTable2y == []) {
                alert('Llene datos en la tabla 2 Y-Y de diseño flexión');
                return;
            }
            if (tableData3 == []) {
                alert('Llene datos en la tabla 3 X-X de diseño corte');
                return;
            }
            if (tableData3Y == []) {
                alert('Llene datos en la tabla 3 Y-Y de diseño corte');
                return;
            }
            diT1X(
                contenedorX,
                solicitudCargaDT3,
                tableData1,
                dataTable2x,
                tableData3,
                formDataObject
            );
            diT1Y(
                contenedorY,
                solicitudCargaDT3,
                tableData1Y,
                dataTable2y,
                tableData3Y,
                formDataObject
            );
            diagramI(filtroTS2);
            document.getElementById('content2').classList.add('d-none');
            document.getElementById('content3').classList.add('d-none');
            document.getElementById('content4').classList.remove('d-none');
            document.getElementById('content5').classList.add('d-none');
            document.getElementById('content6').classList.add('d-none');
            document.getElementById('content7').classList.add('d-none');
            document.getElementById('content8').classList.add('d-none');
            // diT1Y(contenedorY, sendInsteadDT3, formDataObject);
            //------Envío de datos (contenedor, solicitaciones de carga, a Diagrama de interacción)--------------
        } else if (formDataObject.generalSelect == 1) {
            //------Envío de datos (contenedor, solicitaciones de carga, a Verificación por Agrietamiento)--------------
            document.getElementById('content2').classList.add('d-none');
            document.getElementById('content3').classList.add('d-none');
            document.getElementById('content4').classList.add('d-none');
            document.getElementById('content5').classList.remove('d-none');
            document.getElementById('content6').classList.add('d-none');
            document.getElementById('content7').classList.add('d-none');
            document.getElementById('content8').classList.add('d-none');
            var contenedorX = document.getElementById('vaT1X');
            var contenedorY = document.getElementById('vaT1Y');
            vaT1X(contenedorX, solicitudCargaDT3, formDataObject);
            vaT1Y(contenedorY, solicitudCargaDT3, formDataObject);
            //------Envío de datos (contenedor, solicitaciones de carga, a Verificación por Agrietamiento)--------------
        } else if (formDataObject.generalSelect == 2) {
            //------Envío de datos (contenedor, solicitaciones de carga, a Diseño de de compresión Pura)--------------
            document.getElementById('content2').classList.add('d-none');
            document.getElementById('content3').classList.add('d-none');
            document.getElementById('content4').classList.add('d-none');
            document.getElementById('content5').classList.add('d-none');
            document.getElementById('content6').classList.remove('d-none');
            document.getElementById('content7').classList.add('d-none');
            document.getElementById('content8').classList.add('d-none');
            var contenedorX = document.getElementById('dcpT1X');
            var contenedorY = document.getElementById('dcpT1Y');
            dcpT1X(contenedorX, solicitudCargaDT3, formDataObject, tableData1);
            dcpT1Y(contenedorY, solicitudCargaDT3, formDataObject, tableData1);
            //------Envío de datos (contenedor, solicitaciones de carga, a Diseño de de compresión Pura)--------------
        } else if (formDataObject.generalSelect == 3) {
            //------Envío de datos (contenedor, solicitaciones de carga, a Diseño por Deslizamiento)--------------
            var contenedorX = document.getElementById('ddT1X');
            var contenedorY = document.getElementById('ddT1Y');
            document.getElementById('content2').classList.add('d-none');
            document.getElementById('content3').classList.add('d-none');
            document.getElementById('content4').classList.add('d-none');
            document.getElementById('content5').classList.add('d-none');
            document.getElementById('content6').classList.add('d-none');
            document.getElementById('content7').classList.remove('d-none');
            document.getElementById('content8').classList.add('d-none');
            ddT1X(
                contenedorX,
                solicitudCargaDT3,
                formDataObject,
                tableData3,
                tableData3Y
            );
            /* ddT1Y(
              contenedorY,
              sendInsteadDT3,
              formDataObject,
              tableData3,
              tableData3Y
            ); */
            //------Envío de datos (contenedor, solicitaciones de carga, a Diseño por Deslizamiento)--------------
        } else if (formDataObject.generalSelect == 4) {
            //------Envío de datos (contenedor, solicitaciones de carga, a Efecto Local -Carga Puntual)--------------
            var contenedor = document.getElementById('elT1');
            document.getElementById('content2').classList.add('d-none');
            document.getElementById('content3').classList.add('d-none');
            document.getElementById('content4').classList.add('d-none');
            document.getElementById('content5').classList.add('d-none');
            document.getElementById('content6').classList.add('d-none');
            document.getElementById('content7').classList.add('d-none');
            document.getElementById('content8').classList.remove('d-none');
            elT1(contenedor, formDataObject, tableData1);
            //------Envío de datos (contenedor, solicitaciones de carga, a Efecto Local -Carga Puntual)--------------
        }
    });
});