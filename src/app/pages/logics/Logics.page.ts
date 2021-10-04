import { Component } from "@angular/core";
import { ShakeLogicWithDisplay } from 'src/app/shared/types/ShakeLogicWithDisplay.type';
import { Platform } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
    selector: 'app-logics-page',
    styleUrls: ['./Logics.page.scss'],
    templateUrl: './Logics.page.html'
})
export class LogicsPage {
    logics: ShakeLogicWithDisplay[] = [] as ShakeLogicWithDisplay[];

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
                    this.logics = data as ShakeLogicWithDisplay[];
                })
                .catch(e => console.log('Error on GET /logic', e))
        });
    }
}