/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from './global-http.interceptor';

/** Http interceptor providers in outside-in order */
export const GLOBAL_HTTP_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true },
];