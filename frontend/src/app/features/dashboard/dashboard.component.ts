import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService, RoleService, EntitlementService } from '../../core/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  template: `
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <mat-grid-list cols="3" rowHeight="200px" gutterSize="16px">
        <mat-grid-tile>
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Total Users</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h1>{{ userCount }}</h1>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Total Roles</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h1>{{ roleCount }}</h1>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="stat-card">
            <mat-card-header>
              <mat-card-title>Total Entitlements</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h1>{{ entitlementCount }}</h1>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 20px;
      }
      .stat-card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .stat-card h1 {
        font-size: 3rem;
        margin: 10px 0;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  userCount = 0;
  roleCount = 0;
  entitlementCount = 0;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private entitlementService: EntitlementService,
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.userService.getUsers().subscribe(response => {
      this.userCount = response.data?.length || 0;
    });
    this.roleService.getRoles().subscribe(response => {
      this.roleCount = response.data?.length || 0;
    });
    this.entitlementService.getEntitlements().subscribe(response => {
      this.entitlementCount = response.data?.length || 0;
    });
  }
}
