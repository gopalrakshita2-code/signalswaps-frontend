import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-footer',
    imports: [RouterModule],
    template: `<div class="layout-footer px-4 py-3 text-center">
        <div class="text-xs sm:text-sm md:text-base">
            Built with precision by
            <a routerLink="/auth/login" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline mx-1">SignalSwaps</a>
            — Smart AI Trading Platform
        </div>
    </div>`
})
export class AppFooter {}