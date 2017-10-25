Install Truffle and TestRPC, and start TestRPC with the following commands.

```
npm install -g truffle`
npm install -g ethereumjs-testrpc
npm install
testrpc --seed 0
```

Install MetaMask extension into Chrome: https://metamask.io

In the MetaMask extension, click "Restore from seed phrase" (https://www.dropbox.com/s/mo7agm53wyjfq6v/Screenshot%202017-10-25%2013.13.46.png?dl=0)

In the seed phrase field, type the following:
```
animal protect payment stamp survey spin identify reopen blanket wrap robot verb
```

And choose a password.
This will import one account with the following address in MetaMask: 0xF6B39cE8221a48A0cecA0B4D375682C622e1829B


And in a new terminal
```
truffle migrate
ng serve
```

Then, go to [http://localhost:4200](http://localhost:4200) and it should display 10000 META as a balance, and the address of the account we imported before.
 
