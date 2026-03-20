import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Entitlement } from '../../shared/models';
import { EntitlementService } from '../../core/services';

@Component({
  selector: 'app-entitlements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
  template: `
    <div class="entitlements-container">
      <h2>Entitlements Management</h2>
      <button mat-raised-button color="primary" (click)="openCreateDialog()">Add Entitlement</button>

      <mat-card class="table-container">
        <table mat-table [dataSource]="entitlements" class="entitlements-table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let ent">{{ ent.name }}</td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let ent">{{ ent.description }}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let ent">
              <button mat-icon-button (click)="openEditDialog(ent)" title="Edit">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="deleteEntitlement(ent.id)" title="Delete">
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
      .entitlements-container {
        padding: 20px;
      }
      .table-container {
        margin-top: 20px;
      }
      .entitlements-table {
        width: 100%;
      }
      button {
        margin-right: 10px;
      }
    `,
  ],
})
export class EntitlementsComponent implements OnInit {
  entitlements: Entitlement[] = [];
  displayedColumns = ['name', 'description', 'actions'];

  constructor(private entitlementService: EntitlementService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEntitlements();
  }

  loadEntitlements() {
    this.entitlementService.getEntitlements().subscribe(response => {
      this.entitlements = response.data || [];
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(EntitlementFormDialogComponent, {
      width: '400px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEntitlements();
      }
    });
  }

  openEditDialog(entitlement: Entitlement) {
    const dialogRef = this.dialog.open(EntitlementFormDialogComponent, {
      width: '400px',
      data: { entitlement, isEdit: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEntitlements();
      }
    });
  }

  deleteEntitlement(id: string) {
    if (confirm('Are you sure you want to delete this entitlement?')) {
      this.entitlementService.deleteEntitlement(id).subscribe(() => {
        this.loadEntitlements();
      });
    }
  }
}

@Component({
  selector: 'app-entitlement-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.isEdit ? 'Edit Entitlement' : 'Add Entitlement' }}</h2>
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
export class EntitlementFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private entitlementService: EntitlementService,
    @Inject('dialogRef') private dialogRef: any,
    @Inject('data') public data: any,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    if (this.data.isEdit) {
      this.form.patchValue(this.data.entitlement);
    }
  }

  save() {
    if (this.form.valid) {
      if (this.data.isEdit) {
        this.entitlementService.updateEntitlement(this.data.entitlement.id, this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.entitlementService.createEntitlement(this.form.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
