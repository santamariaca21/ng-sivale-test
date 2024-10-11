import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './components/loader/loader.component';
import {VerticalLayoutComponent} from "./components/vertical-layout/vertical-layout.component";
import {AppRoutingModule} from "../app-routing.module";
import {LoaderService} from "./services/loader.service";
import {SharedModule} from "../shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CoreHttpInterceptor} from "./interceptors/http.interceptor";

@NgModule({
  declarations: [
    LoaderComponent,
    VerticalLayoutComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    LoaderComponent,
    VerticalLayoutComponent,
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreHttpInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
}
