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
    duration: number;
}

const aitradingData: AITradingData[] = [
    { period: '5 Days AI Trade', amount: '2,000 - 10,000 USDT', daily_roi: '0.6%', duration: 5 },
    { period: '15 Days AI Trade', amount: '10,000 - 50,000 USDT', daily_roi: '0.9%', duration: 15 },
    { period: '30 Days AI Trade', amount: '50,000 - 100,000 USDT', daily_roi: '1.2%', duration: 30 },
    { period: '60 Days AI Trade', amount: '100,000 - 200,000 USDT', daily_roi: '1.5%', duration: 60 },
    { period: '120 Days AI Trade', amount: '200,000 - 500,000 USDT', daily_roi: '2.2%', duration: 120 },
]
@Component({
    selector: 'app-list-demo',
    standalone: true,
    imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule, DialogModule, InputNumberModule],
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
    userAiEnteredAmount: number | null = null;

    isStartAiTradingButton: boolean = true;
    amountError: boolean = false;
    amountErrorMessage: string = '';
    UserEmail: string = '';

    showAITradeSuccessDialog: boolean = false;
    AITradeSuccessMessage: string = '';

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
        this.resetValues();
    }

    fetchUserUserData() {
        const localData = localStorage.getItem('user');
        const userData = JSON.parse(localData || '{}');
        const user = userData?.data?.user || null;
        const userBalance = user?.balance || 0;
        this.UserEmail = user?.email || '';
        return userBalance;
    }

    startAiTrade() {
        this.fetchUserUserData()
        const email = this.UserEmail;
        const enteredAmount = this.userAiEnteredAmount || 0;

        if (enteredAmount <= 0 || enteredAmount > 500000) {
            this.amountError = true;
            this.amountErrorMessage = 'Please enter a valid amount.';
            this.userAiEnteredAmount = null;
            return;
        }

        this.dashboardData.getUserData(email).subscribe((res: any) => {
            const userBalance = res.dashboardData.balance || 0;

            if (enteredAmount > userBalance) {
                this.amountError = true;
                this.amountErrorMessage = 'Insufficient Balance to Start AI Trade. Please check your balance and try again.';
                this.userAiEnteredAmount = null;
                return;
            }

            const plan = this.selectedTradingPlanPopUpData;
            const payload = {
                AiTradeDuration: plan?.period,
                userAiEnteredAmount: enteredAmount,
                userOldBalance: userBalance,
                afterAITradeUserBalance: userBalance - enteredAmount,
                dailyROI: plan?.daily_roi,
                userEmail: email,
                tradeDurationInDays: plan?.duration
            };

            this.dashboardData.AITradeDetailsUpdate(payload).subscribe((response: any) => {
                this.AIPlanPopUpVisible = false;
                this.AITradeSuccessMessage = response?.message || 'AI Trade Started Successfully';
                this.showAITradeSuccessDialog = true;
                this.resetValues();

                // Refresh so next trade uses latest balance
                this.dashboardData.getUserData(email).subscribe();
            }, (error: any) => {
                this.AITradeSuccessMessage = error?.message || 'Failed to Start AI Trade. Please try again.';
            });

            this.userAiEnteredAmount = null;
        }, () => {
            this.amountError = true;
            this.amountErrorMessage = 'Failed to fetch latest balance. Please try again.';
            this.userAiEnteredAmount = null;
        });
    }

    validateAmount(value: number | null) {
        const v = value ?? 0;
        this.isStartAiTradingButton = !(v >= 2000 && v <= 500000);
    }

    tryAgain() {
        this.showAITradeSuccessDialog = false;
        this.AITradeSuccessMessage = '';
        this.AIPlanPopUpVisible = true;
    }

    moveToDashboard() {
        this.showAITradeSuccessDialog = false;
        this.AITradeSuccessMessage = '';
        this.router.navigate(['/app/dashboard']);
    }
    resetValues() {
        this.userAiEnteredAmount = null;
        this.amountErrorMessage = "";
        this.amountError = false;
    }

}
