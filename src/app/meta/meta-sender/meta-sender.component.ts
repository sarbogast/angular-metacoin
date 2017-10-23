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
  amount = 5;
  receiver = '';
  balance = 0;
  account = '';
  status = '';

  constructor(private web3Service: Web3Service, private metaCoinService: MetaCoinService) {

  }

  ngOnInit(): void {
    this.web3Service.getAccounts().subscribe((accounts: string[]) => {
      this.accounts = accounts;
      if (this.accounts.length > 0) {
        this.account = accounts[0];
        this.refreshBalance();
      }
    });
  }

  setStatus(status) {
    this.status = status;
  }

  refreshBalance() {
    console.log('Refreshing balance');
    this.metaCoinService.getBalance(this.account).subscribe((balance) => {
      this.balance = balance;
    }, (error) => {
      console.error(error);
      this.setStatus('Error getting balance; see log.');
    });
  }

  clickAddress(e) {
    this.account = e.target.value;
    this.refreshBalance();
  }

  setAmount(e) {
    console.log('Setting amount: ' + e.target.value);
    this.amount = e.target.value;
  }

  setReceiver(e) {
    console.log('Setting receiver: ' + e.target.value);
    this.receiver = e.target.value;
  }

  sendCoin() {
    /*if (!this.MetaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');

    this.MetaCoin.then((contract) => {
      return contract.deployed();
    }).then((metaCoinInstance) => {
      return metaCoinInstance.sendCoin.sendTransaction(receiver, amount, {from: this.model.account});
    }).then((success) => {
      if (!success) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }
    }).catch((e) => {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    });*/
  }

}
