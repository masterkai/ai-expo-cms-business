import { Component, input, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Button } from 'primeng/button';

@Component({
	selector: 'app-common-dialog',
	imports: [Dialog, Button],
	templateUrl: './common-dialog.html',
	styleUrl: './common-dialog.css',
	standalone: true,
})
export class CommonDialog implements OnInit, OnDestroy {
	@ViewChild('header') headerElement!: HTMLHeadingElement;
	@Input() closable!: boolean;
	needTopSpace = input(false);
	visible$ = new BehaviorSubject<boolean>(false);
	visible = false;
	header = input.required<string>();
	private subscription!: Subscription;

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
