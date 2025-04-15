<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
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
            ->navigationGroups([
                NavigationGroup::make()
                    ->label('Sessions'),
                    //->collapsed(),
            ])
            ->navigationItems([
                NavigationItem::make()
                    ->label('All Sessions')
                    ->icon('heroicon-o-calendar')
                    ->url('/admin/session')
                    ->group('Sessions'),

                NavigationItem::make()
                    ->label('Attendances')
                    ->icon('heroicon-o-check-circle')
                    ->url('/admin/session/attendance')
                    ->group('Sessions'),

                NavigationItem::make()
                    ->label('Feedbacks')
                    ->icon('heroicon-o-chat-bubble-left-ellipsis')
                    ->url('/admin/session/feedback')
                    ->group('Sessions'),

                NavigationItem::make()
                    ->label('Status')
                    ->icon('heroicon-o-chart-bar')
                    ->url('/admin/session/status')
                    ->group('Sessions'),
            ])
            ->navigationGroups([
                NavigationGroup::make()
                    ->label('Tutors')
                    ->collapsed()
            ])
            ->navigationItems([
                NavigationItem::make()
                    ->label('Tutor Availability')
                    ->icon('heroicon-o-clock')
                    ->url('/admin/tutor-availability')
                    ->group('Tutors'),

                NavigationItem::make()
                    ->label('Tutor Availability Slot')
                    ->icon('heroicon-o-calendar')
                    ->url('/admin/tutor-availability-slot')
                    ->group('Tutors'),
 
                NavigationItem::make()
                    ->label('Tutor Hours Lookup')
                    ->icon('heroicon-o-magnifying-glass')
                    ->url('/admin/tutor-hours-lookup')
                    ->group('Tutors'),

                NavigationItem::make()
                    ->label('Tutor Student Session Lookup')
                    ->icon('heroicon-o-users')
                    ->url('/admin/tutor-student-session-lookup')
                    ->group('Tutors'),
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
                ApiServicePlugin::make()
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
