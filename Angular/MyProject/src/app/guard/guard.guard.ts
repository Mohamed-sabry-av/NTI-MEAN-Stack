import { inject, Inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guardGuard: CanActivateFn = (route, state) => {

 
  const _authS = inject(AuthService);
  const _router = inject(Router);
  if(_authS.isAuthenticated()){
  return true;
  }
  else
  {
    _router.navigate(['/login']);
    return false;
  }
  }

