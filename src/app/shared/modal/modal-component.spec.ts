import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { mockService } from '../../../tests/mocked-services';
import { ModalComponent } from './modal-component';

describe('ModalComponent', () => {

  let component: ModalComponent,
      fixture: ComponentFixture<ModalComponent>,
      modalService: NgbModal;

  const data = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent
      ],
      providers: [
        {provide: NgbModal, useValue: mockService(NgbModal)}
      ]
    });

    fixture = TestBed
      .overrideTemplate(ModalComponent, '')
      .createComponent(ModalComponent);

    component = fixture.componentInstance;
    modalService = TestBed.get(NgbModal);
    fixture.detectChanges();
  }));

  afterEach(async(() => {
    fixture.destroy();
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should open modal and emit data on closeMenu modal', fakeAsync(() => {
    spyOn(component.confirm, 'emit');
    (modalService.open as jasmine.Spy).and.returnValue({result: Promise.resolve(data)});
    component.open(component.modalTemplate);
    expect(modalService.open).toHaveBeenCalled();
    tick();
    expect(component.confirm.emit).toHaveBeenCalledWith(data);
  }));

  it('should open modal and emit event on dismiss modal', fakeAsync(() => {
    spyOn(component.cancel, 'emit');
    (modalService.open as jasmine.Spy).and.returnValue({result: Promise.reject(null)});
    component.open(component.modalTemplate);
    expect(modalService.open).toHaveBeenCalled();
    tick();
    expect(component.cancel.emit).toHaveBeenCalled();
  }));

});

