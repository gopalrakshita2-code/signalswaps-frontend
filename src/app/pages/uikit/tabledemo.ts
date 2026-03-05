import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { Router } from '@angular/router';
import { DashboardData } from '../service/dashboard-data';

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        DialogModule,
        FluidModule
    ],
    templateUrl: 'tabledemo.html',
    providers: []
})
export class TableDemo implements OnInit {
    withdrawAmount: number | string = '';
    walletAddress: string = '';
    showSuccessDialog: boolean = false;
    showLimitDialog: boolean = false;
    withdrawalErrorDetails: string = '';

    constructor(
        private router: Router,
        private dashboardData: DashboardData
    ) { }

    ngOnInit() {

    }

    withdrawMoney() {
        // Get user email
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user || '{}');
        const userEmail = userData.data?.user?.email;
        const payload = {
            // Add any additional fields needed for the withdrawal payload
            email: userEmail,
            withdrawAmount: this.withdrawAmount,
            walletAddress: this.walletAddress
        };
        console.log('Withdrawal Payload:', payload);[]
        if (this.isFormValid) {
            this.dashboardData.withdrawFunds(payload).subscribe({
                next: (res) => {
                    console.log("Withdraw Funds:", res);
                    this.resetForm();
                    this.showSuccessDialog = true;

                },
                error: (err) => {
                    this.resetForm();
                    this.withdrawalErrorDetails = err.error.message || `Today's loan application limit has been reached. Please try again tomorrow.`;
                    this.showLimitDialog = true;
                    console.log(err.error.message);

                }
            });
        }
    }

    onDialogOk() {
        // Close dialog and redirect to dashboard
        this.showSuccessDialog = false;
        this.router.navigate(['/app/dashboard']);
    }

    get isFormValid(): boolean {
        // Check if amount has a value and is a valid positive number
        const amountValue = this.withdrawAmount;
        const amountNum = Number(amountValue);
        const hasValidAmount = amountValue !== '' &&
            amountValue !== null &&
            amountValue !== undefined &&
            !isNaN(amountNum) &&
            amountNum > 0 &&
            amountNum < 10000000;

        // Check if wallet address has a value (ensure boolean return)
        const hasValidAddress = Boolean(this.walletAddress && this.walletAddress.trim() !== '');

        // Both must be valid
        return hasValidAmount && hasValidAddress;
    }

    resetForm() {
        this.walletAddress = '';
        this.withdrawAmount = '';
    }
    dismissLoanPopups() {
        this.showSuccessDialog = false;
        this.showLimitDialog = false;
        this.withdrawalErrorDetails = '';
        this.resetForm();
    }

    onMoveToSupport() {
        this.dismissLoanPopups();
        this.router.navigate(['/app/page/support']);
    }

    closeDialog() {
        this.dismissLoanPopups();
    }

}