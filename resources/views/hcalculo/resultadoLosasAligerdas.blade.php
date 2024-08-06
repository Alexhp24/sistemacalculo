<!-- resources/views/partials/resultadoLosasAligerdas.blade.php -->
<table id="desingcorte" class="min-w-full text-gray-800 dark:text-white">
    <!-- Requisitos de diseño vigas -->
    <thead class="bg-gray-200 dark:bg-gray-800">
        <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
            <th class="text-xl py-2 px-4 text-left" colspan="4">1.- Requisitos de diseño</th>
        </tr>
        <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
            <th class="text-lg py-2 px-4" scope="col">Nombre</th>
            <th class="text-lg py-2 px-4" scope="col">Símbolo</th>
            <th class="text-lg py-2 px-4" scope="col">Fórmula</th>
            @for ($i = 1; $i <= $num_tramos; $i++) <th scope="col">START</th>
                <th scope="col">MIDDLE</th>
                <th scope="col">END</th>
                @endfor
        </tr>
    </thead>
    <tbody class="bg-gray-100 dark:bg-gray-800  py-2">
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Luz libre</td>
            <td class='py-2 px-4'>LL</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $luzLibre[ceil($i / 3)] }} m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Carga Muerta</td>
            <td class='py-2 px-4'>CM</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $CM[ceil($i / 3)] }} Ton. m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Carga Viva</td>
            <td class='py-2 px-4'>CV</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $Cv[ceil($i / 3)] }} Ton. m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Base de la losa</td>
            <td class='py-2 px-4'>Base</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $base[ceil($i / 3)] }} cm</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Altura de la losa</td>
            <td class='py-2 px-4'>h</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $altura[ceil($i / 3)] }} cm</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Ancho tributario vigueta</td>
            <td class='py-2 px-4'>b</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $bp[ceil($i / 3)] }} cm</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Momento lado izquierdo</td>
            <td class='py-2 px-4'>Mi</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $Mi[ceil($i / 3)] }} Tonf-m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Momento lado derecho</td>
            <td class='py-2 px-4'>Md</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $Md[ceil($i / 3)] }} Tonf-m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Deflección debido a la carga muerta</td>
            <td class='py-2 px-4'>δ1</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $did1[ceil($i / 3)] }} cm</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Deflección debido a la carga viva</td>
            <td class='py-2 px-4'>δ2</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $did2[ceil($i / 3)] }} cm</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Deflección debido al 30% de la carga viva</td>
            <td class='py-2 px-4'>δ3</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $did3[ceil($i / 3)] }} cm</td>
            @endforeach
        </tr>
    </tbody>

    <!-- Valores negativos -->
    <thead class="bg-gray-200 dark:bg-gray-800">
        <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
            <th class="text-xm py-2 px-4 text-left" colspan="4">1.1- Valores negativos</th>
        </tr>
        <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
            <th class="text-lg py-2 px-4" scope="col">Nombre</th>
            <th class="text-lg py-2 px-4" scope="col">Símbolo</th>
            <th class="text-lg py-2 px-4" scope="col">Fórmula</th>
            @for ($i = 1; $i <= $num_tramos; $i++) <th scope="col">START</th>
                <th scope="col">MIDDLE</th>
                <th scope="col">END</th>
                @endfor
        </tr>
    </thead>
    <tbody class="bg-gray-100 dark:bg-gray-800  py-2">
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Momento ultimo negativo</td>
            <td class='py-2 px-4'>Mu(-)</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $mu[ceil($i / 3)] }} m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Momento ultimo negativo</td>
            <td class='py-2 px-4'>Mu(-)</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $mu[ceil($i / 3)] }} m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Fuerza cortante (-)</td>
            <td class='py-2 px-4'>VU -</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $vu[ceil($i / 3)] }} Tn-m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Torsión (-)</td>
            <td class='py-2 px-4'>TU -</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $tu[ceil($i / 3)] }} Tn-m</td>
            @endforeach
        </tr>
    </tbody>

    <!-- Valores positivos -->
    <thead class="bg-gray-200 dark:bg-gray-800">
        <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
            <th class="text-xm py-2 px-4 text-left" colspan="4">1.2- Valores positivos</th>
        </tr>
        <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
            <th class="text-lg py-2 px-4" scope="col">Nombre</th>
            <th class="text-lg py-2 px-4" scope="col">Símbolo</th>
            <th class="text-lg py-2 px-4" scope="col">Fórmula</th>
            @for ($i = 1; $i <= $num_tramos; $i++) <th scope="col">START</th>
                <th scope="col">MIDDLE</th>
                <th scope="col">END</th>
                @endfor
        </tr>
    </thead>
    <tbody class="bg-gray-100 dark:bg-gray-800  py-2">
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Momento ultimo positivo</td>
            <td class='py-2 px-4'>Mu(+)</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $mu_[ceil($i / 3)] }} Tn-m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Fuerza cortante (+)</td>
            <td class='py-2 px-4'>VU +</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $vu_[ceil($i / 3)] }} Tn-m</td>
            @endforeach
        </tr>
        <tr class="bg-gray-100 dark:bg-gray-600 text-center">
            <td class='py-2 px-4'>Torsión (+)</td>
            <td class='py-2 px-4'>TU +</td>
            <td class='py-2 px-4'>-</td>
            @foreach (range(1, $num_tramos * 3) as $i)
            <td class='py-2 px-4'>{{ $tu_[ceil($i / 3)] }} Tn-m</td>
            @endforeach
        </tr>
    </tbody>

    <!-- Diseño por flexion -->
    @php
    // Inicializar arrays para almacenar los resultados
    $dValues = [];
    $q4Values = [];
    $aValues = [];

    // Realizar los cálculos y almacenar los resultados
    for ($i = 1; $i <= $num_tramos * 3; $i++) { 
        $currentIndex=ceil($i / 3);
        $dValue=$altura[$currentIndex] - 3; 
        $dValues[$i]=$dValue; 
        $baseValue=$base[$currentIndex]; 

        $q4=pow($dValue, 2) - 2 * abs($mu[$i] * pow(10, 5)) / (0.90 * 0.85 * $fc * $baseValue); $q4Values[$i]=$q4; if ($q4> 0) {
            $a = round($dValue - sqrt(pow($dValue, 2) - $q4), 2, PHP_ROUND_HALF_UP);
        } else {
            $a = null; // O puedes usar un valor específico si quieres indicar error
        }

        $aValues[$i] = $a;
        }
        @endphp

        <thead class="bg-gray-200 dark:bg-gray-800">
            <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                <th class="text-xl py-2 px-4 text-left" colspan="4">2.- Diseño por flexion</th>
            </tr>
            <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                <th class="text-lg py-2 px-4" scope="col">Nombre</th>
                <th class="text-lg py-2 px-4" scope="col">Símbolo</th>
                <th class="text-lg py-2 px-4" scope="col">Fórmula</th>
                @for ($i = 1; $i <= $num_tramos; $i++) <th scope="col">START</th>
                    <th scope="col">MIDDLE</th>
                    <th scope="col">END</th>
                    @endfor
            </tr>
        </thead>
        <tbody class="bg-gray-100 dark:bg-gray-800  py-2">
            <tr class="bg-gray-100 dark:bg-gray-600 text-center">
                <td class='py-2 px-4'>Peralte efectivo</td>
                <td class='py-2 px-4'>d</td>
                <td class='py-2 px-4'>h - 3</td>
                @foreach (range(1, $num_tramos * 3) as $i)
                <td class='py-2 px-4 text-center'>{{ $dValues[$i] }} cm</td>
                @endforeach
            </tr>

            <!-- Fila para Dimensión característica de la sección transversal -->
            <tr class="bg-gray-100 dark:bg-gray-600 text-center">
                <td class='py-2 px-4'>Dimensión característica de la sección transversal</td>
                <td class='py-2 px-4'>a</td>
                <td class='py-2 px-4'>d - (d² - 2 * |MU * 10^5| / (0.90 * 0.85 * f'c * base))^0.5</td>
                @foreach (range(1, $num_tramos * 3) as $i)
                @if ($q4Values[$i] > 0)
                <td class='py-2 px-4 text-center'>{{ $aValues[$i] }} cm</td>
                @else
                <td class='py-2 px-4 text-center'>Raíz de negativo</td>
                @endif
                @endforeach
            </tr>
            <tr class="bg-gray-100 dark:bg-gray-600 text-center">
                <td class='py-2 px-4'>Refuerzo usado en claro</td>
                <td class='py-2 px-4'>As</td>
                <td class='py-2 px-4'>(0.85 * f'c * base * a) / Fy</td>
                @foreach (range(1, $num_tramos * 3) as $i)
                @php
                $As = isset($aValues[$i]) ? round((0.85 * $fc * $base[$currentIndex] * $aValues[$i]) / $fy, 2, PHP_ROUND_HALF_UP) : 'N/A';
                @endphp
                <td class='py-2 px-4 text-center'>{{ $As }} cm²</td>
                @endforeach
            </tr>
            <tr class="bg-gray-100 dark:bg-gray-600 text-center">
                <td class='py-2 px-4'>-</td>
                <td class='py-2 px-4'>As min</td>
                <td class='py-2 px-4'>max(0.7*(f'c)^0.5/Fy*base*d, 14*base*$d/Fy)</td>
                @foreach (range(1, $num_tramos * 3) as $i)
                @php
                    $As_min = round(max(0.7 * sqrt($fc) / $fy * $base[$currentIndex] * $dValues[$i], 14 * $base[$currentIndex] * $dValues[$i] / $fy), 2, PHP_ROUND_HALF_UP);
                @endphp
                <td class='py-2 px-4 text-center'>{{ $As_min }} cm²</td>
                @endforeach
            </tr>
            <tr class="bg-gray-100 dark:bg-gray-600 text-center">
                <td class='py-2 px-4'>-</td>
                <td class='py-2 px-4'>As Balanceado</td>
                <td class='py-2 px-4'>(0.85 * β1 * f'c / Fy * (0.003 / (0.003 + 0.0021))) * base * d</td>
                @foreach (range(1, $num_tramos * 3) as $i)
                @php
                    $β1 = 0.85;
                    $As_max = round((0.85 * $β1 * $fc / $fy * (0.003 / (0.003 + 0.0021))) * $base[$currentIndex] * $dValues[$i], 2, PHP_ROUND_HALF_UP);
                @endphp
                <td class='py-2 px-4 text-center'>{{ $As_max }} cm²</td>
                @endforeach
            </tr>
            <tr class="bg-gray-100 dark:bg-gray-600 text-center">
                <td class='py-2 px-4'>-</td>
                <td class='py-2 px-4'>As Max 75%Abs</td>
                <td class='py-2 px-4'>0.75 * (0.85 * β1 * f'c / fy * (0.003 / (0.003 + 0.0021))) * base * d</td>
                @foreach (range(1, $num_tramos * 3) as $i)
                @php
                    $β1 = 0.85;
                    $As_maxabs = round(0.75 * (0.85 * $β1 * $fc / $fy * (0.003 / (0.003 + 0.0021))) * $base[$currentIndex] * $dValues[$i], 2, PHP_ROUND_HALF_UP);
                @endphp
                <td class='py-2 px-4 text-center'>{{ $As_maxabs }} cm²</td>
                @endforeach
            </tr>
        </tbody>
</table>