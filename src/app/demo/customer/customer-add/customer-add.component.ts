import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormEmailInputComponent } from '../../../theme/shared/widgets/form-email-input/form-email-input.component';
import { FormInputComponent } from '../../../theme/shared/widgets/form-input/form-input.component';
import { FormSelectComponent } from '../../../theme/shared/widgets/form-select/form-select.component';
import { FormTextareaInputComponent } from '../../../theme/shared/widgets/form-textarea-input/form-textarea-input.component';
import { FromNumberInputComponent } from '../../../theme/shared/widgets/from-number-input/from-number-input.component';
import { Customer } from '../../../Core/models/Customer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../../Core/service/customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-customer-add',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormInputComponent,
        FromNumberInputComponent,
        FormTextareaInputComponent,
        FormSelectComponent,
        FormEmailInputComponent,
    ],
    templateUrl: './customer-add.component.html',
    styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {

    @Input() Id?: number;  // Add this line to accept routeId as input
    @Input() page?: number;
    @Input() pageSize?: number;
    @Output() saveCompleted = new EventEmitter<void>();

    //   activeModal = inject(NgbActiveModal); this is commite Becouas Not Open Add Page this sentence

    customerForm!: FormGroup;
    submitted = false;
    customerinfo!: Customer;
    isEditMode = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private customerService: CustomerService,
        private cdr: ChangeDetectorRef
    ) { }

    get f() {
        return this.customerForm.controls;
    }

    ngOnInit(): void {
        this.customerForm = this.formBuilder.group({
            custFirstName: ['', [Validators.required, Validators.maxLength(30)]],
            custLastName: ['', [Validators.required, Validators.maxLength(30)]],
            custUserName: ['', [Validators.required, Validators.maxLength(30)]],
            custPassword: ['', [Validators.required]],
            custEmailAddrerss: ['', [Validators.required]],
            custApproved: [true],
            custPhoneNo: ['', [Validators.required]],
            custAddress: ['', [Validators.required]],
            custCountry: ['', [Validators.required]],
            custState: ['', [Validators.required]],
            custCity: ['', [Validators.required]],
            isActive: [true],
        });

        if (this.Id) {
            this.isEditMode = true;
            this.getCustomerById(this.Id);
        }
    }
    getCustomerById(Id: number) {
        debugger
        this.customerService.getCustomerById(Id).subscribe(
            (response) => {
                if (response.success) {
                    this.customerinfo = response.data;
                    this.customerForm.patchValue(this.customerinfo);
                }
            },
            (error) => {
                this.toastr.error(error.error.message);
            }
        );
    }

    //Cancel
    onCancel() {
        this.router.navigate(['/customer/list']);
    }

    saveCustomer() {
        debugger
        this.submitted = true;
        if (this.customerForm.valid) {
            this.customerinfo = this.customerForm.value;
            this.customerService.saveCustomer(this.customerinfo).subscribe({
                next: (response) => {
                    debugger
                    this.toastr.success(response.message);
                    this.saveCompleted.emit();
                },
                error: (error) => {
                    this.toastr.error(error.error.message);
                },
            });
        }
    }
}
