import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="app-cmp-nav">
      <div routerLinkActive="app-st-active">
        <a routerLink="view">View</a>
      </div>
      <div routerLinkActive="app-st-active">
        <a routerLink="form">Form</a>
      </div>
    </nav>

    <div class="content-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .content-container {
        border: 1px solid var(--app-surface-container-color);
        padding: 20px;
        border-radius: 8px;
        min-height: 200px;
        margin: 10px auto;
        max-width: 800px;
        text-align: left;
      }
    `,
  ],
})
export class AssignmentRootPage {}
