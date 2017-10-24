import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetaSenderComponent} from './meta-sender/meta-sender.component';
import {UtilModule} from '../util/util.module';
import {RouterModule} from '@angular/router';
import {MetaCoinService} from './meta-coin.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule
  ],
  providers: [
    MetaCoinService
  ],
  declarations: [MetaSenderComponent],
  exports: [MetaSenderComponent]
})
export class MetaModule {
}
