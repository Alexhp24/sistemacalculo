$(document).ready(function () {
    $("#desingButton").click((e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        const longitudtransversal = parseFloat(
            document.getElementById("longitudtransversal").value
        );
        const luz = parseFloat(document.getElementById("luz").value);
        const flecha = parseFloat(document.getElementById("flecha").value);
        const pesopropio = parseFloat(
            document.getElementById("pesopropio").value
        );
        const luminarias = parseFloat(
            document.getElementById("luminarias").value
        );
        const cargaviva = parseFloat(
            document.getElementById("cargaviva").value
        );
        const cargaviento = parseFloat(
            document.getElementById("cargaviento").value
        );
        const radio = (flecha * flecha + ((luz / 2) * luz) / 2) / (2 * flecha);
        const rad = Math.atan(luz / 2 / (radio - flecha));
        const angulo = rad* (180 / Math.PI);
        const longArco = 2 * rad * radio;
        const CGz = radio - (radio * Math.sin(rad)) / rad;
        const areaTotal = longArco * longitudtransversal;
        const radicoCG = (radio * Math.sin(rad / 2)) / (rad / 2);
        const cgmediaCuerda = radicoCG * Math.sin(rad / 2);

        document.getElementById("datosgeometricos").innerHTML = `
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>Radio</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${radio} m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>angulo</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${angulo}°</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>RAD</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${rad}</td>
        </tr>
          <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>Longitud de arco</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${longArco}m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CGz</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CGz}m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>Area total</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${areaTotal}m<sup>2</sup></td>
        </tr>
        </tr>
          <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>Radio de CG de media cuerda</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${radicoCG}m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CG XX de media cuerda</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${cgmediaCuerda}m</td>
        </tr>  `;
        // ========================CALUCULO DE CARGAS=========================================
        const CM = (pesopropio + luminarias) * longArco;
        const CMz = CM * 0.5;
        const CMx =
            ((((pesopropio + luminarias) * longArco) / 2) * cgmediaCuerda -
                (CMz * luz) / 2) /
            flecha;
        const Axial = (CMz * CMz + CMx * CMx) ** 0.5;
        const CV = cargaviva * longArco;
        const CVz= CV *0.5;
        const CVx= (((cargaviva* longArco/2 * cgmediaCuerda)) -CVz * luz/2)/flecha;
        const Axial2= (CVz *CVz+CVx*CVx)**0.5;
        const pesosismico222 = CMz + 0.25 *CVz; 
        const pesoSismico1 =pesosismico222*2;
        
        document.getElementById("calculocargas").innerHTML = `
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CM</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CM}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CMz</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CMz}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CMx</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CMx}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>Axial</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${Axial}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CV</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CV}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CVz</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CVz}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CVx</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CVx}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CVx</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${Axial2}kG/m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>PESO SISMICO CM+.25CV</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${pesoSismico1}kG/m</td>
        </tr> 
          <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${pesosismico222}kG/m</td>
        </tr> 
        `;


        // ========================COEFICIENTE SISMICO=========================================
        const Z = 0.35;
        const U = 1.3;
        const S = 1.2;
        const C = 2.5;
        const R = 8;
        const NADA = Z*U*S*C/R; 

        const CS = pesoSismico1 *NADA;
        const CSx = CS/2;
        const CSz = CSx*(flecha-CGz)/(luz*0.5) ;
        const Axial3 = (CSx * CSx +CSz*CSz)**0.5 ; 

        document.getElementById("coeficientesismico").innerHTML = `
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>Z</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${Z}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>U</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${U}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>S</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${S}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>C</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${C}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>R</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${R}kG/m</td>
        </tr> 
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>R</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${NADA}kG/m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CS</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CS}kG/m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CSx</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CSx}kG/m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>CSz</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${CSz}kG/m</td>
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600">
            <td class='py-2 px-8'>Axial3</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4'>-</td>
            <td class='py-2 px-4 text-center'>${Axial3}kG/m</td>
        </tr>
       `;
    });
});
