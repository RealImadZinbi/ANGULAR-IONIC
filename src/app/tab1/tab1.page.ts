import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit,OnDestroy {
  amountEarned: number;
  paperSaved: number;
  subscription: Subscription;
  ngOnInit() {
      this.generateRandom();
      this.generatePaper();
    }
    generateRandom() {
      const interval = period => new Observable<number>(observer => {
        let i: number = 0;
        setInterval(() => observer.next(i = i + Math.floor(Math.random() * (70-4)) + 1), period);
    
      });
        const data$ = interval(1000);
        this.subscription = data$.subscribe({
          next: value => {
          this.amountEarned = value
        },
          error: error => console.error(error.toString()),
    });   
    }
    generatePaper() {
      const interval = period => new Observable<number>(observer => {
        let j: number = 0;
        setInterval(() => observer.next(j = j + Math.floor(Math.random() * (300-45)) + 1), period);
    
      });
        const data$ = interval(1000);
        this.subscription = data$.subscribe({
          next: value => {
          this.paperSaved = value
        },
          error: error => console.error(error.toString()),
    });  
  }
  
  constructor(private barcodeScanner: BarcodeScanner) {}
  
  scanCode() {
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
   }).catch(err => {
       console.log('Error', err);
   });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
