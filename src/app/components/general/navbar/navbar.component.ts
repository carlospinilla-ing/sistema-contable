import { Component } from '@angular/core';
import { faWallet, faClipboard, faGear } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  faWallet = faWallet;
  faClipboard = faClipboard;
  faGear = faGear;
  
}
