import {ModalService} from "./modal.service";
import {ModalConstants} from "../../../constants/modal.constants";
import {of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {ModalComponent} from "../modal/modal.component";
import {FormBuilder} from "@angular/forms";

describe('modal service', () => {

  let modalService: ModalService;
  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    httpSpy.post.and.callFake((url: string, body: any) => {
      if (!body.name || !body.phone || typeof body.phone !== 'string' || !body.type) {
        return of({error: true, message: 'default response error message'});
      }
      return of({error: false, message: 'default response message'});
    });

    TestBed.configureTestingModule({
      providers: [ModalService,
        {provide: HttpClient, useValue: httpSpy}
      ]
    });

    modalService = TestBed.inject(ModalService);

  })

  it ('should emit order status for modal service', (done: DoneFn) => {
    modalService.modalType$
      .subscribe((value: string) => {
        expect(value).toBe(ModalConstants.order);
        done();
      });
    modalService.setModalType(ModalConstants.order);
  });

  it ('should return default response from sendFormRequest', (done: DoneFn) => {
    modalService.sendFormRequest({name: 'Иван', phone: '79009001020', type: 'order'})
      .subscribe(response => {
        expect(response.error).toBe(false);
        done();
      })
  });

  it ('should return default error response from sendFormRequest', (done: DoneFn) => {
    modalService.sendFormRequest({name: '', phone: '79009001020', type: 'order'})
      .subscribe(response => {
        expect(response.error).toBe(true);
        done();
      })
  });

  it ('should fail sendFormRequest when phone is not a string', (done: DoneFn) => {
    modalService.sendFormRequest({name: 'Иван', phone: 79009001020 as any, type: 'order'})
      .subscribe(response => {
        expect(response.error).toBe(true);
        done();
      })
  });

  it ('should emit order status for modal service', (done: DoneFn) => {
      modalService.modalType$.subscribe(newType => {
        expect(newType).toBe(ModalConstants.order);
        done();
      });

      modalService.setModalType(ModalConstants.order);
  });

  it ('should emit order status for modal service in component', (done: DoneFn) => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    const modalService = TestBed.inject(ModalService);

    fixture.detectChanges();

    modalService.modalType$.subscribe(newType => {
      expect(component.type).toBe(newType);
      done();
    });

    modalService.setModalType(ModalConstants.consult);

  });

})
