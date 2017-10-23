import {Injectable} from '@angular/core';
import {default as Web3} from 'web3';
import {Observable, Subject} from 'rxjs/Rx';
import {isNullOrUndefined} from 'util';

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: Web3;

  constructor() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.log('Initializing web3 with MetaMask-injected provider');
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  }

  public getProvider() {
    return this.web3.currentProvider;
  }

  public getAccounts(): Observable<string[]> {
    console.log('Accounts requested');
    if (isNullOrUndefined(this.web3)) {
      return Observable.of([]);
    }
    return Observable.fromPromise(this.web3.eth.getAccounts());
  }
}
