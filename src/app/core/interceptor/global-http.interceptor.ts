import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { HttpResponseDataEntity } from 'src/app/shared/entity/http-response-data.entity';
import { PageService } from '../service/page.service';
const CODEMESSAGE = {
    200: '操作成功.',
    400: '请求参数有误。',
    401: '未登录。',
    403: '权限不足。',
    404: '资源不存在。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

    constructor(private pageService: PageService) { }

    // 这里处理http请求状态码为200的响应，如果业务响应是操作成功的，若是获取数据直接将数据返回
    private handleResponseSuccessData(event: HttpResponse<{ code: number, data: any, message: string }>): Observable<any> {
        if (!(event instanceof HttpResponse)) {
            return of(event);
        }
        const body = event.body;
        if (HttpResponseDataEntity.success(body.code)) {
            return of(new HttpResponse(Object.assign(event, { body: body.data })));
        }
        return throwError(new HttpErrorResponse(Object.assign(event, { error: body, statusText: "这是自定义错误响应，用于处理错误的业务响应。" })));
    }

    private handleResponseError(event: HttpErrorResponse): Observable<any> {
        if (event.status === 200) {// 这里正常情况下是返回业务响应错误，这里的错误响应类由上面的函数自定义
            return throwError(Object.assign(new HttpResponseDataEntity(), event.error));
        }
        switch (event.status) {
            case 401: // 未登录状态码
                console.log("no login.")
                break;
            case 403:
            case 404:
            case 500:
                break;
            case 504:
                this.pageService.setActionErrorCode(event.status);
                break;
            default:
                if (event instanceof HttpErrorResponse) {
                    console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', event);
                }
                break;
        }
        return of(event);
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler):
    //     Observable<HttpEvent<any>> {
    //         console.log(":===================")
    //     return next.handle(req).pipe(
    //         tap(
    //             event => this.handleResponseSuccessData(event),
    //             error => this.handleResponseError(error)
    //         )
    //     );
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const header = new HttpHeaders({"Content-Type": "application/json" });
        // const secureReq = req.clone({
        //     headers: header
        //   });
        return next.handle(req).pipe(mergeMap((event: any) => this.handleResponseSuccessData(event)),
            catchError((err: HttpErrorResponse) => this.handleResponseError(err)));
    }

}