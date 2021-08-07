import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NgxMatDatetimePickerModule,
    NgxMatColorPickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    NgxMatMomentModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ]
})
export class MaterialsModule { }
