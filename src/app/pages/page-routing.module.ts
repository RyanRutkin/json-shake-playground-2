import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorPage } from './editor/Editor.page';
import { LogicsPage } from './logics/Logics.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'logic',
        pathMatch: 'full'
    },
    {
        path: 'logic',
        component: LogicsPage,
        pathMatch: 'full'
    },
    {
        path: 'editor',
        component: EditorPage,
        pathMatch: 'full'
    },
    {
        path: 'editor/:id',
        component: EditorPage,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
