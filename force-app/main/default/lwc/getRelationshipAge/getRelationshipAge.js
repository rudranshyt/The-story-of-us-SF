import { LightningElement } from 'lwc';
import start_date from '@salesforce/label/c.Relationship_Start_Date';
import my_Photo from '@salesforce/resourceUrl/myPhoto';
import her_Photo from '@salesforce/resourceUrl/herPhoto';
import communityPath from '@salesforce/community/basePath';
import { NavigationMixin } from "lightning/navigation";

export default class GetRelationshipAge extends NavigationMixin(LightningElement)  {
    relationshipAge;
    startDate = start_date;
    numberOfYears;
    numberOfDays;
    numberOfMonths;
    myPhoto = my_Photo;
    herPhoto = her_Photo;


    connectedCallback() {
        this.calculateRelationshipAge();
    }

    calculateRelationshipAge() {
        const today = new Date();
        const start = new Date(this.startDate);
        
        const diffInMs = today - start;

        const msInDay = 1000 * 60 * 60 * 24;
        const msInMonth = msInDay * 30.44;
        const msInYear = msInDay * 365.25;

        const totalYears = diffInMs / msInYear;
        const totalMonths = diffInMs / msInMonth;
        const totalDays = diffInMs / msInDay;

        this.numberOfYears = totalYears < 1 ? totalYears.toFixed(2) : Math.floor(totalYears);
        this.numberOfMonths = totalMonths < 1 ? totalMonths.toFixed(1) : Math.floor(totalMonths);
        this.numberOfDays = totalDays < 1 ? totalDays.toFixed(1) : Math.floor(totalDays);

    }
    get myPhotoUrl() {
        return communityPath + this.myPhoto;
    }
    get herPhotoUrl() {
        return communityPath + this.herPhoto;
    }
}