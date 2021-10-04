import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/*
const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
*/

import { EditorPage } from './pages/editor/Editor.page';
import { LogicsPage } from './pages/logics/Logics.page';

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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}