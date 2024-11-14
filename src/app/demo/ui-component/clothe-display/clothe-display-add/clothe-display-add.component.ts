import { ClotheDisplay } from './../../../../Core/models/ClotheDisplay';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormEmailInputComponent } from '../../../../theme/shared/widgets/form-email-input/form-email-input.component';
import { FormInputComponent } from '../../../../theme/shared/widgets/form-input/form-input.component';
import { FormSelectComponent } from '../../../../theme/shared/widgets/form-select/form-select.component';
import { FormTextareaInputComponent } from '../../../../theme/shared/widgets/form-textarea-input/form-textarea-input.component';
import { FromNumberInputComponent } from '../../../../theme/shared/widgets/from-number-input/from-number-input.component';
import { ImageComponent } from '../../../../theme/shared/widgets/image/image.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClothedisplayService } from '../../../../Core/service/clothedisplay/clothedisplay.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-clothe-display-add',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ImageComponent,
        FormsModule,
        FormInputComponent,
        FromNumberInputComponent,
        FormTextareaInputComponent,
        FormSelectComponent,
        FormEmailInputComponent
    ],
    templateUrl: './clothe-display-add.component.html',
    styleUrl: './clothe-display-add.component.css'
})
export class ClotheDisplayAddComponent implements OnInit {
    clotheDisplayForm!: FormGroup;
    submitted = false;
    isEditMode = false;
    imageUrl!: string;
    @Input() id?: number;
    clotheDisplay!: ClotheDisplay;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private clothedisplayService: ClothedisplayService
    ) {
    }

    get f() {
        return this.clotheDisplayForm.controls;
    }

    ngOnInit(): void {debugger
        this.clotheDisplayForm = this.formBuilder.group({
            id:[0],
            clotheName:['', Validators.required],
            clotheFile: [''],
            price:['', Validators.required],
            discription:['', Validators.required],
            quantity:[null, Validators.required],
            typeOfMaterial:['', Validators.required],
            discount:['', Validators.required],
            manufacturer:['', Validators.required],
            isActive: [true],
        });
       
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];  
            if (this.id) {
                this.isEditMode = true;
                this.getClotheDisplayById(this.id);
            }
        });
    }

    // Get by id
    getClotheDisplayById(Id: number) {debugger
        this.clothedisplayService.getClotheDisplayById(Id).subscribe(
            (response) => {
                if (response.success) {
                    this.clotheDisplay = response.data;
                    this.imageUrl = this.clotheDisplay.photo; // Image Preview
                    this.clotheDisplayForm.patchValue(this.clotheDisplay);
                }
            },
            (error) => {
                this.toastr.error(error.error.message);
            }
        );
    }
    //Save
    saveClotheDisplay() {debugger
        this.submitted = true;
        if (this.clotheDisplayForm.valid) {
            this.clotheDisplay = this.clotheDisplayForm.value;
            const formData = new FormData();
            formData.append('id', this.clotheDisplay.id.toString());
            formData.append('clotheName', this.clotheDisplay.clotheName);
            formData.append('clotheFile', this.clotheDisplay.clotheFile ?? '');
            formData.append('price', this.clotheDisplay.price.toString());
            formData.append('discription', this.clotheDisplay.discription ?? '');
            formData.append('quantity', this.clotheDisplay.quantity.toString() ?? '');
            formData.append('typeOfMaterial', this.clotheDisplay.typeOfMaterial! ?? '');
            formData.append('discount', this.clotheDisplay.discount ?? '');
            formData.append('manufacturer', this.clotheDisplay.manufacturer ?? '');
            formData.append('isActive', JSON.stringify(this.clotheDisplay.isActive));
            this.clothedisplayService.saveClotheDisplay(formData).subscribe({
                next: (response) => {debugger
                    this.toastr.success(response.message);
                    this.router.navigate(['/ui-componet/clothe-display/list']);
                },
                error: (error) => {
                    this.toastr.error(error.error.message);
                }
            });
        }
    }

    
    // saveClotheDisplay() {debugger
    //     this.submitted = true;
    //     if (this.clotheDisplayForm.valid) {debugger
    //         const formData = new FormData();
    //         const clothInfo = this.clotheDisplayForm.value;
    //         Object.keys(clothInfo).forEach(key => {
    //             const value = clothInfo[key];
    //             if (value !== null && value !== undefined) {
    //                 formData.append(key, value);
    //             }
    //         });
    //         console.log(formData);
    //             this.clothedisplayService.saveClotheDisplay(formData).subscribe({
    //               next: (response) => {
    //                 this.toastr.success(response.message);
    //                 this.onCancel();
    //               },
    //               error: (error) => {
    //                 this.toastr.error(error.error.message);
    //               },
    //             });
    //     }
    // }


    //Cancel
    onCancel() {
        this.router.navigate(['']);
    }

    //File Select
    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            // this.tenantLogo = file;
            this.clotheDisplayForm.patchValue({ clotheFile: file });
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

}
