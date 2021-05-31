import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jsvs-modal',
  templateUrl: './modal-component.html',
  styleUrls: ['./modal-component.scss']
})
export class ModalComponent {
  @Input() title: string;
  @Input() actionButtonLabel: string;
  @Input() cancelButtonLabel: string;
  @Input() launchButtonLabel: string;
  @Input() data?: any;
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content', { static: false }) modalTemplate: TemplateRef<object>;
  @ContentChild('projectedTemplate', {static: false}) projectedTemplate: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  open(content: TemplateRef<object>): void {
    this.modalService.open(content)
      .result.then(
        closeResult => this.confirm.emit(closeResult),
        () => this.cancel.emit()
    );
  }
}
