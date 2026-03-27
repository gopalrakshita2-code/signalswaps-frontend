import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FileDemo } from './filedemo';
import { FormLayoutDemo } from './formlayoutdemo';
import { InputDemo } from './inputdemo';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { MessagesDemo } from './messagesdemo';
import { MiscDemo } from './miscdemo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';
import { OverlayDemo } from './overlaydemo';
import { TreeDemo } from './treedemo';
import { MenuDemo } from './menudemo';
import { AiTradeHistory } from './ai-trade-history/ai-trade-history';
import { DepositHistory } from './deposit-history/deposit-history';
import { WithdrawalHistory } from './withdrawal-history/withdrawal-history';

export default [
    { path: 'deposit', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'deposit-history', data: { breadcrumb: 'Button' }, component: DepositHistory },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemo },
    { path: 'withdrawal-history', data: { breadcrumb: 'Withdrawal History' }, component: WithdrawalHistory },
    { path: 'file', data: { breadcrumb: 'File' }, component: FileDemo },
    { path: 'market', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDemo },
    { path: 'support', data: { breadcrumb: 'Input' }, component: InputDemo },
    { path: 'ai-trading', data: { breadcrumb: 'List' }, component: ListDemo },
    { path: 'ai-trade-history', data: { breadcrumb: 'AI Trade History' }, component: AiTradeHistory },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemo },
    { path: 'message', data: { breadcrumb: 'Message' }, component: MessagesDemo },
    { path: 'misc', data: { breadcrumb: 'Misc' }, component: MiscDemo },
    { path: 'spot-trade', data: { breadcrumb: 'Panel' }, component: PanelsDemo },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemo },
    { path: 'withdraw', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: 'trade-history', data: { breadcrumb: 'Overlay' }, component: OverlayDemo },
    { path: 'events', data: { breadcrumb: 'Tree' }, component: TreeDemo },
    { path: 'loan', data: { breadcrumb: 'Menu' }, component: MenuDemo },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
