import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DragBtnComponent } from './component/drag-btn/drag-btn.component';

const routes: Routes = [
  // {path: 'btn', component: DragBtnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
