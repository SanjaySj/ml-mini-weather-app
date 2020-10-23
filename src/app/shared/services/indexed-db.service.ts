import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})

export class IndexedDbService {

  constructor(private dbService: NgxIndexedDBService) {

  }

  add(obj) {
    this.dbService.add('cardList', obj).subscribe((key) => {
      // console.log('key: ', key);
    });
  }

  update(obj) {
    this.dbService.update('cardList', obj)
      .subscribe((storeData) => {
        // console.log('storeData: ', storeData);
      });
  }

  getAll() {
    return this.dbService.getAll('cardList');
  }

  getOneData(index) {
    return this.dbService.getByKey('cardList', index);
  }

}
