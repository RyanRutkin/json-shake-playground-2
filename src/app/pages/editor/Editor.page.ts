import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { API } from 'aws-amplify';
import { ShakeLogicService } from 'src/app/shared/services/ShakeLogic.service';
import { ShakeDisplay } from 'src/app/shared/types/ShakeDisplay.type';
import { ShakeTriggerDefinition } from 'src/app/shared/types/ShakeTriggerDefinition.type';
import { ShakeVariableDefinition } from 'src/app/shared/types/ShakeVariableDefinition.type';
import { ShakeClosureDefinition } from 'src/app/shared/types/ShakeClosureDefinition.type';

@Component({
    selector: 'app-aditor-page',
    styleUrls: ['./Editor.page.scss'],
    templateUrl: './Editor.page.html'
})
export class EditorPage implements OnInit {
    constructor(
        private _route: ActivatedRoute,
        private _logicService: ShakeLogicService
    ) { }

    ngOnInit() {
        const logicId = this._route.snapshot.paramMap.get('id');
        if (logicId) {
            this._getLogicById(logicId).then(logic => {
                if (logic) {
                    this._logicService.loadLogic(logic);
                } else {
                    this._createNewLogic();
                }
            })
        } else {
            this._createNewLogic();
        }
    }
  
    _getLogicById(id: string) {
        return API.get('JsonShakeRestAPI', '/logic', { headers: {} })
            .then(data => {
                return data.find(l => l?.logic?.id === id)
            })
            .catch(e => console.log('Error on GET /logic', e))
    }

    _createNewLogic() {
        this._logicService.loadLogic({
            logic: {
                label: 'New Logic',
                variables: {} as Record<string, ShakeVariableDefinition>,
                onStart: null,
                onDestroy: null,
                triggers: [] as ShakeTriggerDefinition[],
                closures: [] as ShakeClosureDefinition[],
                id: null,
            } as ShakeClosureDefinition,
            display: {} as Record<string, ShakeDisplay>,
            createdOn: new Date().getTime(),
            createdBy: ''
        });
    }
}