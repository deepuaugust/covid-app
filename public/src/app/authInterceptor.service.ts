import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'
import { UserService } from './services/user.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    
    constructor(private injector: Injector) {}

    intercept(req, next) {
        var auth = this.injector.get(UserService)
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', auth.token)
        })
        return next.handle(authRequest)
    }
}