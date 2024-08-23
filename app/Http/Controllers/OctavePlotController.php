<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OctavePlotController extends Controller
{
    private function runOctave($fun, &$stderr/* , &$stdout, &$stderr */)
    {
        $DESCRIPTORSPEC = array(
            0 => array("pipe", "r"), // stdin is a pipe that the child will read from
            1 => array("pipe", "w"), // stdout is a pipe that the child will write to
            2 => array("pipe", "w")  // stderr is a file to write to
        );

        // Version de octave
        $OCTAVE_VERSION = "8.0.0";

        // Ruta de octave
        $SNAP =  "/home/u112634954/domains/ryaie.com/public_html/public/assets/matlab/content/octave";

        // Ruta de los matlab
        $MATLABS = "./assets/matlab";

        // Variables de entorno
        $ENV = array(
            "LANGUAGE" => "en_US",
            "LANG" => "en_US.UTF-8",
            "LC_ALL" => "en_US.UTF-8",
            "SNAP" => $SNAP,
            "FONTCONFIG_PATH" => "$SNAP/etc/fonts",
            "FONTCONFIG_FILE" => "$SNAP/etc/fonts/fonts.conf",
            "XDG_DATA_HOME" => "$SNAP/usr/share",
            "PATH" => "$SNAP/usr/sbin:$SNAP/usr/bin:$SNAP/sbin:$SNAP/bin:\$PATH",
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
        $process = proc_open('octave-cli -p ' . $MATLABS . ' --no-gui -H -f -W --quiet --eval "' . $fun . '"', $DESCRIPTORSPEC, $pipes, null/* , $env */);
        if (is_resource($process)) {
            // $pipes now looks like this:
            // 0 => writeable handle connected to child stdin
            // 1 => readable handle connected to child stdout
            // Any error output will be appended to /tmp/error-output.txt
            /* fwrite($pipes[0], '<?php print_r($_ENV); ?>'); */

            //$stdout = stream_get_contents($pipes[1]);
            //$stderr = stream_get_contents($pipes[2]);

            fclose($pipes[0]);
            fclose($pipes[1]);
            fclose($pipes[2]);

            // It is important that you close any pipes before calling
            // proc_close in order to avoid a deadlock
            // $ret_code = proc_close($process);
            return proc_close($process);
            /* if ($ret_code !== 0) {
                $stderr = stream_get_contents($pipes[2]);
            } else {
                $stderr = "";
            }
            fclose($pipes[2]);

            return $ret_code; */
            // echo "command returned $return_value\n";
        } else {
            return -1;
        }
    }

    public function graficarFC(Request $request)
    {
        $function = sprintf(
            "fuerzas_cortantes('%s', %s, %s, %s, %s, %s, %s, %s, %s, %s);",
            $request->input('_id'),
            $request->input('fc'),
            $request->input('Fy'),
            $request->input('E'),
            $request->input('b'),
            $request->input('h'),
            $request->input('Lt'),
            $request->input('WD'),
            $request->input('WV'),
            $request->input('anchoTributario'),
        );

        $isOk = Self::runOctave($function, $stderr/* , $stdout, $stderr */) === 0;

        if ($isOk) {
            $T1 = file_get_contents("./assets/img/fcsv/T1" . $request->input('_id', 0) . ".csv");
            $T2 = file_get_contents("./assets/img/fcsv/T2" . $request->input('_id', 0) . ".csv");

            echo json_encode([
                "response" => "ok",
                "T1" => $T1,
                "T2" => $T2,
            ]);
        } else {
            echo json_encode([
                "response" => "error",
                //"stdout" => $stdout,
                "stderr" => $stderr
            ]);
        }
    }

    public function graficarZapatas(Request $request)
    {
        // A, Ixx, Iyy, Df, PS, MXS, MYS, Pm, MXm, MYm, Pv, MXv, MYv, xv, yv
        // A, Ixx, Iyy, Df, PS, MXS, MYS, Pm, MXm, MYm, Pv, MXv, MYv, xv, yv
        $function = sprintf(
            "zapatas('%s', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);",
            $request->input("_id"),
            $request->input("A"),
            $request->input("Ixx"),
            $request->input("Iyy"),
            $request->input("Df"),
            $request->input("PS"),
            $request->input("MXS"),
            $request->input("MYS"),
            $request->input("Pm"),
            $request->input("MXm"),
            $request->input("MYm"),
            $request->input("Pv"),
            $request->input("MXv"),
            $request->input("MYv"),
            $request->input("xv"),
            $request->input("yv")
        );

        $isOk = Self::runOctave($function, $stderr/* , $stdout, $stderr */) === 0;

        if ($isOk) {
            echo json_encode([
                "response" => "ok"
            ]);
        } else {
            echo json_encode([
                "response" => "error",
                //"stdout" => $stdout,
                "stderr" => $stderr
            ]);
        }
    }
}
