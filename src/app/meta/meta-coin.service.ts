import { Injectable } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import {default as contract} from 'truffle-contract';
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MetaCoinService {
  public MetaCoin: any;
  public loaded$ = new Subject();

  constructor(private web3Service: Web3Service) {
    this.MetaCoin = contract(metacoin_artifacts);
    this.web3Service.loaded$.subscribe((web3) => {
      this.MetaCoin.setProvider(web3.currentProvider);
      this.loaded$.next();
    });
  }

  private getInstance() {
    return this.MetaCoin.deployed();
  }

  getBalance(account: string) {
    return this.getInstance().then((metaCoinInstance) => {
      return metaCoinInstance.getBalance.call(account);
    });
  }
}
