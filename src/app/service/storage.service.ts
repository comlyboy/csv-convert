import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /** Saves data into browser storage.
  
  Returns `Void` */
  saveData(data: any[]) {
    const dataString = JSON.stringify(data);

    localStorage.setItem('data', dataString);
  }


  /**
* gets data.
* 
* Returns `[  ]`, if data is not awailable.

*/
  getDataInSore(): any[] {
    const data = localStorage.getItem('data');
    if (!data) {
      return [];
      // make past request leting api know that data was received
    }
    return JSON.parse(data);
  }



  clearStore() {
    localStorage.removeItem('data');
  }


}
