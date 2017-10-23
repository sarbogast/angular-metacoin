import {Injectable} from '@angular/core';
import {default as contract} from 'truffle-contract';
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';
import {Web3Service} from '../util/web3.service';
import {Subject, Observable} from 'rxjs/Rx';

@Injectable()
export class MetaCoinService {
  public MetaCoin: any;

  constructor(private web3Service: Web3Service) {
    this.MetaCoin = contract(metacoin_artifacts);
    this.MetaCoin.setProvider(this.web3Service.getProvider());
  }

  getBalance(account: string): Observable<number> {
    console.log(`Balance requested for account ${account}`);
    if (this.MetaCoin.currentProvider) {
      const promise = new Promise((resolve, reject) => {
        this.MetaCoin.deployed().then((metaCoinInstance) => {
          console.log(metaCoinInstance);
          return metaCoinInstance.getBalance.call(account);
        }).then((balance) => {
          console.log(`Balance: ${balance}`);
          resolve(balance);
        }).catch((error) => {
          console.error(error);
          reject(error);
        });
      });
      return Observable.fromPromise(promise);
    } else {
      return Observable.of(0);
    }
  }
}
