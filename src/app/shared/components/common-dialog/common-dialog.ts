import { Component, inject, input, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Button } from 'primeng/button';
import { MainStore } from "../../../store/main.store";
import { toObservable } from "@angular/core/rxjs-interop";

@Component({
	selector: 'app-common-dialog',
	imports: [Dialog, Button],
	templateUrl: './common-dialog.html',
	styleUrl: './common-dialog.css',
	standalone: true,
})
export class CommonDialog implements OnInit, OnDestroy {
	width = input('auto');
	mainStore = inject(MainStore)
	@ViewChild('header') headerElement!: HTMLHeadingElement;
	@Input() closable!: boolean;
	needTopSpace = input(false);
	visible$ = new BehaviorSubject<boolean>(false);
	@Input() visible = false;
	header = input.required<string>();
	private subscription!: Subscription;

	constructor() {
		toObservable(this.mainStore.isDialogVisible).subscribe({
			next: (value) => {
				this.visible$.next(value);
			}
		});
	}

	ngOnDestroy(): void {
		// console.log('CommonDialog destroyed');
		this.visible$.next(false);
		this.visible$.complete();
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		if (this.visible$) {
			this.subscription = this.visible$.subscribe((value) => {
				this.visible = value;
			});
		} else {
			console.error('visible$ is not defined.');
		}
	}

	onClose(): void {
		this.visible$.next(false);
	}

	onOpen() {
		this.visible$.next(true);
	}
}
