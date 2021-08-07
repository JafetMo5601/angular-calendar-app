import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-successfully',
  templateUrl: './successfully.component.html',
  styleUrls: ['./successfully.component.css']
})
export class SuccessfullyComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }
}
