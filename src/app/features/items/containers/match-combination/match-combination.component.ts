import { Component, OnInit } from '@angular/core';
import {VoiceRecognitionService} from './match-combination.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './match-combination.component.html',
  styleUrls: ['./match-combination.component.scss'],
  providers: [VoiceRecognitionService]
})
export class SpeechToTextComponent implements OnInit {

  newText: string;
  constructor(
    public service : VoiceRecognitionService
  ) {
    this.service.init()
  }

  ngOnInit(): void {
  }

  startService(){
    this.service.start();
  }
  startEdit() {
    // this.service.text = this.newText;
  }
  stopService(){
    this.service.stop();
    this.service.text = '';
  }

}


















// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MagicItem } from '../../../../shared/items-grid/magic-item.model';
// import { ItemsService } from '../../items.service';
// import { Observable, Subscription } from 'rxjs';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { trigger, state, animate, style, transition } from '@angular/animations';
//
// @Component({
//   templateUrl: './match-combination.component.html',
//   styleUrls: ['./match-combination.component.scss'],
//   animations: [
//     trigger('fadeInOut', [
//       state('void', style({
//         opacity: 0
//       })),
//       transition('void <=> *', animate(200)),
//     ]),
//     trigger('EnterLeave', [
//       state('flyIn', style({ transform: 'translateX(0)' })),
//       transition(':enter', [
//         style({ transform: 'translateX(-100%)' }),
//         animate('0.5s 300ms ease-in')
//       ]),
//       transition(':leave', [
//         animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
//       ])
//     ])
//   ]
// })
// export class MatchCombinationComponent implements OnInit, OnDestroy {
//   load_completed = true;
//   public items: any;
//   private items$: Observable<any>;
//   private itemsSubscription: Subscription;
//   private onlyNumbersMsg: string;
//   public matchCombinationForm: FormGroup;
//   private showForm: boolean = true;
//
//   constructor(private itemsService: ItemsService,private formBuilder: FormBuilder) {
//   }
//
//   ngOnInit(): void {
//     this.buildMatchCombinationForm();
//     this.onlyNumbersMsg = 'Only numbers are allowed';
//     console.log(this.matchCombinationForm);
//     // this.itemsSubscription = this.items$.subscribe(items => this.items = items);
//   }
//   numbersOnly(event: any) {
//     const pattern = /[0-9\-\ ]/;
//     const inputChar = String.fromCharCode(event.charCode);
//     if (event.keyCode !== 8 && !pattern.test(inputChar)) {
//       event.preventDefault();
//     }
//   }
//   buildMatchCombinationForm() {
//     this.matchCombinationForm = this.formBuilder.group({
//       addCa: '',
//       addFamily: '',
//       addVariant: '',
//       chassNo: '',
//       chassisSer: '',
//       delCa: '',
//       delFamily: '',
//       delVariant: '',
//       engine: '',
//       engineNewDigit: null,
//       engineOldDigit: null,
//       factory: '',
//       id: '',
//       model: '',
//       pc: '',
//       transmission: '',
//       transmissionNewDigit: null,
//       transmissionOldDigit: null,
//     });
//   }
//   startMatch() {
//     // this.showForm = false;
//     this.items$ = this.itemsService.matchCombination(this.matchCombinationForm.getRawValue());
//     this.itemsSubscription = this.items$.subscribe(items => {
//       this.items = items.matched;
//     });
//   }
//   ngOnDestroy(): void {
//     this.itemsSubscription.unsubscribe();
//   }
// }
