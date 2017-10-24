import {Injectable} from '@angular/core';
import {default as Web3} from 'web3';
import {Subject} from 'rxjs/Rx';
declare let window: any;

@Injectable()
export class Web3Service {
  private web3: Web3;
  public loaded$ = new Subject<Web3>();

  constructor() {
    window.addEventListener('load', (event) => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        this.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log('No web3? You should consider trying MetaMask!');
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      }
      this.loaded$.next(this.web3);
      setInterval(() => this.refreshAccounts(), 100);
    });
  }

  private refreshAccounts() {

  }

  getAccounts() {
    return this.web3.eth.getAccounts();
  }
}
