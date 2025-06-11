<?php

namespace App\Providers\Filament;

use App\Http\Middleware\ApiCacheMiddleware;
use Filament\Http\Middleware\Authenticate;
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Assets\Css;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Navigation\NavigationItem;
use Filament\Navigation\NavigationGroup;
use Rupadana\ApiService\ApiServicePlugin;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Assets\Js;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('EdTech')
            //->brandLogo(asset('images/logo.svg'))
            // ->topNavigation()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
                Widgets\FilamentInfoWidget::class,
            ])
            ->sidebarFullyCollapsibleOnDesktop()
            ->sidebarCollapsibleOnDesktop()
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->plugins([
                FilamentShieldPlugin::make(),
            ])
            ->plugins([
                \Awcodes\Curator\CuratorPlugin::make()
                    ->label('Media')
                    ->pluralLabel('Media')
                    ->navigationIcon('heroicon-o-photo')
                    ->navigationGroup('Content')
                    ->navigationSort(3)
                    ->navigationCountBadge()
                    ->registerNavigation(true)
                    ->defaultListView('list')
                //->resource(MediaResource::class)    
            ])
            ->plugins([
                ApiServicePlugin::make()
                    ->middleware([
                        ApiCacheMiddleware::class
                    ]),
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }

    public function boot(): void
    {
        FilamentAsset::register([
            Css::make('appcss', viteAsset('resources/css/app.css')),
            Js::make('appjs', viteAsset('resources/js/app.js')),
            Css::make('awcodes/curator', './vendor/awcodes/filament-curator/resources/dist/curator.css'),
        ]/*,package: 'awcodes/filament-curator'*/);
    }
}
