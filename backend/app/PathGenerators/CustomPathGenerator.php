<?php 

namespace App\PathGenerators;

use Awcodes\Curator\PathGenerators;
use Awcodes\Curator\PathGenerators\Contracts\PathGenerator;

class CustomPathGenerator implements PathGenerator
{
    public function getPath(?string $baseDir = null): string
    {
        //return ($baseDir ? $baseDir . '/' : '') . 'my/custom/path';
         
        $datePath = now()->format('Y/m');

        return ($baseDir ? $baseDir . '/' : '') . $datePath;
    }
}
