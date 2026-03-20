import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Role, Entitlement } from '../../shared/models';
import { RoleService, EntitlementService } from '../../core/services';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
  ],
  template: `
    <div class="roles-container">
      <h2>Roles Management</h2>
      <button mat-raised-button color="primary" (click)="openCreateDialog()">Add Role</button>

      <mat-card class="table-container">
        <table mat-table [dataSource]="roles" class="roles-table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let role">{{ role.name }}</td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let role">{{ role.description }}</td>
          </ng-container>

          <ng-container matColumnDef="entitlements">
            <th mat-header-cell *matHeaderCellDef>Entitlements</th>
            <td mat-cell *matCellDef="let role">
              <mat-chip-set>
                <mat-chip *ngFor="let re of role.roleEntitlements">
                  {{ re.entitlement?.name }}
                </mat-chip>
              </mat-chip-set>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let role">
              <button mat-icon-button (click)="openEditDialog(role)" title="Edit">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="openAssignEntitlementDialog(role)" title="Assign Entitlements">
                <mat-icon>add_task</mat-icon>
              </button>
              <button mat-icon-button (click)="deleteRole(role.id)" title="Delete">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .roles-container {
        padding: 20px;
      }
      .table-container {
        margin-top: 20px;
      }
      .roles-table {
        width: 100%;
      }
      button {
        margin-right: 10px;
      }
    `,
  ],
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  entitlements: Entitlement[] = [];
  displayedColumns = ['name', 'description', 'entitlements', 'actions'];

  constructor(private roleService: RoleService, private entitlementService: EntitlementService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadRoles();
    this.loadEntitlements();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(response => {
      this.roles = response.data || [];
    });
  }

  loadEntitlements() {
    this.entitlementService.getEntitlements().subscribe(response => {
      this.entitlements = response.data || [];
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      width: '400px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  openEditDialog(role: Role) {
    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      width: '400px',
      data: { role, isEdit: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  openAssignEntitlementDialog(role: Role) {
    const dialogRef = this.dialog.open(AssignEntitlementDialogComponent, {
      width: '400px',
      data: { role, entitlements: this.entitlements },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  deleteRole(id: string) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(id).subscribe(() => {
        this.loadRoles();
      });
    }
  }
}

@Component({
  selector: 'app-role-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.isEdit ? 'Edit Role' : 'Add Role' }}</h2>
    <form [formGroup]="form">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Description</mat-label>
        <input matInput formControlName="description" />
      </mat-form-field>
      <div class="button-group">
        <button mat-raised-button color="primary" (click)="save()">Save</button>
        <button mat-button (click)="close()">Cancel</button>
      </div>
    </form>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
        margin-bottom: 15px;
      }
      .button-group {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
    `,
  ],
})

@Injectable()
export class RoleFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    @Inject('dialogRef') private dialogRef: any,
    @Inject('data') public data: any,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    if (this.data.isEdit) {
      this.form.patchValue(this.data.role);
    }
  }

  save() {
    if (this.form.valid) {
      if (this.data.isEdit) {
        this.roleService.updateRole(this.data.role.id, this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.roleService.createRole(this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-assign-entitlement-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatChipsModule],
  template: `
    <h2 mat-dialog-title>Assign Entitlements to {{ data.role.name }}</h2>
    <mat-form-field appearance="fill" class="full-width">
      <mat-label>Select Entitlement</mat-label>
      <mat-select [(value)]="selectedEntitlementId">
        <mat-option>
          <ngx-mat-select-search [ctrlToFilter]="filteredEntitlements"></ngx-mat-select-search>
        </mat-option>
        <mat-option *ngFor="let ent of availableEntitlements" [value]="ent.id">
          {{ ent.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <div class="button-group">
      <button mat-raised-button color="primary" (click)="assign()">Assign</button>
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
        margin-bottom: 15px;
      }
      .button-group {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
    `,
  ],
})
@Injectable()
export class AssignEntitlementDialogComponent {
  selectedEntitlementId = '';
  availableEntitlements: Entitlement[] = [];
  filteredEntitlements: Entitlement[] = [];

  constructor(
    private roleService: RoleService,
    @Inject('dialogRef') private dialogRef: any,
    @Inject('data') public data: any,
  ) {
    const assignedIds = (data.role.roleEntitlements || []).map((re: any) => re.entitlement_id);
    this.availableEntitlements = (data.entitlements || []).filter((e: Entitlement) => !assignedIds.includes(e.id));
    this.filteredEntitlements = this.availableEntitlements;
  }

  assign() {
    if (this.selectedEntitlementId) {
      this.roleService.addEntitlementToRole(this.data.role.id, this.selectedEntitlementId).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
