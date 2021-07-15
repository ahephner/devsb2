import { LightningElement, api, wire } from 'lwc';
import getContact from '@salesforce/apex/communityProvisionUser.getContact'; 
 import USER_OBJ from '@salesforce/schema/User';
// import FIRST_NAME from '@salesforce/schema/User.FirstName';
// import LAST_NAME from '@salesforce/schema/User.LastName';
// import EMAIL from '@salesforce/schema/User.Email';
// import USERNME from '@salesforce/schema/User.Username';
// import COMNICK from '@salesforce/schema/User.CommunityNickname';
// import TIME from '@salesforce/schema/User.TimeZoneSidKey';
// import LOCATION from '@salesforce/schema/User.LocaleSidKey';
// import EMAILENCODE from '@salesforce/schema/User.EmailEncodingKey'
// import ALIAS from '@salesforce/schema/User.Alias'
// import LANG from '@salesforce/schema/User.LanguageLocaleKey'
// import ACTIVE from '@salesforce/schema/User.IsActive'
// import PROFILEID from '@salesforce/schema/User.ProfileId';
export default class UserProvision extends LightningElement {
    @api contactId;
    @api userId;
    @api profileId
    @api profileName
    error
    contact; 
    userObj = USER_OBJ; 
    firstName 
    lastName
    email;
    company;
    username; 
    nickName;
    phone; 
    alias;

    //fields = [FIRST_NAME, LAST_NAME, EMAIL, USERNME, COMNICK, TIME, LOCATION, EMAILENCODE, ALIAS, LANG, ACTIVE]; 

    connectedCallback(){
        console.log('profileId and name');
        console.log(this.profileId + ' '+ this.profileName);
        console.log('recordId');
        console.log(this.contactId);
 
    }
    @wire(getContact, {id: '$contactId'})
        wiredContact({data, error}){
            if(data){
               this.contact = data
               //console.log(this.contact);
                 this.firstName = this.contact.FirstName;
                 this.lastName = this.contact.LastName;
                 this.email = this.contact.Email;
                 this.userName = this.contact.Email; 
                 this.company = this.contact.Company_Name__c;
                 this.phone = this.contact.Phone; 
                 this.alias = this.contact.FirstName.substring(0,1) + this.contact.LastName.substring(0,8);
                 this.nickName = this.firstName +" "+ this.lastName
                console.log(this.firstName)
               console.log(typeof this.contact.LastName)
            }else if(error){
                this.error = JSON.stringify(error);
                console.log(error); 
            }
    }  


}