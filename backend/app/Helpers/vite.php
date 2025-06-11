<?php
if (!function_exists('viteAsset')) {
    function viteAsset(string $asset): string
    {
        $manifestPath = public_path('build/manifest.json');
        $manifest = json_decode(file_get_contents($manifestPath), true);

        if (!isset($manifest[$asset])) {
            throw new Exception("Asset {$asset} not found in Vite manifest.");
        }

        return asset('build/' . $manifest[$asset]['file']);
    }
}
