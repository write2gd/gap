import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { version } from '../environments/version';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { tryLogin } from './core/security/store/security.actions';

@Component({
  selector: 'jsvs-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private title: Title) {
  }

  ngOnInit(): void {
    // this.store.dispatch(tryLogin());
    this.title.setTitle(`GAP`);
  }

}
