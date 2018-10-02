import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskrowComponent } from './taskrow/taskrow.component';
import { TaskqueryComponent } from './taskquery/taskquery.component';
import { TaskblotterComponent } from './taskblotter/taskblotter.component';
import { TaskeditorComponent } from './taskeditor/taskeditor.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TaskdashboardComponent } from './taskdashboard/taskdashboard.component';
import { AppRoutingModule } from 'src/app/route/app.route.module';
import { APP_BASE_HREF } from '@angular/common';
import { TaskserviceService } from 'src/app/Service/taskservice.service';
import { ITaskService } from 'src/app/Service/ITaskService';
import  { DatepickerModule,BsDatepickerModule,ModalModule} from 'ngx-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    TaskrowComponent,
        TaskqueryComponent,
    TaskblotterComponent,
    TaskeditorComponent,
    TaskdetailsComponent,
    TaskdashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot()
    
  ],
  providers: [{provide: ITaskService,useClass:TaskserviceService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
