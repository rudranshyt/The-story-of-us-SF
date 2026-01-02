import { LightningElement } from 'lwc';
import start_date from '@salesforce/label/c.Relationship_Start_Date';
import my_Photo from '@salesforce/resourceUrl/myPhoto';
import her_Photo from '@salesforce/resourceUrl/herPhoto';
import communityPath from '@salesforce/community/basePath';
import { NavigationMixin } from "lightning/navigation";

export default class GetRelationshipAge extends NavigationMixin(LightningElement) {
    relationshipAge;
    startDate = start_date;
    cumulativeNumberOfYears;
    cumulativeNumberOfDays;
    cumulativeNumberOfMonths;
    standardNumberOfYears;
    standardNumberOfMonths;
    standardNumberOfDays;
    myPhoto = my_Photo;
    herPhoto = her_Photo;
    showLiveCounter = false;
    liveAgeCounter = '';
    timerId;



    connectedCallback() {
        this.calculateCumulativeRelationshipAge();
        this.calculateStandardRelationshipAge();
        this.liveAgeCalculator();

    }
    disconnectedCallback() {
        clearInterval(this.timerId);
    }

    calculateStandardRelationshipAge() {
        const today = new Date();
        const start = new Date(this.startDate);

        let y = today.getFullYear() - start.getFullYear();
        let m = today.getMonth() - start.getMonth();
        let d = today.getDate() - start.getDate();

        if (d < 0) {
            m -= 1;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            d += lastMonth.getDate();
        }
        if (m < 0) {
            y -= 1;
            m += 12;
        }

        this.standardNumberOfDays = d;
        this.standardNumberOfMonths = m;
        this.standardNumberOfYears = y

        console.log('days-->', this.standardNumberOfDays);
        console.log('months---->', this.standardNumberOfMonths);
        console.log('yearss--->', this.standardNumberOfYears);
    }

    calculateCumulativeRelationshipAge() {
        const today = new Date();
        const start = new Date(this.startDate);

        const diffInMs = today - start;

        const msInDay = 1000 * 60 * 60 * 24;
        const daysInYear = 365;
        const daysInMonth = 30;

        const totalDays = diffInMs / msInDay;
        const totalMonths = totalDays / daysInMonth;
        const totalYears = totalDays / daysInYear;



        this.cumulativeNumberOfYears = totalYears < 1 ? totalYears.toFixed(2) : Math.floor(totalYears);
        this.cumulativeNumberOfMonths = totalMonths < 1 ? totalMonths.toFixed(1) : Math.floor(totalMonths);
        this.cumulativeNumberOfDays = totalDays < 1 ? totalDays.toFixed(1) : Math.floor(totalDays);

        console.log('cumulative days---->', this.cumulativeNumberOfDays);
        console.log('cumulative months---->', this.cumulativeNumberOfMonths);

    }

    liveAgeCalculator() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        const start = new Date(this.startDate).getTime();
        const msInSecond = 1000;
        const msInMinute = msInSecond * 60;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;

        const daysInMonth = 30;
        const daysInYear = 365;

        this.timerId = setInterval(() => {
            let diffMs = Date.now() - start;

            const years = Math.floor(diffMs / (msInDay * daysInYear));
            diffMs -= years * msInDay * daysInYear;

            const months = Math.floor(diffMs / (msInDay * daysInMonth));
            diffMs -= months * msInDay * daysInMonth;

            const days = Math.floor(diffMs / msInDay);
            diffMs -= days * msInDay;

            const hours = Math.floor(diffMs / msInHour);
            diffMs -= hours * msInHour;

            const minutes = Math.floor(diffMs / msInMinute);
            diffMs -= minutes * msInMinute;

            const seconds = Math.floor(diffMs / msInSecond);

            this.liveAgeCounter =
                `${years} years, ` +
                `${months} months, ` +
                `${days} days, ` +
                `${hours} hours, ` +
                `${minutes} minutes, ` +
                `${seconds} seconds`;
            //console.log('live age---->', this.liveAgeCounter);
        }, 1000);


    }

    liveCounter() {
        this.showLiveCounter = !this.showLiveCounter;
    }
    get myPhotoUrl() {
        return communityPath + this.myPhoto;
    }
    get herPhotoUrl() {
        return communityPath + this.herPhoto;
    }
}