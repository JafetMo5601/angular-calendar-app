import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';


export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-custom-pop-up',
  templateUrl: './custom-pop-up.component.html',
  styleUrls: ['./custom-pop-up.component.css']
})
export class CustomPopUpComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() btnOkText: string | undefined;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
