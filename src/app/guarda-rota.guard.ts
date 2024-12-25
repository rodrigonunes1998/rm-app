import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './login/auth.service';




export const guardaRotaGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  
  //Simulando que o usuario passou pelo login
  if(AuthService.getToken()){
    return true;
  }else {
   
    router.navigate(['/login']);
    return false;
  }
  
  
};
