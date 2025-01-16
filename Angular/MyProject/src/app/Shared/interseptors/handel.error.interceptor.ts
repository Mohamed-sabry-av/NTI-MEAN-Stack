import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HandelErrorService } from "../../services/handel-error.service";

@Injectable()
export class HandelErrorIntercptor implements HttpInterceptor {
    handelErrorService = Inject(HandelErrorService);
    // constructor(private handelErrorService: HandelErrorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                this.handelErrorService.logErrorResponse(error);
                return throwError(() => error);
            })
        );
    }
}

