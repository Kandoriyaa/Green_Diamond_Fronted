import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconService } from '@ant-design/icons-angular';
import { FormSelectComponent } from '../../shared/widgets/form-select/form-select.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        FormSelectComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Input() type?: string;
    // public props
    @Output() NavCollapse = new EventEmitter();
    @Output() NavCollapsedMob = new EventEmitter();

    navCollapsed!: boolean;
    windowWidth: number;
    isExpandSideMenu: boolean = false;


    // Constructor
    constructor(private modalService: NgbModal) {
        this.windowWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    // eslint-disable-next-line
    onResize(event: any): void {
        this.windowWidth = event.target.innerWidth;
        this.navCollapseMob();
    }
    // public method
    navCollapse() {
        if (this.windowWidth >= 1025) {
            this.navCollapsed = !this.navCollapsed;
            this.NavCollapse.emit();
        }
    }
    openProfileMenu(content: TemplateRef<any>) {
    }

    navCollapseMob() {
        if (this.windowWidth < 1025) {
            this.NavCollapsedMob.emit();
        }
    }

    toggleMenu() {
        this.isExpandSideMenu = !this.isExpandSideMenu;
        if (this.isExpandSideMenu) {
            document.body.classList.add('slide-menu');
        } else {
            document.body.classList.remove('slide-menu');
        }
    }

    profile = [
        {
            icon: 'edit',
            title: 'Edit Profile'
        },
        {
            icon: 'user',
            title: 'View Profile'
        },
    ];

    setting = [
        {
            icon: 'lock',
            title: 'Privacy Center'
        },
    ];
}
