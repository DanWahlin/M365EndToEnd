import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CanActivateGuard } from './core/guards/can-activate.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'orders/:id', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'teams-config', loadChildren: () => import('./teams-config/teams-config.module').then(m => m.TeamsConfigModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/customers' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
