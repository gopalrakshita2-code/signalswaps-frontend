import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-button-demo',
    standalone: true,
    imports: [ButtonModule, ButtonGroupModule, SplitButtonModule,SelectModule,CommonModule,FormsModule,FluidModule,ImageModule,ToastModule],
    templateUrl: './buttondemo.html',
    providers: [MessageService]
})
export class ButtonDemo implements OnInit {
    items: MenuItem[] = [];

    loading = [false, false, false, false];
    selectedCoin: any = null;
    CoinsList: any[] = [
                { name: "bitcoin", code: "btc", image: "assets/demo/images/deposit/BTC.png" },
                { name: "ethereum", code: "eth", image: "assets/demo/images/deposit/ETH.png", scan:"assets/demo/images/scan/ETH.png", address: "0x5098aA32b08A5908d2e0f4cCB407aF6910A8494f" },
                { name: "tetherBEP20", code: "usdt(bep20)", image: "assets/demo/images/deposit/USDT.png" },
                { name: "tetherTRC20", code: "usdt(trc20)", image: "assets/demo/images/deposit/USDT.png" },
                { name: "binancecoin", code: "bnb", image: "assets/demo/images/deposit/BNB.png" },
                { name: "ripple", code: "xrp", image: "assets/demo/images/deposit/XRP.png" },
                { name: "usd-coin", code: "usdc", image: "assets/demo/images/deposit/USDC.png" },
                { name: "solana", code: "sol", image: "assets/demo/images/deposit/SOL.png" },
                { name: "dogecoin", code: "doge", image: "assets/demo/images/deposit/DOGE.png" },
                { name: "litecoin", code: "ltc", image: "assets/demo/images/deposit/LTC.png" }
    ];
    currentSelectedCoin:any = null;
    selectedCoinAddress:string = '';
    selectedCoinImage:string = '';
    selectedCoins:any[] = [
        { address: "bc1q06shnswlkwzf3e2zyn0j0cqm0anfltjf752d98", name: "bitcoin", code: "btc", scan: "assets/demo/images/scan/BTC.png" },
        { address: "0x5098aA32b08A5908d2e0f4cCB407aF6910A8494f", name: "ethereum", code: "eth", scan: "assets/demo/images/scan/ETH.png" },
        { address: "0x5098aA32b08A5908d2e0f4cCB407aF6910A8494f", name: "tetherBEP20", code: "usdt(bep20)", scan: "assets/demo/images/scan/usdtBep20.png" },
        { address: "TJ3iZrJhW3DRCuJvTAvx8votAAAzBs8R7D", name: "tetherTRC20", code: "usdt(trc20)", scan: "assets/demo/images/scan/usdtTrc20.png" },
        { address: "0x5098aA32b08A5908d2e0f4cCB407aF6910A8494f", name: "binancecoin", code: "bnb", scan: "assets/demo/images/scan/BNB.png" },
        { address: "rB6Cxi2XzHbpfajucYgMCnTY5xJucjKvMP", name: "ripple", code: "xrp", scan: "assets/demo/images/scan/XRP.png" },
        { address: "0x5098aA32b08A5908d2e0f4cCB407aF6910A8494f", name: "usd-coin", code: "usdc", scan: "assets/demo/images/scan/UsdcBCP20.png" },
        { address: "4jmKBg3tbagtidG6D3TFdfXCMftaNiFMtv4HqWGFwKX6", name: "solana", code: "sol", scan: "assets/demo/images/scan/SOL.png" },
        { address: "DECfdniei6LEERbMZzzeZ5Y1eLr88vctRa", name: "dogecoin", code: "doge", scan: "assets/demo/images/scan/DOGE.png" },
        { address: "ltc1qxnhuxntzm473hzy3uf56xf9qwk2z8e0emtlz27", name: "litecoin", code: "ltc", scan: "assets/demo/images/scan/LTC.png" }
    ]
   constructor(private service: MessageService) {}

    ngOnInit() {
        this.items = [{ label: 'Update', icon: 'pi pi-refresh' }, { label: 'Delete', icon: 'pi pi-times' }, { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' }, { separator: true }, { label: 'Setup', icon: 'pi pi-cog' }];
        this.initializeSelectedValues();
    }
    initializeSelectedValues() {
        this.selectedCoin = this.CoinsList.find(coin => coin.code === 'eth');
        this.selectedCoinImage=this.selectedCoin.scan;
        this.selectedCoinAddress=this.selectedCoin.address;
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => (this.loading[index] = false), 1000);
    }

    onCoinChange(event: any) {
        console.log(event);
        this.currentSelectedCoin=this.selectedCoins.find(coin => coin.code === event.code);
        this.selectedCoinAddress=this.currentSelectedCoin.address;
        this.selectedCoinImage=this.currentSelectedCoin.scan;
    }
    copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        this.service.add({ severity: 'success', summary: 'Copy to Clipboard', detail: 'Address copied to clipboard successfully.' });
    }
}
