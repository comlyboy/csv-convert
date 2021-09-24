import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class GraphQlService {
  private API_URL = environment.API_URL;

  private dataInStore: any[] = []
  private dataFetched: any[] = []

  private datasUpdated = new Subject<{
    fetchLength: number;
    storeLength: number;
  }>();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) { }


  getDatasUpdateListener() {
    return this.datasUpdated.asObservable();
  }

  getData() {

    this.dataInStore = this.dataFromStore();
    console.log(this.dataInStore);

    this.http
      .get<any[]>(this.API_URL)
      .subscribe(data => {

        console.log(data)

        const newDataToStore = [...this.dataInStore, ...data]

        this.notificationService.notify(`Data fetched successfully`);

        this.datasUpdated.next({
          fetchLength: data.length,
          storeLength: newDataToStore.length
        });


        this.storageService.saveData(newDataToStore)
      }, error => {
        this.notificationService.notify(`Error occured`, `error`);
        console.log(error)
      });
  }






  private convertToCSV() {

  }

  private dataFromStore() {
    return this.storageService.getDataInSore();
  }

}
