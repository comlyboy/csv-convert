import { Injectable } from '@angular/core';

import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor(
    private storageService: StorageService,
    private notificationService: NotificationService
  ) { }


  exportCSVFile() {
    const csv = this.convertToCSV();

    const exportedFilenmae = new Date() + '.csv' || 'export.csv';

    if (csv) {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      // if (navigator.msSaveBlob) { // IE 10+
      //   navigator.msSaveBlob(blob, exportedFilenmae);
      // } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // }

    }

  }


  private convertToCSV() {
    const data = this.storageService.getDataInSore();

    const array = [Object.keys(data[0])].concat(data)

    return array.map(item => {
      return Object.values(item).toString()
    }).join('\n')
  }



}
