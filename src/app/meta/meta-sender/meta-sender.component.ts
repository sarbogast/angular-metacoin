import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import {MetaCoinService} from '../meta-coin.service';

@Component({
  selector: 'app-meta-sender',
  templateUrl: './meta-sender.component.html',
  styleUrls: ['./meta-sender.component.css']
})
export class MetaSenderComponent implements OnInit {
  accounts: string[];
  MetaCoin: Promise<any>;
  amount = 5;
  receiver = '';
  balance = 0;
  account = '';
  status = '';

  constructor(private web3Service: Web3Service, private metaCoinService: MetaCoinService) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    this.metaCoinService.loaded$.subscribe(() => {
      this.refreshAccounts();
    });
  }

  refreshAccounts() {
    this.web3Service.getAccounts().then((accounts: string[]) => {
      this.accounts = accounts;
      if (accounts.length > 0) {
        this.account = accounts[0];
        this.refreshBalance();
      }
    }).catch((error) => {
      this.setStatus('Error loading accounts');
    });
  }

  refreshBalance() {
    this.metaCoinService.getBalance(this.account).then((balance) => {
      console.log('balance: ' + balance);
      this.balance = balance.valueOf();
    }).catch((error) => {
      this.setStatus('Error loading balance');
    });
  }

  setStatus(status) {
    this.status = status;
  }

  sendCoin() {
    if (!this.MetaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.amount;
    const receiver = this.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');

    this.MetaCoin.then((contract) => {
      return contract.deployed();
    }).then((metaCoinInstance) => {
      return metaCoinInstance.sendCoin.sendTransaction(receiver, amount, {from: this.account});
    }).then((success) => {
      if (!success) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }
    }).catch((e) => {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    });
  }

  clickAddress(e) {
    /*this.account = e.target.value;
    this.refreshBalance();*/
  }

  setAmount(e) {
    console.log('Setting amount: ' + e.target.value);
    this.amount = e.target.value;
  }

  setReceiver(e) {
    console.log('Setting receiver: ' + e.target.value);
    this.receiver = e.target.value;
  }

}
