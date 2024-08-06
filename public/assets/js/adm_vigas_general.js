$(document).ready(function () {
    document.getElementById('num_tramos').addEventListener('input', function () {
        const numTramos = parseInt(this.value);
        const tbody = document.querySelector('#LuzLibreTramo tbody');
        const trs = tbody.querySelectorAll('tr:not(.bg-primary)');

        trs.forEach(tr => {
            const tds = tr.querySelectorAll('td');
            if (tds.length > numTramos) {
                for (let i = numTramos; i < tds.length; i++) {
                    tds[i].remove();
                }
            } else {
                numLuz = (numTramos)
                for (let i = tds.length; i < numLuz; i++) {
                    const td = document.createElement('td');
                    const uniqueName = generateUniqueName(); // Generar un nombre único
                    const inputContainer = document.createElement('div');
                    inputContainer.classList.add('input-container');
                    if (tr.querySelector('th').textContent.includes('LUZ LIBRE m')) {
                        const cellIndex = td.cellIndex;
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'Luz_Libre' + (i + 1); // Asignar nombre único
                        input.placeholder = 'LL';
                        input.value = "2.7";
                        input.setAttribute('maxlength', '6'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    }
                    tr.appendChild(td);
                }
            }
        });
    });

    document.getElementById('num_tramos').addEventListener('input', function () {
        const numTramos = parseInt(this.value);
        const tbody = document.querySelector('#tablaTramos tbody');
        const trs = tbody.querySelectorAll('tr:not(.bg-primary)');

        // Eliminar columnas td en exceso y rellenar los inputs en N° CAPAS y ACERO para NEGATIVO
        // y las filas correspondientes a las filas con "(+)" para POSITIVO
        trs.forEach(tr => {
            const tds = tr.querySelectorAll('td');
            if (tds.length > numTramos * 3) {
                for (let i = numTramos * 3; i < tds.length; i++) {
                    tds[i].remove();
                }
            } else {
                numTramoss = (numTramos * 3)
                for (let i = tds.length; i < numTramoss; i++) {
                    const td = document.createElement('td');
                    const uniqueName = generateUniqueName(); // Generar un nombre único
                    const inputContainer = document.createElement('div');
                    inputContainer.classList.add('input-container');
                    if (tr.querySelector('th').textContent === 'EJE') {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.name = 'EJE' + (i + 1); // Asignar nombre único
                        input.placeholder = 'EJE';
                        input.setAttribute('maxlength', '6'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent === 'BASE (m)') {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'BASE' + (i + 1); // Asignar nombre único
                        input.placeholder = 'BASE';
                        input.value = "40";
                        input.setAttribute('maxlength', '6'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent === 'ALTURA (m)') {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'ALTURA' + (i + 1); // Asignar nombre único
                        input.placeholder = 'ALTURA';
                        input.value = "90";
                        input.setAttribute('maxlength', '6'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('MU (TN-M)-')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'MomentoUltimo-' + (i + 1); // Asignar nombre único
                        input.placeholder = 'MomentoUltimo-';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('MU (TN-M)+')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'MomentoUltimo+' + (i + 1); // Asignar nombre único
                        input.placeholder = 'MomentoUltimo+';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('Vu (TNF)-')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'Vu-' + (i + 1); // Asignar nombre único
                        input.placeholder = 'Vu-';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('Vu (TNF)+')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'Vu+' + (i + 1); // Asignar nombre único
                        input.placeholder = 'Vu+';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('Tu (TNF)-')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'Tu-' + (i + 1); // Asignar nombre único
                        input.placeholder = 'Tu-';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('Tu (TNF)+')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'Tu+' + (i + 1); // Asignar nombre único
                        input.placeholder = 'Tu+';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('M(CV)(tn.m)+')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'MuCV+' + (i + 1); // Asignar nombre único
                        input.placeholder = 'MCV+';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('M(CV)(tn.m)-')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'MuCV-' + (i + 1); // Asignar nombre único
                        input.placeholder = 'MCV-';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-503', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('M(CM)(tn.m)+')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'MuCM+' + (i + 1); // Asignar nombre único
                        input.placeholder = 'MCM+';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('M(CM)(tn.m)-')) {
                        // Agregar input de tipo número en la fila "MU (TN-M)"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.step = 'any';
                        input.name = 'MuCM-' + (i + 1); // Asignar nombre único
                        input.placeholder = 'MCM-';
                        input.setAttribute('maxlength', '10'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                    } else if (tr.querySelector('th').textContent.includes('N° CAPAS-')) {
                        // Agregar input de tipo número en las filas "N° CAPAS"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.name = 'CAPAS-' + (i + 1); // Asignar nombre único
                        input.id = 'CAPAS-' + (i + 1);
                        input.placeholder = 'CAPAS-';
                        input.setAttribute('maxlength', '6'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                        const idCapasNegativo = input.id;
                    } else if (tr.querySelector('th').textContent.includes('N° CAPAS+')) {
                        // Agregar input de tipo número en las filas "N° CAPAS" y "ACERO" "|| tr.querySelector('th').textContent.includes('ACERO')"
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.name = 'CAPAS+' + (i + 1); // Asignar nombre único
                        input.id = 'CAPAS+' + (i + 1);
                        input.placeholder = 'CAPAS+';
                        input.setAttribute('maxlength', '6'); // Limitar a 4 dígitos
                        input.style.width = '15ch'; // Establecer el ancho para acomodar 6 números
                        input.classList.add('form-control', 'w-full', 'bg-gray-50', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-50', 'px-1', 'rounded-md', 'text-center'); // Agregar clase para reducir el tamaño
                        td.appendChild(input);
                        idPositivo = input.id;
                    }
                    tr.appendChild(td);
                }
            }
        });
    });


    // Función para generar un nombre de entrada único
    function generateUniqueName() {
        return 'input_' + Date.now();
    }
    //Aceros y Momentos negativos
    let sumas = [];
    let mnnegativos = [];
    //Aceros y Momentos Positivos
    let sumaspos = [];
    let mnpositivos = [];
    //=================================NEGATIVOS========================================//
    function handleSelectChange(e) {
        const fc = document.getElementById('fc').value;
        const fy = document.getElementById('fy').value;
        const tramos = document.getElementById('num_tramos').value;
        const bases = [];
        const alturas = [];
        const momentosUltimos = [];
        mnnegativos = [];
        const vus = [];
        const tus = [];
        const muCMs = [];
        const muCvs = [];
        const capasnegativas = [];
        for (let i = 1; i <= tramos * 3; i++) {
            const baseValue = document.querySelector(`input[name="BASE${i}"]`).value;
            bases.push(parseFloat(baseValue));

            const alturaValue = document.querySelector(`input[name="ALTURA${i}"]`).value;
            alturas.push(parseFloat(alturaValue));

            const momentoUltimoValue = document.querySelector(`input[name="MomentoUltimo-${i}"]`).value;
            momentosUltimos.push(parseFloat(momentoUltimoValue));

            const vuValue = document.querySelector(`input[name="Vu-${i}"]`).value;
            vus.push(parseFloat(vuValue));

            const tuValue = document.querySelector(`input[name="Tu-${i}"]`).value;
            tus.push(parseFloat(tuValue));

            const muCMValue = document.querySelector(`input[name="MuCM-${i}"]`).value;
            muCMs.push(parseFloat(muCMValue));

            const muCvValue = document.querySelector(`input[name="MuCV-${i}"]`).value;
            muCvs.push(parseFloat(muCvValue));

            const capaneg = document.querySelector(`input[name="CAPAS-${i}"]`).value;
            capasnegativas.push(parseFloat(capaneg));
        }

        if (e.target.tagName.toLowerCase() === 'select') {
            console.log(`El valor seleccionado para ${e.target.name} es ${e.target.value}`);

            const momentoUltimo = 'Mn= (0.85 * 𝑓^′ c * b * a) * (d-\\frac{a}{2})';
            // Create the table header row
            let template = `
              <table class="table table-hover" id="vigaspdf">
                <thead>
                 
                </thead>
                <tbody>
            `;

            sumas = Array(tramos * 3).fill(0);
            const valorMaximo = Math.max(...capasnegativas);

            // Iterate through tramos and layers
            for (let i = 0; i < valorMaximo; i++) {
                // Dynamically create and append Tipo Acero TDs
                for (let j = 0; j < tramos * 3; j++) {
                    const selectElement = parseFloat(document.getElementById(`tipoAcero${j}_capa${i}`).value);
                    sumas[j] += selectElement;
                }
            }

            sumas = sumas.map(sumas => Math.round(sumas * 100) / 100);
            //{ value: '7.916', text: '4Ø5/8"' },
            //{ value: '1.979', text: 'Ø 5/8" cm²' },
            let as_realNegativos = [];
            let Verifnevativos = [];
            let ds = []; // Definir array ds
            let parfres = [];
            let As_maxs = [];
            let As_usars = [];
            let Ass = [];
            let As_mins = [];
            let As_balanceados = [];
            let als = [];

            for (let i = 0; i < tramos * 3; i++) {
                let parfre = 0;
                if (fc <= 280) {
                    parfre = 0.85;
                } else if (fc > 280 && fc <= 560) {
                    parfre = 1.05 - 0.714 * fc / 1000;
                } else {
                    parfre = 0.65;
                }
                parfres.push(parfre);

                switch (capasnegativas[i]) {
                    case 1:
                        d = alturas[i] - 6;
                        break;
                    case 2:
                        d = alturas[i] - 8;
                        break;
                    case 3:
                        d = alturas[i] - 10;
                        break;
                    case 4:
                        d = alturas[i] - 12;
                        break;
                    case 5:
                        d = alturas[i] - 14;
                        break;
                    case 6:
                        d = alturas[i] - 16;
                        break;
                    default:
                        d = alturas[i];
                }
                ds.push(d);

                var as_realNegativo = (sumas[i] * fy / (0.85 * fc * bases[i]));
                // console.log(as_realNegativo)
                as_realNegativos.push(as_realNegativo);

                let mnmnnegativo = (0.90 * (0.85 * fc * bases[i] * as_realNegativo) * (ds[i] - (as_realNegativo / 2)) / 100000);
                mnnegativos.push(mnmnnegativo); // Agregar mn al array mns

                //altura del bloque
                var a = (d - Math.sqrt(Math.pow(d, 2) - 2 * Math.abs(momentosUltimos[i] * Math.pow(10, 5)) / (0.90 * 0.85 * fc * bases[i])));
                als.push(a);
                //refuerzo calculado
                var As = ((0.85 * fc * bases[i] * a) / fy);
                Ass.push(As);
                //refuerzo minimo
                var As_min = (Math.max(0.7 * Math.sqrt(fc) / fy * bases[i] * d, 14 * bases[i] * d / fy)).toFixed(2);
                As_mins.push(As_min);
                //as balanceado
                var As_bal = (((0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * d)).toFixed(2);
                As_balanceados.push(As_bal);
                //refuero maximo As Max
                var As_max = (0.75 * (0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * d).toFixed(2);
                As_maxs.push(As_max);
                //As Usar

                let As_usar = 0;
                if (parseFloat(As) < parseFloat(As_min)) {
                    As_usar = parseFloat(As_min);
                } else if (parseFloat(As) > parseFloat(As_min) && parseFloat(As) < parseFloat(As_max)) {
                    As_usar = parseFloat(As);
                } else {
                    As_usar = parseFloat(As_max);
                }
                As_usars.push(As_usar)

                let Verifnevativo = "";
                if (sumas[i] < As_maxs[i] && sumas[i] >= As_usars[i]) {
                    Verifnevativo = "CUMPLE";
                } else {
                    Verifnevativo = "NO CUMPLE";
                }

                Verifnevativos.push(Verifnevativo);
            }


            template += `
                <tr>
                    <td class='py-2 px-8'>Acero Real</td>
                    <td class='py-2 px-8'>As</td>
                    <td class='py-2 px-8'></td>
                    <td class='py-2 px-8'>𝐴𝑠=(0.85∗𝑓^′ 𝑐∗𝑏∗𝑎)/𝑓𝑦</td>
                    <td class='py-2 px-8'></td>
                    ${sumas.map(selectElement => `<td class='text-center'>${selectElement.toFixed(2)} cm</td>`).join('')}
                </tr>
                <tr>
                    <td class='py-2 px-8'>momento resistente en "tonf-m"</td>
                    <td class='py-2 px-8'>ФMn</td>
                    <td class='py-2 px-8'></td>
                    <td class='py-2 px-8'>\\(${momentoUltimo}\\)</td>
                    <td class='py-2 px-8'></td>
                    ${mnnegativos.map(mnnegativo => `<td class='text-center'>${mnnegativo.toFixed(2)}</td>`).join('')}
                </tr>
                <tr>
                    <td class='py-2 px-8'>Verifificacion</td>
                    <td class='py-2 px-8'>Verif.</td>
                    <td class='py-2 px-8'></td>
                    <td class='py-2 px-8'></td>
                    <td class='py-2 px-8'></td>
                    ${Verifnevativos.map(Verifnevativo => `<td class='text-center'>${Verifnevativo}</td>`).join('')}
                </tr>
                </tbody>
              </table>
            `;

            document.getElementById('calc_vigas_verficado').innerHTML = template;
            MathJax.typeset();
        }
    }

    // Agregar un evento 'change' al elemento padre
    document.getElementById('calc_vigas_negativos').addEventListener('change', handleSelectChange);
    //=================================POSITIVOS========================================//
    //Función para manejar el cambio de selección
    function handleSelectChange_post(e) {
        // ... (Previous code to get tramos)
        const fc = parseFloat(document.getElementById('fc').value);
        const fy = parseFloat(document.getElementById('fy').value);
        const tramos = document.getElementById('num_tramos').value;
        const bases = [];
        const alturas = [];
        const momentosUltimosPositivos = [];
        const momentosUltimos = [];
        mnpositivos = [];
        const vusPositivos = [];
        const tusPositivos = [];
        const muCMsPositivos = [];
        const muCvsPositivos = [];
        const capapositivos = []; // Declarar como array

        // Capturar los valores de los inputs que contienen un "+" en su nombre
        for (let i = 1; i <= tramos * 3; i++) {
            const baseValue = document.querySelector(`input[name="BASE${i}"]`).value;
            bases.push(parseFloat(baseValue));

            const alturaValue = document.querySelector(`input[name="ALTURA${i}"]`).value;
            alturas.push(parseFloat(alturaValue));

            const muCMValue = document.querySelector(`input[name="MuCM+${i}"]`).value;
            muCMsPositivos.push(parseFloat(muCMValue));

            const muCvValue = document.querySelector(`input[name="MuCV+${i}"]`).value;
            muCvsPositivos.push(parseFloat(muCvValue));

            const momentoUltimoValue = document.querySelector(`input[name="MomentoUltimo+${i}"]`).value;
            momentosUltimosPositivos.push(parseFloat(momentoUltimoValue));

            const momentoUltimoValueneg = document.querySelector(`input[name="MomentoUltimo-${i}"]`).value;
            momentosUltimos.push(parseFloat(momentoUltimoValueneg));


            const vuValue = document.querySelector(`input[name="Vu+${i}"]`).value;
            vusPositivos.push(parseFloat(vuValue));

            const tuValue = document.querySelector(`input[name="Tu+${i}"]`).value;
            tusPositivos.push(parseFloat(tuValue));

            const capapo = document.querySelector(`input[name="CAPAS+${i}"]`).value;
            capapositivos.push(parseFloat(capapo));

        }

        if (e.target.tagName.toLowerCase() === 'select') {
            console.log(`El valor seleccionado para ${e.target.name} es ${e.target.value}`);
            const momentoUltimo = 'Mn= (0.85 * 𝑓^′ c * b * a) * (d-\\frac{a}{2})';

            sumaspos = Array(tramos * 3).fill(0);
            const valorMaximopos = Math.max(...capapositivos);
            // Create the table header row
            let template = `
              <table class="table table-hover" id="vigaspdf">
                <thead>

                </thead>
                <tbody>
            `;

            // Iterate through tramos and layers
            for (let i = 0; i < valorMaximopos; i++) {
                // Dynamically create and append Tipo Acero TDs
                for (let j = 0; j < tramos * 3; j++) {
                    const selectElementpost = parseFloat(document.getElementById(`tipoAceroB${j}_capa${i}`).value);
                    sumaspos[j] += selectElementpost;
                }
            }
            sumaspos = sumaspos.map(sumaspos => Math.round(sumaspos * 100) / 100);

            let parfres = [];
            let as_realPositivos = [];
            let Verifpositivos = [];
            let ds = []; // Definir array ds
            let musdivpos = [];
            let muspos = [];
            let dpos = [];
            let apos = [];
            let Asspos = [];
            let As_minpos = [];
            let As_maxpos = [];
            let As_balpos = [];
            let As_usarpos = [];

            for (let i = 0; i < tramos * 3; i++) {
                let parfre = 0;
                if (fc <= 280) {
                    parfre = 0.85;
                } else if (fc > 280 && fc <= 560) {
                    parfre = 1.05 - 0.714 * fc / 1000;
                } else {
                    parfre = 0.65;
                }
                parfres.push(parfre);

                var dpo = 0;
                switch (capapositivos[i]) {
                    case 1:
                        dpo = alturas[i] - 6;
                        break;
                    case 2:
                        dpo = alturas[i] - 8;
                        break;
                    case 3:
                        dpo = alturas[i] - 10;
                        break;
                    case 4:
                        dpo = alturas[i] - 12;
                        break;
                    case 5:
                        dpo = alturas[i] - 14;
                        break;
                    case 6:
                        dpo = alturas[i] - 16;
                        break;
                }
                dpos.push(dpo);

                var as_realPositivo = (sumaspos[i] * fy / (0.85 * fc * bases[i]));
                // console.log(as_realPositivo)
                as_realPositivos.push(as_realPositivo);

                let mnpositivo = (0.90 * (0.85 * fc * bases[i] * as_realPositivo) * (dpos[i] - (as_realPositivo / 2)) / 100000);
                mnpositivos.push(mnpositivo); // Agregar mn al array mns

                var musdivpo = (-momentosUltimos[i] / 3);
                musdivpos.push(musdivpo);

                //Mu (-) usar
                var muspo = 0;
                if (momentosUltimosPositivos[i] > musdivpos[i]) {
                    muspo = momentosUltimosPositivos[i];
                } else {
                    muspo = musdivpos[i];
                }
                muspos.push(muspo);

                var apo = (dpos[i] - Math.sqrt(Math.pow(dpos[i], 2) - 2 * Math.abs(muspos[i] * Math.pow(10, 5)) / (0.90 * 0.85 * fc * bases[i])));

                apos.push(apo);

                var Asspo = ((0.85 * fc * bases[i] * apos[i]) / fy);

                var As_minpo = (Math.max(0.7 * Math.sqrt(fc) / fy * bases[i] * dpos[i], 14 * bases[i] * dpos[i] / fy));
                As_minpos.push(As_minpo)

                var As_balpo = ((0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * dpos[i]);
                As_balpos.push(As_balpo)

                var As_maxpo = (0.75 * (0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * dpos[i]);
                As_maxpos.push(As_maxpo)

                let As_usarpo = 0;
                if (parseFloat(Asspo) < parseFloat(As_minpo)) {
                    As_usarpo = parseFloat(As_minpo);
                    // console.log(As_usarpo)
                } else if (parseFloat(Asspo) > parseFloat(As_minpo) && parseFloat(Asspo) < parseFloat(As_maxpo)) {
                    As_usarpo = parseFloat(Asspo);
                    // console.log(As_usarpo)
                } else {
                    As_usarpo = parseFloat(As_maxpo);
                    // console.log(As_usarpo)
                }
                As_usarpos.push(As_usarpo)

                let Verifpositivo = "";
                if (sumaspos[i] < As_maxpos[i] && sumaspos[i] >= As_usarpos[i]) {
                    Verifpositivo = "CUMPLE";
                } else {
                    Verifpositivo = "NO CUMPLE";
                }

                Verifpositivos.push(Verifpositivo);

            }

            template += `
                <tr>
                    <td class='py-2 px-8'>Acero Real</td>
                    <td class='py-2 px-8'>As</td>
                    <td class='py-2 px-8'></td>
                    <td class='py-2 px-8'></td>
                    ${sumaspos.map(selectElementpost => `<td class='text-center'>${selectElementpost.toFixed(2)} cm</td>`).join('')}
                </tr>
                <tr>
                    <td class='py-2 px-8'>momento resistente en "tonf-m"</td>
                    <td class='py-2 px-8'>ФMn</td>
                    <td class='py-2 px-8'></td>
                    <td class='py-2 px-8'>\\(${momentoUltimo}\\)</td>
                    ${mnpositivos.map(mnpositivo => `<td class='text-center'>${mnpositivo.toFixed(2)}</td>`).join('')}
                </tr>
                <tr>
                    <td class='py-2 px-8'>Verifificacion</td>
                    <td class='py-2 px-8'>Verif.</td>
                    <td class='py-2 px-8'></td>
                    <td class='py-2 px-8'></td>
                    ${Verifpositivos.map(Verifpositivo => `<td class='text-center'>${Verifpositivo}</td>`).join('')}
                </tr>
                </tbody>
              </table>
            `;

            document.getElementById('calc_vigas_verficado_pos').innerHTML = template;
            MathJax.typeset();
        }
    }
    // Agregar un evento 'change' al elemento padre
    document.getElementById('calc_vigas_positivos').addEventListener('change', handleSelectChange_post);

    function calcularPrimerUltimoValorPorTramo(mnnegativos) {
        let resultados = [];
        const tramos = parseInt(document.getElementById('num_tramos').value);
        const tamañoTramo = 3; // Cada tramo consta de 3 elementos

        for (let i = 0; i < tramos; i++) {
            // Calcular los índices para el primer y último valor del tramo actual
            let indiceInicio = i * tamañoTramo;
            let indiceFin = indiceInicio + tamañoTramo - 1;

            // Asegurarse de que no excedan los límites del array
            if (indiceFin >= mnnegativos.length) {
                indiceFin = mnnegativos.length - 1;
            }

            let primerValor = parseFloat(mnnegativos[indiceInicio]);
            let ultimoValor = parseFloat(mnnegativos[indiceFin]);

            var totalSumatoria = (Math.max(primerValor, ultimoValor) / 0.9).toFixed(2);
            resultados.push(totalSumatoria);
        }
        // console.log(resultados)
        return resultados;
    }

    // Función para calcular los valores medios por tramo
    function calcularValorMedioPorTramo(mnnegativos) {
        let resultados = [];
        const tramos = parseInt(document.getElementById('num_tramos').value);
        const tamañoTramo = 3; // Cada tramo consta de 3 elementos

        for (let i = 0; i < tramos; i++) {
            // Calcular los índices para el valor medio del tramo actual
            let indiceMedio = (i * tamañoTramo) + 1;

            // Asegurarse de que no excedan los límites del array
            if (indiceMedio >= mnnegativos.length) {
                indiceMedio = mnnegativos.length - 1;
            }

            let valorMedio = parseFloat(mnnegativos[indiceMedio]);

            var totalSumatoria = (valorMedio / 0.9).toFixed(2);
            resultados.push(totalSumatoria);
        }
        // console.log(resultados)
        return resultados;
    }


    document.getElementById('accionButton').addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        //variables generales
        const fc = document.getElementById('fc').value;
        const fy = document.getElementById('fy').value;
        const tramos = document.getElementById('num_tramos').value;
        //tramos unitarios
        const luzLibres = [];
        for (let i = 1; i <= tramos; i++) {
            const luzLibreValue = document.querySelector(`input[name="Luz_Libre${i}"]`).value;
            luzLibres.push(parseFloat(luzLibreValue));
        }
        //variables con tramos multiplciados por 3
        // Inicializar arrays para almacenar los valores capturados negativos
        const bases = [];
        const alturas = [];
        const momentosUltimos = [];
        const vus = [];
        const tus = [];
        const muCMs = [];
        const muCvs = [];
        const capasnegativas = [];
        // Capturar los valores de los inputs
        for (let i = 1; i <= tramos * 3; i++) {
            const baseValue = document.querySelector(`input[name="BASE${i}"]`).value;
            bases.push(parseFloat(baseValue));

            const alturaValue = document.querySelector(`input[name="ALTURA${i}"]`).value;
            alturas.push(parseFloat(alturaValue));

            const momentoUltimoValue = document.querySelector(`input[name="MomentoUltimo-${i}"]`).value;
            momentosUltimos.push(parseFloat(momentoUltimoValue));

            const vuValue = document.querySelector(`input[name="Vu-${i}"]`).value;
            vus.push(parseFloat(vuValue));

            const tuValue = document.querySelector(`input[name="Tu-${i}"]`).value;
            tus.push(parseFloat(tuValue));

            const muCMValue = document.querySelector(`input[name="MuCM-${i}"]`).value;
            muCMs.push(parseFloat(muCMValue));

            const muCvValue = document.querySelector(`input[name="MuCV-${i}"]`).value;
            muCvs.push(parseFloat(muCvValue));

            const capaneg = document.querySelector(`input[name="CAPAS-${i}"]`).value;
            capasnegativas.push(parseFloat(capaneg));
        }

        // Inicializar arrays para almacenar los valores capturados positivos
        const momentosUltimosPositivos = [];
        const vusPositivos = [];
        const tusPositivos = [];
        const muCMsPositivos = [];
        const muCvsPositivos = [];
        const capapositivos = []; // Declarar como array
        // Capturar los valores de los inputs que contienen un "+" en su nombre
        for (let i = 1; i <= tramos * 3; i++) {
            const muCMValue = document.querySelector(`input[name="MuCM+${i}"]`).value;
            muCMsPositivos.push(parseFloat(muCMValue));

            const muCvValue = document.querySelector(`input[name="MuCV+${i}"]`).value;
            muCvsPositivos.push(parseFloat(muCvValue));

            const momentoUltimoValue = document.querySelector(`input[name="MomentoUltimo+${i}"]`).value;
            momentosUltimosPositivos.push(parseFloat(momentoUltimoValue));

            const vuValue = document.querySelector(`input[name="Vu+${i}"]`).value;
            vusPositivos.push(parseFloat(vuValue));

            const tuValue = document.querySelector(`input[name="Tu+${i}"]`).value;
            tusPositivos.push(parseFloat(tuValue));

            const capapo = document.querySelector(`input[name="CAPAS+${i}"]`).value;
            capapositivos.push(parseFloat(capapo));

        }

        //================================================================================//
        //                            encabezados                                         //
        //================================================================================//

        const num_columnas = tramos * 3;

        // Array para almacenar las etiquetas <th>
        let etiquetasTH = [];
        // Generar las etiquetas <th> según el número de columnas
        for (let i = 0; i < num_columnas; i++) {
            // Determinar la etiqueta para cada columna (START, MIDDLE, END)
            let etiqueta = "";
            switch (i % 3) {
                case 0:
                    etiqueta = "START";
                    break;
                case 1:
                    etiqueta = "MIDDLE";
                    break;
                case 2:
                    etiqueta = "END";
                    break;
            }
            // Agregar la etiqueta en una columna <th>
            etiquetasTH.push(`<th class='bg-white text-gray-900 dark:bg-gray-800 dark:text-white' scope='col'>${etiqueta}</th>`);
        }
        // Combinar las etiquetas en una cadena
        let etiquetasTHString = etiquetasTH.join('');

        //================================================================================//
        //                 Primera Tabla - Requisitos Entradas                            //
        //              Calcular el número total de columnas requeridas                   //
        //================================================================================//


        //datos generales
        let efas = [];
        let eccs = [];
        let baseados = [];
        let altituds = [];
        let parfres = [];
        let defultcs = [];
        let deffluacers = [];
        let facredfs = [];

        // Generas las respuestas para cada conjunto de datos
        for (let i = 0; i < num_columnas; i++) {
            efas.push(fy);
            eccs.push(fc);
            baseados.push(bases[i]);
            altituds.push(alturas[i]);

            let parfre = 0;
            if (fc <= 280) {
                parfre = 0.85;
            } else if (fc > 280 && fc <= 560) {
                parfre = 1.05 - 0.714 * fc / 1000;
            } else {
                parfre = 0.65;
            }
            parfres.push(parfre);

            defultcs.push(0.003);
            deffluacers.push(0.0021);
            facredfs.push(0.90);
        }
        //================================================================================//
        //            Segunda Tabla - Diseño por Flexion Positivo Negativo                //
        //              Calcular el número total de columnas requeridas                   //
        //================================================================================//
        ///////////////////////////////////////
        //      verificacion negativas       //
        //////////////////////////////////////
        let ds = [];
        let mus = [];
        let Ass = [];
        let As_mins = [];
        let As_balanceados = [];
        let As_maxs = [];
        let As_usars = [];
        let als = [];
        //negativo
        let d = 0;
        var FR = 0.90;

        for (let i = 0; i < tramos * 3; i++) {
            //peralte efectivo
            switch (capasnegativas[i]) {
                case 1:
                    d = alturas[i] - 6;
                    break;
                case 2:
                    d = alturas[i] - 8;
                    break;
                case 3:
                    d = alturas[i] - 10;
                    break;
                case 4:
                    d = alturas[i] - 12;
                    break;
                case 5:
                    d = alturas[i] - 14;
                    break;
                case 6:
                    d = alturas[i] - 16;
                    break;
                default:
                    d = alturas[i];
            }
            ds.push(d);
            //altura del bloque
            var a = (d - Math.sqrt(Math.pow(d, 2) - 2 * Math.abs(momentosUltimos[i] * Math.pow(10, 5)) / (0.90 * 0.85 * fc * bases[i]))).toFixed(2);
            als.push(a);
            //refuerzo calculado
            var As = ((0.85 * fc * bases[i] * a) / fy).toFixed(2);
            Ass.push(As);
            //refuerzo minimo
            var As_min = (Math.max(0.7 * Math.sqrt(fc) / fy * bases[i] * d, 14 * bases[i] * d / fy)).toFixed(2);
            As_mins.push(As_min);
            //as balanceado
            var As_bal = (((0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * d)).toFixed(2);
            As_balanceados.push(As_bal);
            //refuero maximo As Max
            var As_max = (0.75 * (0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * d).toFixed(2);
            As_maxs.push(As_max);
            //As Usar

            let As_usar = 0;
            if (parseFloat(As) < parseFloat(As_min)) {
                As_usar = parseFloat(As_min);
            } else if (parseFloat(As) > parseFloat(As_min) && parseFloat(As) < parseFloat(As_max)) {
                As_usar = parseFloat(As);
            } else {
                As_usar = parseFloat(As_max);
            }
            As_usars.push(As_usar)

        }

        //==============================FORMULAS MATEMATICAS============================//
        const formulaA = 'a = d - \\sqrt{d^2 - \\frac{2|Mu|}{\\phi \\cdot 0.85 \\cdot f\'_c \\cdot b}}';
        const asceroUsar = '𝐴𝑠 = \\frac{0.85 * f_c * b *a}{f_y}';
        const Acerominimo = '𝐴𝑠 𝑚𝑖𝑛 = \\frac{0.80\\sqrt{f\'_c}}{f_y \\cdot b_d};\\frac{14}{f_y \\cdot b_d}';
        const AreaAceraBalanceado = '𝜌𝑏 = \\frac{0.85 * 𝛽_1 * 𝑓_𝑐}{f_y} * \\frac{𝜀_𝑐𝑢}{𝜀_𝑐𝑢+𝜀_𝑦}';
        const Aceromaximo = '𝐴𝑠 𝑚á𝑥 = 0.75 * (𝜌𝑏 * 𝑏 * d)';
        const momentotercio = '𝑀𝑢(-)=1/3𝑀𝑢(+)=𝑀𝑢/3';

        const momentoUltimo = 'Mn= (0.85 * 𝑓^′ c * b * a) * (d-\\frac{a}{2})';


        let template = `
            <table class="table table-hover"  id="vigaspdf">
                <thead class="bg-gray-200 dark:bg-gray-700">
                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                        <th class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-left text-xl py-2 px-4" scope="col">1.- Requisitos de diseño</th>
                        <th class='py-2 px-8' scope="col"></th>
                        <th class='py-2 px-8' scope="col"></th>
                        ${etiquetasTHString} 
                    </tr>
                </thead>
                <tbody class="bg-gray-200 dark:bg-gray-700">
                     <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Esfuerzo de fluencia del acero</td>
                        <td class='py-2 px-8'>fy</td>
                        <td class='py-2 px-8'></td>
                        ${efas.map(efa => `<td class='text-center'>${efa} kg/cm<sup>2</sup></td>`).join('')}
                    </tr>
                     <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Esfuerzo de comprension del concreto</td>
                        <td class='py-2 px-8'>f'c</td>
                        <td class='py-2 px-8'></td>
                        ${eccs.map(ecc => `<td class='text-center'>${ecc} kg/cm<sup>2</sup></td>`).join('')}
                    </tr>
                     <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Base de la Viga</td>
                        <td class='py-2 px-8'>b</td>
                        <td class='py-2 px-8'></td>
                        ${baseados.map(bas => `<td class='text-center'>${bas} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Altura de la Viga</td>
                        <td class='py-2 px-8'>h</td>
                        <td class='py-2 px-8'></td>
                        ${altituds.map(alt => `<td class='text-center'>${alt} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Parámetro en función de la resistencia del concreto</td>
                        <td class='py-2 px-8'>β1</td>
                        <td class='py-2 px-8'></td>
                        ${parfres.map(parfre => `<td class='text-center'>${parfre}</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Deformación última del concreto</td>
                        <td class='py-2 px-8'>εcu</td>
                        <td class='py-2 px-8'></td>
                        ${defultcs.map(defultc => `<td class='text-center'>${defultc}</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Deformación de fluencia del acero</td>
                        <td class='py-2 px-8'>εy</td>
                        <td class='py-2 px-8'></td>
                        ${deffluacers.map(deffluacer => `<td class='text-center'>${deffluacer}</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Factor de reducción a flexión sin carga axial</td>
                        <td class='py-2 px-8'>Ф</td>
                        <td class='py-2 px-8'></td>
                        ${facredfs.map(facredf => `<td class='text-center'>${facredf}</td>`).join('')}
                    </tr>
                </tbody> 

                <thead>
                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                        <th class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-left text-xl py-2 px-4">2.- Diseño de flexion</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        ${etiquetasTHString}
                    </tr>
                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-left">
                        <th scope="col" class="sub_sub_encabezados">Parte negativo</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-200 dark:bg-gray-700">
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Peralte efectivo en "cm"</td>
                        <td class='py-2 px-8'>d</td>
                        <td class='py-2 px-8'></td>
                        ${ds.map(d => `<td class='text-center'>${d} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Altura del bloque comprimido en "cm"</td>
                        <td class='py-2 px-8'>𝑎</td>
                        <td class='py-2 px-8'>\\(${formulaA}\\)</td>
                        ${als.map(a => `<td class='text-center'>${a} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Refuerzo calculado en "cm2"</td>
                        <td class='py-2 px-8'>𝐴𝑠</td>
                        <td class='py-2 px-8'>\\(${asceroUsar}\\)</td>
                        ${Ass.map(As => `<td class='text-center'>${As} cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Refuerzo mínimo en "cm2"</td>
                        <td class='py-2 px-8'>𝐴𝑠_𝑚𝑖𝑛	</td>
                        <td class='py-2 px-8'>\\(${Acerominimo}\\)</td>
                        ${As_mins.map(As_min => `<td class='text-center'>${As_min} cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Area de acero balanceado</td>
                        <td class='py-2 px-8'>𝜌𝑏</td>
                        <td class='py-2 px-8'>\\(${AreaAceraBalanceado}\\)</td>
                        ${As_balanceados.map(As_bal => `<td class='text-center'>${As_bal} cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Refuerzo máximo en "cm2"</td>
                        <td class='py-2 px-8'>𝐴𝑠_𝑚á𝑥 75%Asb</td>
                        <td class='py-2 px-8'>𝐴𝑠_𝑚á𝑥=0.75∗(𝜌_𝑏 "∗b∗d" )</td>
                        ${As_maxs.map(As_max => `<td class='text-center'>${As_max}cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Acero a Usar</td>
                        <td class='py-2 px-8'>𝐴𝑠_usar</td>
                        <td class='py-2 px-8'></td>
                        ${As_usars.map(As_usar => `<td class='text-center'>${As_usar}cm<sup>2<sup></td>`).join('')}
                    </tr>
                </tbody>`;

        const valorMaximo = Math.max(...capasnegativas);
        for (let i = 0; i < valorMaximo; i++) {
            // Crear la fila para los selects
            let trSelect = document.createElement('tr');

            // Agregar la etiqueta "Tipo de Acero"
            let tdTipoAcero = document.createElement('td');
            tdTipoAcero.textContent = 'Tipo de Acero mm';
            trSelect.appendChild(tdTipoAcero);

            // Agregar la etiqueta "Diámetro mm"
            let tdDiametro = document.createElement('td');
            tdDiametro.textContent = `Capa ${i + 1}`;
            trSelect.appendChild(tdDiametro);

            // Agregar la etiqueta "Diámetro mm"
            let tdformula = document.createElement('td');
            tdformula.textContent = ``;
            trSelect.appendChild(tdformula);

            // Crear los selects para cada tramo
            for (let j = 0; j < tramos * 3; j++) {
                // Crear un nuevo select
                let select = document.createElement('select');
                select.className = 'acer-negativos form-control form-control-sm';
                select.name = `tipoAcero${j}_capa${i}`;
                select.id = `tipoAcero${j}_capa${i}`;

                // Definir las opciones del select
                let opciones = [
                    { value: '0', text: 'Ø 0"' },
                    { value: '0.283', text: '6mm' },
                    { value: '0.503', text: '8mm cm²' },
                    { value: '0.713', text: 'Ø 3/8" cm²' },
                    { value: '1.131', text: '12mm cm²' },
                    { value: '1.267', text: 'Ø 1/2" cm²' },
                    { value: '1.979', text: 'Ø 5/8" cm²' },
                    { value: '2.850', text: 'Ø 3/4" cm²' },
                    { value: '5.067', text: 'Ø 1" cm²' },
                    { value: '2.58', text: '2Ø1/2"' },
                    { value: '3.87', text: '3Ø1/2"' },
                    { value: '3.98', text: '2Ø5/8"' },
                    { value: '5.16', text: '4Ø1/2"' },
                    { value: '5.27', text: '2Ø5/8"+1Ø1/2"' },
                    { value: '5.68', text: '2Ø3/4"' },
                    { value: '5.97', text: '3Ø5/8"' },
                    { value: '6.45', text: '5Ø1/2"' },
                    { value: '6.56', text: '2Ø5/8"+2Ø1/2"' },
                    { value: '6.97', text: '2Ø3/4"+1Ø1/2"' },
                    { value: '7.67', text: '2Ø3/4"+1Ø5/8"' },
                    { value: '7.74', text: '6Ø1/2"' },
                    { value: '7.85', text: '2Ø5/8"+3Ø1/2"' },
                    { value: '7.916', text: '4Ø5/8"' },
                    { value: '8.26', text: '2Ø3/4"+2Ø1/2"' },
                    { value: '8.52', text: '3Ø3/4"' },
                    { value: '8.55', text: '3Ø5/8"+2Ø1/2"' },
                    { value: '9.55', text: '2Ø3/4"+3Ø1/2"' },
                    { value: '9.95', text: '5Ø5/8"' },
                    { value: '9.66', text: '2Ø3/4"+2Ø5/8"' },
                    { value: '10.2', text: '2Ø1"' },
                    { value: '10.54', text: '4Ø5/8"+2Ø1/2"' },
                    { value: '10.84', text: '2Ø3/4"+4Ø1/2"' },
                    { value: '11.1', text: '3Ø3/4"+2Ø1/2"' },
                    { value: '11.40', text: '4Ø3/4"' },
                    { value: '11.65', text: '2Ø3/4"+3Ø5/8"' },
                    { value: '11.94', text: '6Ø5/8"' },
                    { value: '12.19', text: '2Ø1"+1Ø5/8"' },
                    { value: '12.5', text: '3Ø3/4"+2Ø5/8"' },
                    { value: '13.04', text: '2Ø1"+1Ø3/4"' },
                    { value: '13.64', text: '2Ø3/4"+4Ø5/8"' },
                    { value: '13.94', text: '4Ø3/4"+2Ø1/2"' },
                    { value: '14.18', text: '2Ø1"+2Ø5/8"' },
                    { value: '14.2', text: '5Ø3/4"' },
                    { value: '15.3', text: '3Ø1"' },
                    { value: '15.34', text: '4Ø3/4"+2Ø5/8"' },
                    { value: '15.88', text: '2Ø1"+2Ø3/4"' },
                    { value: '16.17', text: '2Ø1"+3Ø5/8"' },
                    { value: '17.04', text: '6Ø3/4"' },
                    { value: '18.16', text: '2Ø1"+4Ø5/8"' },
                    { value: '18.72', text: '2Ø1"+3Ø3/4"' },
                    { value: '19.28', text: '3Ø1"+2Ø5/8"' },
                    { value: '20.4', text: '4Ø1"' },
                    { value: '20.98', text: '3Ø1"+2Ø3/4"' },
                    { value: '21.56', text: '2Ø1"+4Ø3/4"' },
                    { value: '24.38', text: '4Ø1"+2Ø5/8"' },
                    { value: '25.5', text: '5Ø1"' },
                    { value: '26.08', text: '4Ø1"+2Ø3/4"' },
                    { value: '30.6', text: '6Ø1"' }
                ];

                // Crear y agregar las opciones al select
                opciones.forEach(opcion => {
                    let option = document.createElement('option');
                    option.value = opcion.value;
                    option.textContent = opcion.text;
                    select.appendChild(option);
                });

                // Agregar el select a la fila
                let tdSelect = document.createElement('td');
                tdSelect.appendChild(select);
                trSelect.appendChild(tdSelect);
            }
            // Agregar la fila de selects al template
            template += trSelect.outerHTML;
        }

        document.getElementById('calc_vigas_negativos').innerHTML = template;
        MathJax.typeset();
        ///////////////////////////////////////
        //      verificacion positiva       //
        //////////////////////////////////////

        //tabla positivo
        let musdivpos = [];
        let muspos = [];
        let dpos = [];
        let apos = [];
        let Asspos = [];
        let As_minpos = [];
        let As_maxpos = [];
        let As_balpos = [];
        let As_usarpos = [];

        for (let i = 0; i < tramos * 3; i++) {
            var musdivpo = (-momentosUltimos[i] / 3).toFixed(2);
            musdivpos.push(musdivpo);
            //Mu (-) usar
            var muspo = 0;
            if (momentosUltimosPositivos[i] > musdivpos[i]) {
                muspo = momentosUltimosPositivos[i];
            } else {
                muspo = musdivpos[i];
            }
            muspos.push(muspo);

            var dpo = 0;
            switch (capapositivos[i]) {
                case 1:
                    dpo = alturas[i] - 6;
                    break;
                case 2:
                    dpo = alturas[i] - 8;
                    break;
                case 3:
                    dpo = alturas[i] - 10;
                    break;
                case 4:
                    dpo = alturas[i] - 12;
                    break;
                case 5:
                    dpo = alturas[i] - 14;
                    break;
                case 6:
                    dpo = alturas[i] - 16;
                    break;
            }
            dpos.push(dpo);

            var apo = (dpos[i] - Math.sqrt(Math.pow(dpos[i], 2) - 2 * Math.abs(muspos[i] * Math.pow(10, 5)) / (0.90 * 0.85 * fc * bases[i]))).toFixed(2);
            apos.push(apo);

            var Asspo = ((0.85 * fc * bases[i] * apos[i]) / fy).toFixed(2);
            Asspos.push(Asspo)

            var As_minpo = (Math.max(0.7 * Math.sqrt(fc) / fy * bases[i] * dpos[i], 14 * bases[i] * ds[i] / fy)).toFixed(2);
            As_minpos.push(As_minpo)

            var As_balpo = ((0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * dpos[i]).toFixed(2);
            As_balpos.push(As_balpo)

            var As_maxpo = (0.75 * (0.85 * parfres[i] * fc / fy * (0.003 / (0.003 + 0.0021))) * bases[i] * dpos[i]).toFixed(2);
            As_maxpos.push(As_maxpo)

            let As_usarpo = 0;
            if (parseFloat(Asspo) < parseFloat(As_minpo)) {
                As_usarpo = parseFloat(As_minpo);
            } else if (parseFloat(Asspo) > parseFloat(As_minpo) && parseFloat(Asspo) < parseFloat(As_maxpo)) {
                As_usarpo = parseFloat(Asspo);
            } else {
                As_usarpo = parseFloat(As_maxpo);
            }
            As_usarpos.push(As_usarpo)
        }
        template = `
            <table class="table table-hover"  id="vigaspdf">
                <thead>
                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-left">
                        <th scope="col" class="text-xl py-2 px-4">Parte positivo</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-200 dark:bg-gray-700">
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>𝑀𝑢(-)=1/3𝑀𝑢(+)</td>
                        <td class='py-2 px-8'>\\(${momentotercio}\\)</td>
                        ${musdivpos.map(musdivpo => `<td class='text-center'>${musdivpo} Tonf.m</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>-</td>
                        <td class='py-2 px-8'>𝑀𝑢 (-) usar</td>
                        <td class='py-2 px-8'>\\(${momentotercio}\\)</td>
                        ${muspos.map(muspo => `<td class='text-center'>${muspo} Tonf.m</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Peralte efectivo en "cm"</td>
                        <td class='py-2 px-8'>𝑑</td>
                        <td class='py-2 px-8'></td>
                        ${dpos.map(dpo => `<td class='text-center'>${dpo} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Altura del bloque comprimido en "cm"</td>
                        <td class='py-2 px-8'>𝑎</td>
                        <td class='py-2 px-8'>\\(${formulaA}\\)</td>
                        ${apos.map(apo => `<td class='text-center'>${apo} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Refuerzo calculado en "cm2"</td>
                        <td class='py-2 px-8'>𝐴𝑠</td>
                        <td class='py-2 px-8'>\\(${asceroUsar}\\)</td>
                        ${Asspos.map(Asspo => `<td class='text-center'>${Asspo} cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Refuerzo mínimo en "cm2"</td>
                        <td class='py-2 px-8'>𝐴𝑠_𝑚𝑖𝑛</td>
                        <td class='py-2 px-8'>\\(${Acerominimo}\\)</td>
                        ${As_minpos.map(As_minpo => `<td class='text-center'>${As_minpo} cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Area de acero balanceado</td>
                        <td class='py-2 px-8'>𝜌𝑏</td>
                        <td class='py-2 px-8'>\\(${AreaAceraBalanceado}\\)</td>
                        ${As_balpos.map(As_balpo => `<td class='text-center'>${As_balpo} cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Refuerzo máximo en "cm2"</td>
                        <td class='py-2 px-8'>𝐴𝑠_𝑚á𝑥 75%Asb</td>
                        <td class='py-2 px-8'>\\(${Aceromaximo}\\)</td>
                        ${As_maxpos.map(As_maxpo => `<td class='text-center'>${As_maxpo}cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Acero a Usar</td>
                        <td class='py-2 px-8'>𝐴𝑠_usar</td>
                        <td class='py-2 px-8'></td>
                        ${As_usarpos.map(As_usarpo => `<td class='text-center'>${As_usarpo}cm<sup>2<sup></td>`).join('')}
                    </tr>
                </tbody>
        `;

        const valorMaximopos = Math.max(...capapositivos);

        for (let i = 0; i < valorMaximopos; i++) {
            // Crear la fila para los selects
            let trSelect = document.createElement('tr');

            // Agregar la etiqueta "Tipo de Acero"
            let tdTipoAcero = document.createElement('td');
            tdTipoAcero.textContent = 'Tipo de Acero mm';
            trSelect.appendChild(tdTipoAcero);

            // Agregar la etiqueta "Diámetro mm"
            let tdDiametro = document.createElement('td');
            tdDiametro.textContent = `Capa ${i + 1}`;
            trSelect.appendChild(tdDiametro);

            // Agregar la etiqueta "Diámetro mm"
            let tdformula = document.createElement('td');
            tdformula.textContent = ``;
            trSelect.appendChild(tdformula);

            // Crear los selects para cada tramo
            for (let j = 0; j < tramos * 3; j++) {
                // Crear un nuevo select
                let select = document.createElement('select');
                select.className = 'acer-positivo form-control form-control-sm';
                select.name = `tipoAceroB${j}_capa${i}`;
                select.id = `tipoAceroB${j}_capa${i}`;

                // Definir las opciones del select
                let opciones = [
                    { value: '0', text: 'Ø 0"' },
                    { value: '0.283', text: '6mm' },
                    { value: '0.503', text: '8mm cm²' },
                    { value: '0.713', text: 'Ø 3/8" cm²' },
                    { value: '1.131', text: '12mm cm²' },
                    { value: '1.267', text: 'Ø 1/2" cm²' },
                    { value: '1.979', text: 'Ø 5/8" cm²' },
                    { value: '2.850', text: 'Ø 3/4" cm²' },
                    { value: '5.067', text: 'Ø 1" cm²' },
                    { value: '2.58', text: '2Ø1/2"' },
                    { value: '3.87', text: '3Ø1/2"' },
                    { value: '3.98', text: '2Ø5/8"' },
                    { value: '5.16', text: '4Ø1/2"' },
                    { value: '5.27', text: '2Ø5/8"+1Ø1/2"' },
                    { value: '5.68', text: '2Ø3/4"' },
                    { value: '5.97', text: '3Ø5/8"' },
                    { value: '6.45', text: '5Ø1/2"' },
                    { value: '6.56', text: '2Ø5/8"+2Ø1/2"' },
                    { value: '6.97', text: '2Ø3/4"+1Ø1/2"' },
                    { value: '7.67', text: '2Ø3/4"+1Ø5/8"' },
                    { value: '7.74', text: '6Ø1/2"' },
                    { value: '7.85', text: '2Ø5/8"+3Ø1/2"' },
                    { value: '7.916', text: '4Ø5/8"' },
                    { value: '8.26', text: '2Ø3/4"+2Ø1/2"' },
                    { value: '8.52', text: '3Ø3/4"' },
                    { value: '8.55', text: '3Ø5/8"+2Ø1/2"' },
                    { value: '9.55', text: '2Ø3/4"+3Ø1/2"' },
                    { value: '9.95', text: '5Ø5/8"' },
                    { value: '9.66', text: '2Ø3/4"+2Ø5/8"' },
                    { value: '10.2', text: '2Ø1"' },
                    { value: '10.54', text: '4Ø5/8"+2Ø1/2"' },
                    { value: '10.84', text: '2Ø3/4"+4Ø1/2"' },
                    { value: '11.1', text: '3Ø3/4"+2Ø1/2"' },
                    { value: '11.40', text: '4Ø3/4"' },
                    { value: '11.65', text: '2Ø3/4"+3Ø5/8"' },
                    { value: '11.94', text: '6Ø5/8"' },
                    { value: '12.19', text: '2Ø1"+1Ø5/8"' },
                    { value: '12.5', text: '3Ø3/4"+2Ø5/8"' },
                    { value: '13.04', text: '2Ø1"+1Ø3/4"' },
                    { value: '13.64', text: '2Ø3/4"+4Ø5/8"' },
                    { value: '13.94', text: '4Ø3/4"+2Ø1/2"' },
                    { value: '14.18', text: '2Ø1"+2Ø5/8"' },
                    { value: '14.2', text: '5Ø3/4"' },
                    { value: '15.3', text: '3Ø1"' },
                    { value: '15.34', text: '4Ø3/4"+2Ø5/8"' },
                    { value: '15.88', text: '2Ø1"+2Ø3/4"' },
                    { value: '16.17', text: '2Ø1"+3Ø5/8"' },
                    { value: '17.04', text: '6Ø3/4"' },
                    { value: '18.16', text: '2Ø1"+4Ø5/8"' },
                    { value: '18.72', text: '2Ø1"+3Ø3/4"' },
                    { value: '19.28', text: '3Ø1"+2Ø5/8"' },
                    { value: '20.4', text: '4Ø1"' },
                    { value: '20.98', text: '3Ø1"+2Ø3/4"' },
                    { value: '21.56', text: '2Ø1"+4Ø3/4"' },
                    { value: '24.38', text: '4Ø1"+2Ø5/8"' },
                    { value: '25.5', text: '5Ø1"' },
                    { value: '26.08', text: '4Ø1"+2Ø3/4"' },
                    { value: '30.6', text: '6Ø1"' }
                ];

                // Crear y agregar las opciones al select
                opciones.forEach(opcion => {
                    let option = document.createElement('option');
                    option.value = opcion.value;
                    option.textContent = opcion.text;
                    select.appendChild(option);
                });

                // Agregar el select a la fila
                let tdSelect = document.createElement('td');
                tdSelect.appendChild(select);
                trSelect.appendChild(tdSelect);
            }
            // Agregar la fila de selects al template
            template += trSelect.outerHTML;
        }
        // Insertar el template generado en el elemento con el id 'calc_vigas'
        document.getElementById('calc_vigas_positivos').innerHTML = template;
        MathJax.typeset();

        //================================================================================//
        //            Segunda Tabla - DISEÑO POR CORTANTE                                 //
        //              Calcular el número total de columnas requeridas                   //
        //================================================================================//
        //Aceros y Momentos negativos
        // let sumas = [];
        // let mnnegativos = [];
        // //Aceros y Momentos Positivos
        // let sumaspos = [];
        // let mnpositivos = [];



        let acws = [];
        let vcs = [];
        let vcfrs = [];
        let Vss = [];
        let Espacioss = [];
        let peds = [];
        let Lconfis = [];
        let usarSs = [];
        let estriboss = [];
        let estribadocortes = [];

        for (let i = 0; i < tramos * 3; i++) {

            var acw = bases[i] * ds[i];

            var vc = (0.53 * Math.sqrt(fc) * (acw / 1000));

            var vcfr = (0.85 * vc);

            var Vs = ((vus[i] / 0.85) - vc);

            var Espacios = Math.ceil(0.713 * fy * ds[i] / (Vs * 1000) * 2);

            var ped = dpos[i] / 4;

            var laconfigcorte = 2 * alturas[i];

            //se va añadir mas datos a cortante
            var usarS = Math.min(Espacios, ped, 10);

            var estribos = 16;

            var estribadocorte = `Estribado: 1@5cm; ${estribos}@ ${Espacios} cm;resto@20cm`;

            acws.push(acw);
            vcs.push(vc);
            vcfrs.push(vcfr);
            Vss.push(Vs);
            Espacioss.push(Espacios);
            peds.push(ped);
            Lconfis.push(laconfigcorte);
            usarSs.push(usarS);
            estriboss.push(estribos);
            estribadocortes.push(estribadocorte);

        }

        const acwdecorte = '𝐴𝑐𝑤=b * d';
        const vcCorte = '𝑉𝑐=0.53 * sqrt{𝑓′𝑐} * s𝐴𝑐𝑤';
        const paravccorte = 'Ø𝑉𝑐 = 𝑉𝑐*Ø';
        const cortnomProp = 'Vs = \\frac{𝐴𝑣 * 𝑓𝑦 * 𝑑}{𝑆}';
        const espacimientoReq = '\\frac{(2* 3/8)*𝑓𝑦*𝑑}{(Vs*1000)}';
        const peralteEfectivodiv = '𝑆=\\frac{d}{4}= MAX(d)/4';
        const zonConfig = '𝐿𝑐𝑜𝑛𝑓𝑖𝑔= 2 * h';
        const acerusar = 'usar= MIN(𝑆,𝑆=𝑑/4,Smax)';

        //Diselo por capacidad
        const mn_izquierda = '𝑀𝑛 𝑖𝑧𝑞=\\frac{MAX(ФMn;ФMn)}{0.9}';
        const mn_derecha = '𝑀𝑛 𝑑𝑒𝑟= \\frac{ФMn}{0.9}';
        const cortanteForm = '𝑉𝑢=(\\frac{(Mn izqu + Mn der)}{Luz Libre (m)}) + 1.25(CM+CV)';
        const Spaciado = '𝑆=\\frac{(2* 3/8)*𝑓𝑦*𝑑}{(Vs*1000)}';

        template = `
            <table class="table table-hover"  id="vigaspdf">
                <thead>
                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                        <th scope="col" colspan="2" class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-left text-xl py-2 px-4">3.- Diseño de cortante</th>
                        <th scope="col"></th>
                        ${etiquetasTHString}
                    </tr>
                </thead>
                <tbody class="bg-gray-200 dark:bg-gray-700">
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Area de corte</td>
                        <td class='py-2 px-8'>𝐴𝑐𝑤</td>
                        <td class='py-2 px-8'>\\(${acwdecorte}\\)</td>
                        ${acws.map(acw => `<td class='text-center'>${acw.toFixed(2)} cm<sup>2</sup></td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Cortante nominal proporcionada por el concreto</td>
                        <td class='py-2 px-8'>𝑉𝑐</td>
                        <td class='py-2 px-8'>\\(${vcCorte}\\)</td>
                        ${vcs.map(vc => `<td class='text-center'>${vc.toFixed(2)} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>Ø 𝑉𝑐</td>
                        <td class='py-2 px-8'>\\(${paravccorte}\\)</td>
                        ${vcfrs.map(vcfr => `<td class='text-center'>${vcfr.toFixed(2)}Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Cortante nominal proporcionada por el refuerzo</td>
                        <td class='py-2 px-8'>𝑉𝑠</td>
                        <td class='py-2 px-8'>\\(${cortnomProp}\\)</td>
                        ${Vss.map(Vs => `<td class='text-center'>${Vs.toFixed(2)} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Espaciamiento requerido</td>
                        <td class='py-2 px-8'>𝑆</td>
                        <td class='py-2 px-8'>\\(${espacimientoReq}\\)</td>
                        ${Espacioss.map(Espacios => `<td class='text-center'>${Espacios.toFixed(2)} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Peralte efectivo dividido entre 4</td>
                        <td class='py-2 px-8'>𝑆=𝑑/4</td>
                        <td class='py-2 px-8'>\\(${peralteEfectivodiv}\\)</td>
                        ${peds.map(ped => `<td class='text-center'>${ped.toFixed(2)} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>𝐿𝑐𝑜𝑛𝑓𝑖𝑔</td>
                        <td class='py-2 px-8'>\\(${zonConfig}\\)</td>
                        ${Lconfis.map(laconfigcorte => `<td class='text-center'>${laconfigcorte} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>𝑈𝑠𝑎𝑟</td>
                        <td class='py-2 px-8'>\\(${acerusar}\\)</td>
                        ${usarSs.map(usarS => `<td class='text-center'>${usarS.toFixed(2)} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'># estribos zona conf.</td>
                        <td class='py-2 px-8'></td>
                        ${estriboss.map(estribos => `<td class='text-center'>${estribos}</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>Estribado</td>
                        <th scope="col"></th>
                        ${estribadocortes.map(estribadocorte => `<td class='text-center'>${estribadocorte} </td>`).join('')}
                    </tr>
                </tbody>
            </table>`;

        document.getElementById('calc_vigas_cortante').innerHTML = template;
        MathJax.typeset();
        //================================================================================//
        //            Segunda Tabla - DISEÑO POR CAPACIDAD                                 //
        //              Calcular el número total de columnas requeridas                    //
        //=================================================================================//
        // console.log('Calculando con sumas de acero A:', sumas);
        // console.log('Calculando con sumas de acero B:', sumaspos);
        // console.log('Monento negativos :', mnnegativos);
        // console.log('Monento Positivos :', mnpositivos);
        //let Mn_Izqs = [];
        // let Mn_Ders = [];
        let vucortantes = [];
        let vcresistentes = [];
        let cortanteNominalVSs = [];
        let Espaciocapacidads = [];
        let peralteEfectivocapacidads = [];
        let VscapacidadAcws = [];
        let vccapacidads = [];
        let laconfigCapacidads = [];
        let usarScapas = [];
        let estribocapas = [];
        let estribadoscapas = [];
        // const muCMs = [];
        // const muCvs = [];
        // const muCMsPositivos = [];
        // const muCvsPositivos = [];

        // Llamada a la función solo una vez
        const Mn_Izqs = calcularPrimerUltimoValorPorTramo(mnnegativos);
        // Replicar los resultados para cada tramo
        let replicatedResults = [];
        Mn_Izqs.forEach(result => {
            for (let i = 0; i < 3; i++) {
                replicatedResults.push(result);
            }
        });

        const Mn_Der = calcularValorMedioPorTramo(mnpositivos);
        let Mn_Derresult = [];
        Mn_Der.forEach(result => {
            for (let i = 0; i < 3; i++) {
                Mn_Derresult.push(result);
            }
        });

        for (let i = 0; i < tramos * 3; i++) {
            //var Mn_Izq = calcularPrimerUltimoValorPorTramo(mnnegativos);//(Math.max(mnnegativos[i], mnnegativos[i + 2]) / 0.9);
            //console.log(Mn_Izq)

            // var Mn_Der = (Math.max(mnpositivos[i + 1]) / 0.9);

            var cargascapacidadcmcv = 1.25 * (muCMs[i] + muCvs[i]);

            var vucortante = ((parseFloat(replicatedResults[i]) + parseFloat(Mn_Derresult[i])) / luzLibres) + (cargascapacidadcmcv);

            var VscapacidadAcw = bases[i] * ds[i];

            var vccapacidad = 0.53 * Math.sqrt(fc) * (VscapacidadAcw) / 1000;

            var vcresistente = vccapacidad * parfres[i];

            var cortanteNominalVS = vus[i] / parfres[i] - vccapacidad;

            var Espaciocapacidad = Math.ceil(0.713 * fy * ds[i] / (cortanteNominalVS * 1000) * 2);

            var peralteEfectivocapacidad = dpos[i] / 4;

            var laconfigCapacidad = 2 * alturas[i];

            var usarScapa = Math.min(Espaciocapacidad, peralteEfectivocapacidad, 10);

            var estribocapa = 18;

            var estribadoscapa = `Estribado: 1@5cm; ${estribocapa}@ ${Espaciocapacidad} cm;resto@20cm`;

            //Mn_Izqs.push(...Mn_Izq);
            // Mn_Ders.push(Mn_Der);
            VscapacidadAcws.push(VscapacidadAcw);
            vccapacidads.push(vccapacidad)
            vucortantes.push(vucortante);
            vcresistentes.push(vcresistente);
            cortanteNominalVSs.push(cortanteNominalVS);
            Espaciocapacidads.push(Espaciocapacidad);
            peralteEfectivocapacidads.push(peralteEfectivocapacidad);
            laconfigCapacidads.push(laconfigCapacidad)
            usarScapas.push(usarScapa);
            estribocapas.push(estribocapa);
            estribadoscapas.push(estribadoscapa);

            // acwcs.push(acwc);
            // var vc1 = ((mnpositivos ? mnpositivos[Math.floor((mnpositivos.length || 1) / 2)] : 0) / 0.9).toFixed(2);
            // vc1s.push(vc1);
        }

        template = `
            <table class="table table-hover"  id="vigaspdf">
                <thead>
                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                        <th scope="col" colspan="2" class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-left text-xl py-2 px-4">4.- Diseño por capacidad</th>
                        <th scope="col"></th>
                        ${etiquetasTHString}
                    </tr>
                </thead>
                <tbody class="bg-gray-200 dark:bg-gray-700">
                    <tr class="𝑀𝑛_𝑖𝑧𝑞">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>𝑀𝑛_𝑖𝑧𝑞</td>
                        <td class='py-2 px-8'>\\(${mn_izquierda}\\)</td>
                        ${replicatedResults.map(Mn_Izq => `<td class='text-center'>${Mn_Izq} Tonf</td>`).join('')}
                    </tr>
                    <tr class="𝑀𝑛_𝑑𝑒𝑟">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>𝑀𝑛_𝑑𝑒𝑟</td>
                        <td class='py-2 px-8'>\\(${mn_derecha}\\)</td>
                        ${Mn_Derresult.map(Mn_Der => `<td class='text-center'>${Mn_Der} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Capacidad cortante</td>
                        <td class='py-2 px-8'>𝑉𝑢</td>
                        <td class='py-2 px-8'>\\(${cortanteForm}\\)</td>
                        ${vucortantes.map(vucortante => `<td class='text-center'>${vucortante.toFixed(2)} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Area de corte</td>
                        <td class='py-2 px-8'>Acw</td>
                        <td class='py-2 px-8'>\\(${acwdecorte}\\)</td>
                        ${VscapacidadAcws.map(VscapacidadAcw => `<td class='text-center'>${VscapacidadAcw} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Cortante nominal proporcionada por el concreto</td>
                        <td class='py-2 px-8'>Vc</td>
                        <td class='py-2 px-8'>\\(${vcCorte}\\)</td>
                        ${vccapacidads.map(vccapacidad => `<td class='text-center'>${vccapacidad.toFixed(2)} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Cortante resistente proporcionada por el concreto</td>
                        <td class='py-2 px-8'>Ø Vc</td>
                        <td class='py-2 px-8'>\\(${paravccorte}\\)</td>
                        ${vcresistentes.map(vcresistente => `<td class='text-center'>${vcresistente.toFixed(2)} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Cortante nominal proporcionada por el refuerzo</td>
                        <td class='py-2 px-8'>Vs</td>
                        <td class='py-2 px-8'>\\(${cortnomProp}\\)</td>
                        ${cortanteNominalVSs.map(cortanteNominalVS => `<td class='text-center'>${cortanteNominalVS.toFixed(2)} Tonf</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Espaciamiento requerido</td>
                        <td class='py-2 px-8'>𝑆(cm)</td>
                        <td class='py-2 px-8'>\\(${Spaciado}\\)</td>
                        ${Espaciocapacidads.map(Espaciocapacidad => `<td class='text-center'>${Espaciocapacidad.toFixed(2)} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Peralte efectivo dividido entre 4</td>
                        <td class='py-2 px-8'>𝑆=𝑑/4 (cm)</td>
                        <td class='py-2 px-8'>\\(${peralteEfectivodiv}\\)</td>
                        ${peralteEfectivocapacidads.map(peralteEfectivocapacidad => `<td class='text-center'>${peralteEfectivocapacidad.toFixed(2)} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>𝐿𝑐𝑜𝑛𝑓𝑖𝑔</td>
                        <td class='py-2 px-8'>\\(${zonConfig}\\)</td>
                        ${laconfigCapacidads.map(laconfigCapacidad => `<td class='text-center'>${laconfigCapacidad.toFixed(2)} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>𝑈𝑠𝑎𝑟</td>
                        <td class='py-2 px-8'>\\(${acerusar}\\)</td>
                        ${usarScapas.map(usarScapa => `<td class='text-center'>${usarScapa} cm</td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'># estribos zona conf.</td>
                        <td class='py-2 px-8'></td>
                        ${estribocapas.map(estribocapa => `<td class='text-center'>${estribocapa} </td>`).join('')}
                    </tr>
                      <tr class="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>Estribado</td>
                        <td class='py-2 px-8'></td>
                        ${estribadoscapas.map(estribadoscapa => `<td class='text-center'>${estribadoscapa}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        `;

        document.getElementById('calc_vigas_capacidad').innerHTML = template;
        MathJax.typeset();
        //================================================================================//
        //            Segunda Tabla - DISEÑO POR DEFLEXION                                //
        //              Calcular el número total de columnas requeridas                   //
        //================================================================================//
        let ess = [];
        let ecs = [];
        let ns = [];
        let Lcrs = [];
        let Lcrs1s = [];
        let lefs = [];
        let zms = [];
        let zls = [];
        let azls = [];
        let dds = [];
        let amedias = [];
        let amaxs = [];
        let AzlVs = [];
        let VCVs = [];
        let Aztvs = [];
        let ZTs = [];

        for (let i = 0; i < tramos * 3; i++) {
            var es = 2 * (Math.pow(10, 6)).toFixed(2);
            ess.push(es);
            var ec = (15000 * Math.sqrt(fc)).toFixed(2);
            ecs.push(ec);
            var n = (es / ec).toFixed(2);
            ns.push(n);
            // //verificar icrpos
            var c1 = bases[i];
            var ccuadrado = 2 * ns[i] * sumas[i];
            var e = (-2 * ns[i] * sumas[i] * ds[i]);
            var ccomp = (-ccuadrado + Math.sqrt(Math.pow(ccuadrado, 2) - (4 * c1 * e))) / (2 * c1);
            var ccomp1 = (-ccuadrado - Math.sqrt(Math.pow(ccuadrado, 2) - (4 * c1 * e))) / (2 * c1);

            var lcr = (((bases[i] * Math.pow(Math.max(ccomp, ccomp1), 3)) / 3) + (ns[i] * sumas[i] * Math.pow((ds[i] - Math.max(ccomp, ccomp1)), 2)) + ((ns[i] - 1) * sumas[i] * Math.pow((Math.max(ccomp, ccomp1) - 6), 2))).toFixed(2);
            Lcrs.push(lcr);

            //verificar icrnegativ
            var c1neg = bases[i];
            var ccuadradoneg = 2 * ns[i] * sumas[i];
            var eneg = (-2 * ns[i] * sumas[i] * ds[i]);
            var ccompneg = (-ccuadradoneg + Math.sqrt(Math.pow(ccuadradoneg, 2) - (4 * c1neg * eneg))) / (2 * c1neg);
            var ccomp1neg = (-ccuadradoneg - Math.sqrt(Math.pow(ccuadradoneg, 2) - (4 * c1neg * eneg))) / (2 * c1neg);

            var lcr1 = (((bases[i] * Math.pow(Math.max(ccompneg, ccomp1neg), 3)) / 3) + (ns[i] * sumas[i] * Math.pow((ds[i] - Math.max(ccompneg, ccomp1neg)), 2)) + ((ns[i] - 1) * sumas[i] * Math.pow((Math.max(ccompneg, ccomp1neg) - 6), 2))).toFixed(2);
            Lcrs1s.push(lcr1);

            var lef = (((parseFloat(lcr1) + parseFloat(lcr1)) + 2 * parseFloat(lcr)) / 4).toFixed(2);
            lefs.push(lef);

            var zmRounded = (5 * Math.pow(luzLibres * 100, 2)) / (48 * ecs[i] * lefs[i]) * ((muCMsPositivos[1] - 0.1 * (muCMs[0] + muCMs[2])) * 100);
            let zm = zmRounded.toFixed(3);
            zms.push(zm);

            var zl = ((5 * Math.pow(luzLibres * 100, 2)) / (48 * ecs[i] * lefs[i]) * (muCvsPositivos[i] - 0.1 * (muCvs[0] + muCvs[2]) * 100)).toFixed(3);;
            zls.push(zl)

            var azl = (0.3 * zls[i]);
            azls.push(azl);

            //falta corregir λΔ desde esa linea hacia abajo
            var pdifer = sumas[i] / (bases[i] * ds[i]);
            var edifer = 2;
            var dd = (edifer / (1 + (50 * pdifer))).toFixed(3);
            dds.push(dd);

            var amedia = (parseFloat(zms[i]) * (1 + parseFloat(dds[i])) + parseFloat(azls[i]) * (1 + parseFloat(dds[i]))).toFixed(3);
            amedias.push(amedia);

            var amax = (parseFloat(zm) + parseFloat(zl) + parseFloat(dd) * parseFloat(zm) + parseFloat(zl) * parseFloat(azl)).toFixed(2);
            amaxs.push(amax)

            var AzlV = ((luzLibres * 100) / 360).toFixed(2);
            AzlVs.push(AzlV);

            var VCV = "";
            if (zl < AzlV) {
                VCV = "CUMPLE";
            } else {
                VCV = "NO CUMPLE";
            }
            VCVs.push(VCV)

            var Aztv = ((luzLibres * 100) / 480).toFixed(2);
            Aztvs.push(Aztv);

            var azt = dd * zm + dd * azl + zl;
            var ZT = "";
            if (azt < AzlV) {
                ZT = "CUMPLE";
            } else {
                ZT = "NO CUMPLE";
            }
            ZTs.push(ZT);
        }

        //Formulario//
        const Ecdeflex = 'Ec=2 * {\\left(10^{6}\\right)} ';
        const nsdeflex = 'Ns=(15000 * \\sqrt{f\'_c})';
        const nsdeflexn = 'Ns= \\frac{es}{ec}';
        const Lcrsdeflex = 'Icr= 2 * {\\left(10^{6}\\right)}';
        const Icrdeflex = '';//'lcr= \\frac{(b* {\\left(max(ccomp, ccomp1)^{0.5}\\right)})}{3} + (ns*acero * {\\left(ds - max(ccomp, ccomp1)^{2}\\right)} ';
        const Lefdelfex = 'Lef = \\frac{lcr + lcr + 2 * lcr}{4}';
        const azmdeflex = 'Δzm = \\frac{\\left(luzLibres * 100^{2}\\right)}{ns*acero * \\left(ds - MAX(ccomp, ccomp1)^{2}\\right) }';//'Azm = \\frac{5 * {\\left(luzLibres * 100)^{2}\\right}{(48 * ecs * lefs) * (muCv - 0.1 * (muCv + muCv * 100)';
        const azLdelfex = 'ΔzL = \\frac{(5 * \\left(luzLibres * 100^{2}\\right))}{48 * ecs * Lef) * (muCv - 0.1 * (muCv + muCv) * 100)}';
        const azporcdelflex = 'Δz30 = 0.3 * ΔzL';
        const yadelfex = 'λΔ =  \\frac{ed}{1 + (50 * pdifer)}';
        const Amediadelfex = 'Δmedia = Δzm * 1 + λΔ + ΔzL * 1 + λΔ';
        const Amaxdeflex = 'ΔMáx = Δzm + ΔzL + λΔ * Δzm + ΔzL * Δz30';
        const AZLdeflex = 'ΔZL = \\frac{luzLibres * 100}{360}';
        const verfdeflex = '';
        const AZTdeflex = 'ΔZT = λΔ * Δzm * λΔ * Δz30 + ΔzL';
        const verfsecdeflex = '';

        template = `
            <table class="table table-hover"  id="vigaspdf">
                <thead>
                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                        <th scope="col" colspan="2" class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-left text-xl py-2 px-4">5.- Diseño por deflexion</th>
                        <th scope="col"></th>
                        ${etiquetasTHString}
                    </tr>
                </thead>
                <tbody class="bg-gray-200 dark:bg-gray-700">
                    <tr class="esdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Modulo de elasticidad del acero</td>
                        <td class='py-2 px-8'>Ec</td>
                        <td class='py-2 px-8'>\\(${Ecdeflex}\\)</td>
                        ${ess.map(es => `<td class='text-center'>${es} Kg/cm<sup>2</sup></td>`).join('')}
                    </tr>
                    <tr class="ecdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Modulo de elasticidad del concreto</td>
                        <td class='py-2 px-8'>Ns</td>
                        <td class='py-2 px-8'>\\(${nsdeflex}\\)</td>
                        ${ecs.map(ec => `<td class='text-center'>${ec} Kg/cm<sup>2</sup></td>`).join('')}
                    </tr>
                    <tr class="nsdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Relacion acero/concreto</td>
                        <td class='py-2 px-8'>Ns</td>
                        <td class='py-2 px-8'>\\(${nsdeflexn}\\)</td>
                        ${ns.map(n => `<td class='text-center'>${n} </td>`).join('')}
                    </tr>
                    <tr class="Icrdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Inercia critica en la seccion rectangular</td>
                        <td class='py-2 px-8'>Icr</td>
                        <td class='py-2 px-8'>\\(${Lcrsdeflex}\\)</td>
                        ${Lcrs.map(Lcr => `<td class='text-center'>${Lcr} cm<sup>4</sup></td>`).join('')}
                    </tr>
                    <tr class="Icnegadeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Inercia critica en la seccion rectangular</td>
                        <td class='py-2 px-8'>Icr</td>
                        <td class='py-2 px-8'>\\(${Icrdeflex}\\)</td>
                        ${Lcrs1s.map(Lcrs1 => `<td class='text-center'>${Lcrs1} cm<sup>4</sup></td>`).join('')}
                    </tr>
                    <tr class="lefdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'></td>
                        <td class='py-2 px-8'>Lef</td>
                        <td class='py-2 px-8'>\\(${Lefdelfex}\\)</td>
                        ${lefs.map(lef => `<td class='text-center'>${lef} cm<sup>4</sup></td>`).join('')}
                    </tr>
                    <tr class="azmdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Deflexión debido ala carga muerta</td>
                        <td class='py-2 px-8'>Δzm</td>
                        <td class='py-2 px-8'>\\(${azmdeflex}\\)</td>
                        ${zms.map(zm => `<td class='text-center'>${zm} cm</td>`).join('')}
                    </tr>
                    <tr class="zlsdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Deflexión debido ala carga viva</td>
                        <td class='py-2 px-8'>ΔzL</td>
                        <td class='py-2 px-8'>\\(${azLdelfex}\\)</td>
                        ${zls.map(zl => `<td class='text-center'>${zl} cm</td>`).join('')}
                    </tr>
                    <tr class="azdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Deflexión considerando el 30% de la carga viva</td>
                        <td class='py-2 px-8'>Δz30%</td>
                        <td class='py-2 px-8'>\\(${azporcdelflex}\\)</td>
                        ${azls.map(azl => `<td class='text-center'>${azl} cm</td>`).join('')}
                    </tr>
                    <tr class="deflexdifer bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>Deflexión diferida</td>
                        <td class='py-2 px-8'>λΔ </td>
                        <td class='py-2 px-8'>\\(${yadelfex}\\)</td>
                        ${dds.map(dd => `<td class='text-center'>${dd} cm</td>`).join('')}
                    </tr>
                    <tr class="amediadeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>-</td>
                        <td class='py-2 px-8'>Δmedia</td>
                        <td class='py-2 px-8'>\\(${Amediadelfex}\\)</td>
                        ${amedias.map(amedia => `<td class='text-center'>${amedia} cm</td>`).join('')}
                    </tr>
                    <tr class="amaxdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>-</td>
                        <td class='py-2 px-8'>ΔMáx</td>
                        <td class='py-2 px-8'>\\(${Amaxdeflex}\\)</td>
                        ${amaxs.map(amax => `<td class='text-center'>${amax} cm</td>`).join('')}
                    </tr>
                    <tr class="azldeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>-</td>
                        <td class='py-2 px-8'>ΔZL</td>
                        <td class='py-2 px-8'>\\(${AZLdeflex}\\)</td>
                        ${AzlVs.map(AzlV => `<td class='text-center'>${AzlV}</td>`).join('')}
                    </tr>
                    <tr class="priverifdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>-</td>
                        <td class='py-2 px-8'>VERIFICACION</td>
                        <td class='py-2 px-8'>\\(${verfdeflex}\\)</td>
                        ${VCVs.map(VCV => `<td class='text-center'>${VCV}</td>`).join('')}
                    </tr>
                    <tr class="aztdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>-</td>
                        <td class='py-2 px-8'>ΔZT</td>
                        <td class='py-2 px-8'>\\(${AZTdeflex}\\)</td>
                        ${Aztvs.map(Aztv => `<td class='text-center'>${Aztv}</td>`).join('')}
                    </tr>
                    <tr class="segverifdeflex bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white">
                        <td class='py-2 px-8'>-</td>
                        <td class='py-2 px-8'>VERIFICACION</td>
                        <td class='py-2 px-8'>\\(${verfsecdeflex}\\)</td>
                        ${ZTs.map(ZT => `<td class='text-center'>${ZT}</td>`).join('')}
                    </tr>
                </tbody>
            </table>`;

        // Insertar el template generado en el elemento con el id 'calc_vigas'
        document.getElementById('calc_vigas_deflexion').innerHTML = template;
        MathJax.typeset();
    });


})

// document.getElementById('FlexionViga').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Obtener los datos del primer formulario
//     const formData1 = new FormData(this);

//     // Enviar los datos al servidor
//     fetch('Controladores/DesingVigas.php', {
//         method: 'POST',
//         body: formData1
//     })
//         .then(response => response.text())
//         .then(data => {
//             const resultadosContainer = document.getElementById('ObtenerResultados');
//             resultadosContainer.innerHTML = data;
//         })
//         .catch(error => {
//             console.error('Error en la solicitud POST del primer formulario', error);
//         });
// });