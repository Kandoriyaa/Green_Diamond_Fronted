import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClassOfTrade } from '../../../../Core/models/ClassOfTrade';
import { ClassoftradeService } from '../../../../Core/service/classoftrade/classoftrade.service';
import { FormEmailInputComponent } from '../../../../theme/shared/widgets/form-email-input/form-email-input.component';
import { FormInputComponent } from '../../../../theme/shared/widgets/form-input/form-input.component';
import { FormSelectComponent } from '../../../../theme/shared/widgets/form-select/form-select.component';
import { FormTextareaInputComponent } from '../../../../theme/shared/widgets/form-textarea-input/form-textarea-input.component';
import { FromNumberInputComponent } from '../../../../theme/shared/widgets/from-number-input/from-number-input.component';


@Component({
    selector: 'app-class-of-trade-add',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule,FormInputComponent,FromNumberInputComponent,FormTextareaInputComponent,FormSelectComponent,FormEmailInputComponent],
    templateUrl: './class-of-trade-add.component.html',
    styleUrl: './class-of-trade-add.component.css'
})
export class ClassOfTradeAddComponent {
    @Input() Id?: string;  // Add this line to accept routeId as input
    @Input() page?: number;
    @Input() pageSize?: number;
    @Output() saveCompleted = new EventEmitter<void>();

    activeModal = inject(NgbActiveModal);

    classtradeForm!: FormGroup;
    submitted = false;
    classtradeinfo!: ClassOfTrade;
    isEditMode = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private classtradeService: ClassoftradeService,
        private cdr: ChangeDetectorRef
    ) { }

    get f() {
        return this.classtradeForm.controls;
    }

    ngOnInit(): void {
        debugger
        this.classtradeForm = this.formBuilder.group({
            tradeCode: ['', [Validators.required, Validators.maxLength(3)]],
            tradeDesc: ['', [Validators.required, Validators.maxLength(30)]],
            isActive: [true],
        });

        if (this.Id) {
            this.isEditMode = true;
            this.getClassOfTradeById(this.Id);
        }
    }
    getClassOfTradeById(Id: string) {
        this.classtradeService.getClassOfTradeById(Id).subscribe(
            (response) => {
                if (response.success) {
                    this.classtradeinfo = response.data;
                    this.classtradeForm.patchValue(this.classtradeinfo);
                }
            },
            (error) => {
                this.toastr.error(error.error.message);
            }
        );
    }

    saveClassOfTrade() {
        this.submitted = true;
        if (this.classtradeForm.valid) {
            this.classtradeinfo = this.classtradeForm.value;
            this.classtradeService.saveClassOfTrade(this.classtradeinfo).subscribe({
                next: (response) => {
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
