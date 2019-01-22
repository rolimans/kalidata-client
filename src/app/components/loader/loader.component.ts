import { Component, OnInit, OnDestroy } from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
    fullop = false;
    visible = false;
    private subscription: Subscription;

    constructor(private loader: LoaderService) { }

    ngOnInit() {
        this.subscription = this.loader.subjectShow$
            .subscribe((state: boolean) => {
                this.fullop = state;
                if (state === false) {
                    setTimeout(() => {
                        this.visible = state;
                    }, 1000);
                } else {
                  this.visible = state;
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
