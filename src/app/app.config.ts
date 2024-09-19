import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
<<<<<<< HEAD
import { tokenInterceptor } from './Interceptor/token.interceptor';
import { errorInterceptor } from './Interceptor/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideAnimationsAsync('noop'), 
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor]))
    // provideHttpClient(withFetch())
        ]
=======
import { tokenInterceptor } from './token.interceptor';
import { errorInterceptor } from './error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync('noop'), 
  provideHttpClient(
    withFetch(),
    withInterceptors([tokenInterceptor, errorInterceptor])
  )]
>>>>>>> c93a1612c3ad5f13bd828addf537a64585f3ddcc
};
    