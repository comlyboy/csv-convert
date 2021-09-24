import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConversionService } from './service/conversion.service';

import { HttpService } from './service/http.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataFetchedLength = 0;
  dataStoredLength = 0;

  private dataSub: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private conversionService: ConversionService
  ) { }


  onFetch() {
    this.httpService.getData()
  }


  onConvert() {
    this.conversionService.exportCSVFile()
  }

  onClear() {
    this.storageService.clearStore();
  }




  private initContents() {
    this.dataSub = this.httpService.getDatasUpdateListener()
      .subscribe(data => {
        this.dataFetchedLength = data.fetchLength;
        this.dataStoredLength = data.storeLength;
      });

  }


  ngOnInit() {
    this.initContents();
  }



  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    // // if (this.authUserTypeListenerSub) {
    // //   this.authUserTypeListenerSub.unsubscribe();
    // // }
    // if (this.authUserPermissionsSub) {
    //   this.authUserPermissionsSub.unsubscribe();
    // }
  }

}
