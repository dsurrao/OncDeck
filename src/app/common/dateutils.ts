import { Injectable } from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class DateUtils {
    /**
     * yyyymmddToISOString
     * takes a string with format yyyy-mm-dd and converts it into an ISO string
     */
    public yyyymmddToISOString(yyyymmdd: string): string {
        let isoString: string = null;
        if (yyyymmdd != '' && yyyymmdd != null) {
            let inputValidationRegEx: RegExp = new RegExp('^(\\d{4})[-](\\d{2})[-](\\d{2})$');
            let res = inputValidationRegEx.exec(yyyymmdd);
            console.log(res);
            if (res != null) {
                if (res.length == 4) {
                    let year: number = parseInt(res[1]);
                    let month: number = parseInt(res[2].replace(new RegExp('^[0]'), ''));
                    let day: number = parseInt(res[3].replace(new RegExp('^[0]'), ''));
                    isoString = new Date(year, month - 1, day).toISOString();
                }
            }
        }        
        return isoString;
    }

    public isoStringToYyyymmdd(isoString: string): string {
        let yyyymmdd = null;
        if (isoString != '' && isoString != null) {
            let inputDate: Date = new Date(isoString);
            let yyyy: string = String(inputDate.getFullYear());
            let mm: string = (inputDate.getMonth() + 1) < 10 ? "0" + String(inputDate.getMonth() + 1) : 
                String(inputDate.getMonth() + 1);
            let dd: string = inputDate.getDate() < 10 ? "0" + String(inputDate.getDate()) : 
                String(inputDate.getDate());
            yyyymmdd = yyyy + '-' + mm + '-' + dd;
        }
        return yyyymmdd;
    }

    public daysFromToday(isoDate: string): number {
        let days: number = 0;
        let inputDate: Date = new Date(isoDate);
        let todayDate: Date = new Date();
        inputDate.setHours(0);
        inputDate.setMinutes(0);
        inputDate.setSeconds(0);
        inputDate.setMilliseconds(0);
        todayDate.setHours(0);
        todayDate.setMinutes(0);
        todayDate.setSeconds(0);
        todayDate.setMilliseconds(0);
        days = (inputDate.getTime() - todayDate.getTime())/(1000 * 60 * 60 * 24);
        return days;
    }

    public addDays(isoDate: string, days: number): string {
        let outputDate: Date = this.addDaysToDateObj(new Date(isoDate), days);
        return outputDate.toISOString();
    }

    public addDaysToDateObj(date: Date, days: number): Date {
        let outputDate: Date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        outputDate.setTime(date.getTime() + (1000 * 60 * 60 * 24 * days));
        return outputDate;
    }

    public addDaysWithWeekendsAndHolidays(isoDate: string, days: number): string {
        let endDate: Date = new Date(isoDate);
        while(days > 0) {
            endDate = this.addDaysToDateObj(endDate, 1);
            if (!this.isHoliday(endDate) && !this.isWeekend(endDate)) {
                days--;
            }            
        }
        return endDate.toISOString();
    }

    public getAge(isoDob: string): number {
        let dob: Date = new Date(isoDob);
        let today: Date = new Date();
        let yrs: number = today.getFullYear() - dob.getFullYear();
        let monthDiff: number = today.getMonth() - dob.getMonth();
        let dayDiff: number = today.getDate() - dob.getDate();
        if (monthDiff == 0) {
            if (dayDiff < 0) {
                yrs--;
            }
        }
        else if (monthDiff < 0) {
            yrs--;
        }
        return yrs;
    }

    public toLocaleDateString(isoString: string): string {
        return new Date(isoString).toLocaleDateString();
    }

    public generateUniqueId(): string {
        return (new Date().toJSON() + Math.random());
    }

    public isWeekend(date: Date): boolean {
        let ret: boolean = false;
        if (date.getDay() == 0 || date.getDay() == 6) {
            ret = true;
        }
        return ret;
    }

    public isHoliday(date: Date): boolean {
        let ret: boolean = false;
        if (environment.holidays !== undefined) {
            for (let i = 0; i < environment.holidays.length; i++) {
                let holidayFullDate = new Date(environment.holidays[i] + ' ' + date.getFullYear());
                if (holidayFullDate.getDate() == date.getDate() 
                    && holidayFullDate.getMonth() == date.getMonth()) {
                    ret = true;
                    break;
                }
            }
        }
        return ret;
    }
}