import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Entitlements Management System</span>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened>
        <mat-nav-list>
          <mat-list-item>
            <a matListItemTitle routerLink="/dashboard">Dashboard</a>
          </mat-list-item>
          <mat-list-item>
            <a matListItemTitle routerLink="/users">Users</a>
          </mat-list-item>
          <mat-list-item>
            <a matListItemTitle routerLink="/roles">Roles</a>
          </mat-list-item>
          <mat-list-item>
            <a matListItemTitle routerLink="/entitlements">Entitlements</a>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container {
        height: calc(100vh - 64px);
      }
      .content {
        padding: 20px;
      }
      mat-nav-list a {
        text-decoration: none;
        color: inherit;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Entitlements Management System';
}
