import { LightningElement,wire,track,api } from 'lwc';
import Name from '@salesforce/schema/User.Name';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import { NavigationMixin } from "lightning/navigation";

export default class HomePage extends NavigationMixin(LightningElement)  {
    userName = Name;

    @wire(getRecord, { recordId: Id, fields: [Name] })
    wiredUser({ error, data }) {
        if (error) {
            console.error('Error retrieving user data:', error);
        } else if (data) {
            this.userName = data.fields.Name.value;
        }
    }

    redirectToRelationshipAge() {
        const pageReference = {
            type: "standard__webPage",
            attributes: {
                url: "/relationshipage"
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }
}