import { Injectable } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import {default as contract} from 'truffle-contract';
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';

@Injectable()
export class MetaCoinService {
  public MetaCoin: any;

  constructor(private web3Service: Web3Service) {
    this.MetaCoin = contract(metacoin_artifacts);
    this.web3Service.loaded$.subscribe((web3) => {
      this.MetaCoin.setProvider(web3.currentProvider);
    });
  }


}
