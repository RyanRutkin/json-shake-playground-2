import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logic: any[];

  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  getLogic() {
    return API.get('JsonShakeRestAPI', '/logic', { headers: {} });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getLogic()
        .then(data => {
          console.log('Successfully pulled logc.');
          this.logic = data
        })
        .catch(e => console.log('Error on GET /logic', e))
    })
  }

}
