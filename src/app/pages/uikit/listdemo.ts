import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../service/product.service';
import { DashboardData } from '../service/dashboard-data';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

interface AITradingData {
    period: string;
    amount: string;
    daily_roi: string;
}

const aitradingData: AITradingData[] = [
    { period: '5 Day AI Trade', amount: '2,000 - 10,000 USDT', daily_roi: '0.6%' },
    { period: '15 Day AI Trade', amount: '10,000 - 50,000 USDT', daily_roi: '0.9%' },
    { period: '30 Day AI Trade', amount: '50,000 - 100,000 USDT', daily_roi: '1.2%' },
    { period: '60 Day AI Trade', amount: '100,000 - 200,000 USDT', daily_roi: '1.5%' },
    { period: '120 Day AI Trade', amount: '200,000 - 500,000 USDT', daily_roi: '2.2%' },
]
@Component({
    selector: 'app-list-demo',
    standalone: true,
    imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule ,DialogModule,InputNumberModule],
    templateUrl: './listdemo.html',
    styles: `
        ::ng-deep {
            .p-orderlist-list-container {
                width: 100%;
            }
        }
    `,
    providers: [ProductService]
})
export class ListDemo {
    aitradingData: AITradingData[] = [];
      // Crypto coin images - you can replace these with actual image paths
      cryptoCoins = [
        { name: 'ETH', image: 'assets/demo/images/deposit/ETH.png' },
        { name: 'BTC', image: 'assets/demo/images/deposit/BTC.png' },
        { name: 'BNB', image: 'assets/demo/images/deposit/BNB.png' },
        { name: 'USDT', image: 'assets/demo/images/deposit/USDT.png' },
        { name: 'SOL', image: 'assets/demo/images/deposit/SOL.png' },
        { name: 'XRP', image: 'assets/demo/images/deposit/XRP.png' }
    ];

     selectedTradingPlanPopUpData: AITradingData | null = null;
    AIPlanPopUpVisible: boolean = false;
    UserAiTradeAmount: number | null = null;

    isStartAiTradingButton: boolean = true;
    amountError: boolean = false;
    amountErrorMessage: string = '';
    UserEmail: string = '';

    constructor(private router: Router, private dashboardData: DashboardData) { }

    ngOnInit() {
        this.aitradingData = aitradingData;
    }
     // Get number of images for each card: 1, 3, 4, 5, 6
     getImageCount(index: number): number {
        const counts = [1, 3, 4, 5, 6];
        return counts[index] || 1;
    }

    // Get images to display for a specific card
    getImagesForCard(index: number) {
        const count = this.getImageCount(index);
        return this.cryptoCoins.slice(0, count);
    }

    selectTradingPlan(data: any) {
        this.selectedTradingPlanPopUpData = data;
        this.AIPlanPopUpVisible = true;
        this.amountErrorMessage = '';
    }
    onTryAgain() {
        this.AIPlanPopUpVisible = false;
        this.UserAiTradeAmount = null;
        this.amountErrorMessage = '';
    }

    fetchUserBalance() {
        const localData = localStorage.getItem('user');
        const userData = JSON.parse(localData || '{}');
        const user = userData?.data?.user || null;
        const userBalance = user?.balance || 0;
        this.UserEmail = user?.email || '';
        return userBalance;
    }

    startAiTrade() {
        const userBalance = this.fetchUserBalance();
        if (this.UserAiTradeAmount && userBalance && this.UserAiTradeAmount <= userBalance) {
            this.amountError = false;
            this.amountErrorMessage = '';
            const currentBalance = userBalance - this.UserAiTradeAmount;
            const payload = {
                Duration: this.selectedTradingPlanPopUpData?.period,
                Amount: this.UserAiTradeAmount,
                OldBalance: userBalance,
                CurrentBalance: currentBalance,
                DailyROI: this.selectedTradingPlanPopUpData?.daily_roi,
                email: this.UserEmail
            }
            this.dashboardData.AIupdateUserBalance(payload)
        } else {
            this.amountError = true
            this.amountErrorMessage = 'Insufficient Balance to Start AI Trade. Please check your balance and try again.'
        }

        this.UserAiTradeAmount = null;


    }
    validateAmount(value: number | null) {
        if (value && value >= 2000) {
            this.isStartAiTradingButton = false;
        } else {
            this.isStartAiTradingButton = true;
        }
    }

}
