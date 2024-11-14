import {AsyncPipe, CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingBarService} from '../../service/loading-bar.service';
import {Observable} from "rxjs";

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [AsyncPipe, CommonModule],
    templateUrl: './loading-bar.component.html',
    styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent implements OnInit {
    isLoading!: Observable<boolean>;

    constructor(public loadingBarService: LoadingBarService, public cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.isLoading = this.loadingBarService.isLoading;
        this.isLoading.subscribe(() => {
            this.cdr.detectChanges(); // Ensure change detection is run when loading state changes
        });
    }
}
