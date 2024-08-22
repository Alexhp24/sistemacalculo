<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\VarDumper\VarDumper;

class FuerzasCortantesController extends Controller
{
    public function graficarfc(Request $request)
    {
        $descriptorspec = array(
            0 => array("pipe", "r"), // stdin is a pipe that the child will read from
            1 => array("pipe", "w"), // stdout is a pipe that the child will write to
            2 => array("pipe", "w")  // stderr is a file to write to
        );
        // Version de octave
        $OCTAVE_VERSION = "8.0.0";

        // Ruta de octave
        $SNAP =  "assets/matlab/content/octave"; //"/home/scqutz9qwlhh/public_html/content/octave";

        // Variables de entorno
        $env = array(
            "LANGUAGE" => "en_US",
            "LANG" => "en_US.UTF-8",
            "LC_ALL" => "en_US.UTF-8",
            "SNAP" => $SNAP,
            "FONTCONFIG_PATH" => "$SNAP/etc/fonts",
            "FONTCONFIG_FILE" => "$SNAP/etc/fonts/fonts.conf",
            "XDG_DATA_HOME" => "$SNAP/usr/share",
            "PATH" => "\$PATH:$SNAP/usr/sbin:$SNAP/usr/bin:$SNAP/sbin:$SNAP/bin",
            "GNUPLOT_DRIVER_DIR" => "$SNAP/usr/lib/gnuplot",
            "GNUPLOT_LUA_DIR" => "$SNAP/usr/share/gnuplot/gnuplot/5.2/lua",
            "GNUPLOT_PS_DIR" => "$SNAP/usr/share/gnuplot/gnuplot/5.2/PostScript",
            "GS_LIB" => "$SNAP/usr/share/ghostscript/9.26/Resource/Init:$SNAP/usr/share/ghostscript/9.26/lib:$SNAP/usr/share/ghostscript/9.26/Resource/Font:$SNAP/usr/share/ghostscript/fonts:$SNAP/usr/share/fonts",
            "LOCPATH" => "$SNAP/usr/lib/locale",
            "OCTAVE_HOME" => "$SNAP",
            "PKG_CONFIG_PATH" => "$SNAP/lib/pkgconfig:$SNAP/usr/lib/x86_64-linux-gnu/pkgconfig:$SNAP/usr/share/pkgconfig",
            "PKG_CONFIG_SYSROOT_DIR" => "$SNAP",
            "UNITSFILE" => "$SNAP/usr/share/units/definitions.units",
            "LD_LIBRARY_PATH" => "$SNAP/lib/octave:$SNAP/lib/octave/$OCTAVE_VERSION:$SNAP/usr/lib/x86_64-linux-gnu:$SNAP/usr/lib:$SNAP/lib/x86_64-linux-gnu:$SNAP/bin"
        );
        $function = sprintf(
            "fuerzas_cortantes('%s', %s, %s, %s, %s, %s, %s, %s, %s);",
            $request->input('_id'),
            $request->input('fc'),
            $request->input('Fy'),
            $request->input('E'),
            $request->input('b'),
            $request->input('h'),
            $request->input('Lt'),
            $request->input('WD'),
            $request->input('WV')
        );

        $process = proc_open('octave-cli -p .assets/matlab/fuerzas_cortantes --no-gui -H -f -W --quiet --eval "' . $function . '"', $descriptorspec, $pipes, null, $env);
        if (is_resource($process)) {

            // echo "STDOUT:" . stream_get_contents($pipes[1])  . "<br>";
            // echo "STDERR:" . stream_get_contents($pipes[2])  . "<br>";

            fclose($pipes[0]);
            fclose($pipes[1]);
            fclose($pipes[2]);

            // It is important that you close any pipes before calling
            // proc_close in order to avoid a deadlock
            $return_value = proc_close($process);
            // echo "command returned $return_value\n";
        }

        $T1 = file_get_contents("T1" . $_POST['_id'] . ".csv");
        $T2 = file_get_contents("T2" . $_POST['_id'] . ".csv");
        echo json_encode([
            "T1" => $T1,
            "T2" => $T2,
        ]);
    }
}
