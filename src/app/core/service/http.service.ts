import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { ObjectUtil } from 'src/app/shared/util/object.util';
import { HttpResponseDataEntity } from 'src/app/shared/entity/http-response-data.entity';
import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpEmergencyService } from './http-emergency.service';

@Injectable({ providedIn: CoreModule })
export class HttpService {

    // angualr default 'application/json', but custom postJson function use 'text/plain'
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
            // ,'API-Request-Access': 'true' 
        })
    };

    constructor(private httpClient: HttpClient) {
    }

    public get<T>(emergency: HttpEmergencyService, url: string): Observable<T> {
        return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError(emergency)));
    }

    /**
    * 
    * @param url 
    * @param obj 
    * @param type 通过泛型创建对象，在函数传参才有用。 let type: { new(): UserInfoEntity; }; 这样使用是错误的
    */
    public post<T>(emergency: HttpEmergencyService, url: string, obj: any, type?: { new(): T; }): Observable<T> {
        return this.httpClient.post<any>(url, ObjectUtil.propertyTrim(obj), this.httpOptions).pipe(
            map(res => {
                return type ? Object.assign(new type(), res) : res;
            }),
            catchError(this.handleError(emergency))
        );
    }


    // public postReportProgress<T>(emergency: HttpEmergencyService, url: string, obj: any): Observable<T> {
    //     const options = {
    //         headers: this.httpOptions.headers,
    //         reportProgress: true
    //     };
    //     return this.httpClient.post<any>(url, ObjectUtil.propertyTrim(obj), options).pipe(catchError(this.handleError(emergency))
    //     );
    // }

    /**
     * 用户上传文件返回上传进度，上图图片不能设置header，使用默认
     * @param emergency 
     * @param url 
     * @param obj 
     */
    public putReportProgress<T>(emergency: HttpEmergencyService, url: string, obj: any): Observable<T> {
        const options = {
            reportProgress: true,
            withCredentials: true
        };
        return this.httpClient.put<any>(url, ObjectUtil.propertyTrim(obj), options).pipe(catchError(this.handleError(emergency))
        );
    }

    // default Content-Type: text/plain
    public postJson<T>(emergency: HttpEmergencyService, url: string, json: string): Observable<T> {
        return this.httpClient.post<any>(url, json, this.httpOptions).pipe(
            catchError(this.handleError(emergency))
        );
    }

    public put<T>(emergency: HttpEmergencyService, url: string, obj?: object): Observable<T> {
        if (obj == null) {
            return this.httpClient.put<any>(escape(url), this.httpOptions).pipe(
                catchError(this.handleError(emergency))
            );
        }
        return this.httpClient.put<any>(escape(url), obj, this.httpOptions).pipe(
            catchError(this.handleError(emergency))
        );
    }

    public putJson<T>(emergency: HttpEmergencyService, url: string, json: string): Observable<T> {
        return this.httpClient.put<any>(escape(url), json, this.httpOptions).pipe(
            catchError(this.handleError(emergency))
        );
    }

    public delete(emergency: HttpEmergencyService, url: string): Observable<string> {
        return this.httpClient.delete<string>(escape(url), this.httpOptions).pipe(
            catchError(this.handleError(emergency))
        );
    }

    public handleError(emergency?: HttpEmergencyService, result?: HttpResponseDataEntity) {

        return (data: HttpResponseDataEntity): Observable<string> => {
            if (emergency) {
                if (data.noLogin()) {
                    emergency.noLogin();
                    return of();
                }
                if (data.noPermissions()) {
                    emergency.noPermission();
                    return of();
                }
            }
            if (data.fail() || data.invalidArgument()) {
                return throwError(data.getMessage());
            }
            return throwError("请求错误：" + data.getMessage());
        };
    }
}