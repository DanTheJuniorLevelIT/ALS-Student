import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');

  //Check if token is not present
  if(!token) {
    const router = new Router(); //Or inject router via the provider
    router.navigate(['/login']); //Redirect to the login page if token is not found
    return false;
  }

  return true;  
};
