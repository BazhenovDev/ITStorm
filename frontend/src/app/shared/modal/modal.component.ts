import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {ServicesType} from "../../../types/services.type";
import {ServicesService} from "../services/services.service";
import {ModalConstants} from "../../../constants/modal.constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ModalUtil} from "../utils/modal.util";
import {UserInfoType} from "../../../types/user-info.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() type: string = '';
  @Input() currentSelectType: string = '';
  @Input() userInfo: UserInfoType | null = null;
  modalOrderType: string = ModalConstants.order;
  modalConsultType: string = ModalConstants.consult;
  modalThanksType: string = ModalConstants.thanks;

  allServices: ServicesType[] = [];
  requestError: boolean = false;

  consultForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required]],
    type: ['consultation'],
  });

  orderForm: FormGroup = this.fb.group({
    service: [this.currentSelectType, Validators.required],
    name: ['', Validators.required],
    phone: ['', [Validators.required]],
    type: ['order'],
  });


  constructor(private modalService: ModalService,
              private servicesService: ServicesService,
              private fb: FormBuilder,) {
  }

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.type = '';
    const getModalTypeSub = this.modalService.modalType$
      .subscribe(modalType => {
        this.type = modalType;
      });
    this.allServices = this.servicesService.getServices();
    this.subscription.add(getModalTypeSub);

    // const currentForm = this.type === this.modalConsultType ? this.consultForm : this.orderForm;
    // currentForm.get('phone')?.valueChanges.subscribe(value => {
    //   const formatted = this.formatPhone(value);
    //   currentForm.get('phone')?.setValue(formatted, {emitEvent: false});
    // })
  }

  // Для установки option, который передаётся из card-info => main-component => modal
  // А так же для установки имени, если пользователь залогинен
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentSelectType'] && this.currentSelectType) {
      this.orderForm.patchValue({service: this.currentSelectType});
    }
    if (this.userInfo && this.userInfo.name) {
      this.orderForm.patchValue({name: this.userInfo.name});
      this.consultForm.patchValue({name: this.userInfo.name});
    }
  }


  @HostListener('document:click', ['$event'])
  closeModal(event: MouseEvent): void {
    const modalClose = (event.target as HTMLElement).closest('.modal-close');
    const modal = (event.target as HTMLElement).closest('.modal');
    const modalWrapper = (event.target as HTMLElement).closest('.modal-wrapper');
    const okButton = (event.target as HTMLElement).closest('.okay-button');

    if ((this.type && modalClose) || (this.type && modal && !modalWrapper) || (this.type && modal && okButton)) {
      this.modalService.setModalType('');
    }
  }

  sendForm(): void {
    if (this.type === 'consult') {
      if (this.consultForm.valid) {
        const consultFormValue = this.consultForm.value;
        const formRequestSub = this.modalService.sendFormRequest({
          name: consultFormValue.name || '',
          phone: consultFormValue.phone.replace(/\D/g, '') || '',
          type: consultFormValue.type,
        }).subscribe((response: DefaultResponseType) => {
          if (response && !response.error) {
            this.modalService.setModalType(this.modalThanksType);
          } else {
            this.requestError = true;
          }
        })
        this.subscription.add(formRequestSub);
      }

    } else if (this.type === 'order') {
      if (this.orderForm.valid) {
        const orderFormValue = this.orderForm.value;
        const service: string = ModalUtil.getTitle(orderFormValue.service);
        const formRequestSub = this.modalService.sendFormRequest({
          service: service || '',
          name: orderFormValue.name || '',
          phone: orderFormValue.phone.replace(/\D/g, '') || '',
          type: orderFormValue.type,
        }).subscribe((response: DefaultResponseType) => {
          if (response && !response.error) {
            this.modalService.setModalType(this.modalThanksType);
          } else {
            this.requestError = true;
          }
        })
        this.subscription.add(formRequestSub);
      }

    }
  }

  // onKeyDown(event: KeyboardEvent): void {
  //   if (!/[0-9+\-()]/.test(event.key) &&
  //     event.key !== 'Backspace' &&
  //     event.key !== 'Delete' &&
  //     event.key !== 'ArrowLeft' &&
  //     event.key !== 'ArrowRight'&&
  //     event.key !== 'Tab') {
  //     event.preventDefault();
  //   }
  // }

  // formatPhone(value: string) {
  //   const phoneNumbers: string = value.replace(/\D/g, '');
  //   let phoneFormatNumber: string = '';
  //
  //   let countryCode: string = phoneNumbers.slice(0,1);
  //
  //   if (countryCode === '8') {
  //     phoneFormatNumber += `+7`;
  //   } else if (!countryCode) {
  //     phoneFormatNumber = '+_';
  //   } else if (countryCode === '7' || countryCode === '3') {
  //     phoneFormatNumber += `+${countryCode}`;
  //   } else {
  //     phoneFormatNumber += `${countryCode}`;
  //   }
  //
  //   let operatorCode: string = phoneNumbers.slice(1, 4);
  //   operatorCode ? phoneFormatNumber += `(${operatorCode})` : phoneFormatNumber += '(___)';
  //   let firstPartPhone: string = phoneNumbers.slice(4, 7);
  //   firstPartPhone ? phoneFormatNumber += `${firstPartPhone}` : phoneFormatNumber += '___';
  //   let secondPartPhone: string = phoneNumbers.slice(7, 9);
  //   secondPartPhone ? phoneFormatNumber += `-${secondPartPhone}` : phoneFormatNumber += '-__';
  //   let threePartPhone: string = phoneNumbers.slice(9, 11);
  //   threePartPhone ? phoneFormatNumber += `-${threePartPhone}` : phoneFormatNumber += '-__';
  //
  //   return phoneFormatNumber
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
