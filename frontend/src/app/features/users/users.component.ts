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
import { User, Role } from '../../shared/models';
import { UserService, RoleService } from '../../core/services';

@Component({
  selector: 'app-users',
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
  ],
  template: `
    <div class="users-container">
      <h2>Users Management</h2>
      <button mat-raised-button color="primary" (click)="openCreateDialog()">Add User</button>

      <mat-card class="table-container">
        <table mat-table [dataSource]="users" class="users-table">
          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef>Username</th>
            <td mat-cell *matCellDef="let user">{{ user.username }}</td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let user">{{ user.email }}</td>
          </ng-container>

          <ng-container matColumnDef="roles">
            <th mat-header-cell *matHeaderCellDef>Roles</th>
            <td mat-cell *matCellDef="let user">
              {{ getRoleNames(user) }}
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let user">
              <button mat-icon-button (click)="openEditDialog(user)" title="Edit">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="deleteUser(user.id)" title="Delete">
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
      .users-container {
        padding: 20px;
      }
      .table-container {
        margin-top: 20px;
      }
      .users-table {
        width: 100%;
      }
      button {
        margin-right: 10px;
      }
    `,
  ],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns = ['username', 'email', 'roles', 'actions'];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    console.log('UsersComponent initialized');
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data || [];
    });
    console.log('Users loaded:', this.users);
  }

  getRoleNames(user: User) {
    const names = (user.userRoles || []).map(ur => ur.role?.name).filter(n => !!n);
    return names.length ? names.join(', ') : 'No roles';
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: { user, isEdit: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  template: `
    <h2 mat-dialog-title>{{ data.isEdit ? 'Edit User' : 'Add User' }}</h2>
    <form [formGroup]="form">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="full-width" *ngIf="!data.isEdit">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
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
export class UserFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject('dialogRef') private dialogRef: any,
    @Inject('data') public data: any,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.data.isEdit ? [] : Validators.required],
    });

    if (this.data.isEdit) {
      this.form.patchValue(this.data.user);
    }
  }

  save() {
    if (this.form.valid) {
      if (this.data.isEdit) {
        this.userService.updateUser(this.data.user.id, this.form.value).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        this.userService.createUser(this.form.value).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
