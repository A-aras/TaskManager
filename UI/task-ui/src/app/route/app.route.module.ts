import { NgModule } from '@angular/core'
import { RouterModule, Route,Routes } from '@angular/router';
import { TaskblotterComponent } from './../taskblotter/taskblotter.component';
import { TaskeditorComponent } from './../taskeditor/taskeditor.component';


export const RoteConfiguration:Routes=[
    {path:'',redirectTo:'ViewTask',pathMatch:'full'},
    {path:'ViewTask',component:TaskblotterComponent},
    {path:'EditTask/:id',component:TaskeditorComponent},
    {path:'AddTask',component:TaskeditorComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(RoteConfiguration)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}