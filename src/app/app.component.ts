import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isWeb: boolean;
  public load: boolean;
  public isLogin: boolean;

  constructor(
    private platform: Platform,
    private sqlite: SqliteService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.isWeb = false;
    this.load = false;
    this.initApp();
  }

  initApp(){

    this.platform.ready().then( async () => {

      // Comprobamos si estamos en web
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';

      // Iniciamos la base de datos
      this.sqlite.init();
      // Esperamos a que la base de datos este lista
      this.sqlite.dbReady.subscribe(load => {
        this.load = load;
        this.verifyLogin();

      })
    })

  }

  verifyLogin(){

      if(!this.loginService.isAuthenticated( )){
        this.router.navigate(['/login']);
      }else{
        this.router.navigate(['/configuracion']);
      }

  }
}
