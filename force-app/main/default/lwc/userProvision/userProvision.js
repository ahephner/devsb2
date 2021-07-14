import { LightningElement, api } from 'lwc';
import USER_OBJ from '@salesforce/schema/User';
import FIRST_NAME from '@salesforce/schema/User.FirstName';
import LAST_NAME from '@salesforce/schema/User.LastName';
import EMAIL from '@salesforce/schema/User.Email';
import USERNME from '@salesforce/schema/User.Username';
import COMNICK from '@salesforce/schema/User.CommunityNickname';
import TIME from '@salesforce/schema/User.TimeZoneSidKey';
import LOCATION from '@salesforce/schema/User.LocaleSidKey';
import EMAILENCODE from '@salesforce/schema/User.EmailEncodingKey'
import ALIAS from '@salesforce/schema/User.Alias'
import LANG from '@salesforce/schema/User.LanguageLocaleKey'
import ACTIVE from '@salesforce/schema/User.IsActive'
import PROFILEID from '@salesforce/schema/User.ProfileId';
export default class UserProvision extends LightningElement {
    @api contactId;
    @api userId;
    @api profileId
    @api profileName
    userObj = USER_OBJ; 
    firstName = 'LWC';
    lastName = 'Test'; 
    fields = [FIRST_NAME, LAST_NAME, EMAIL, USERNME, COMNICK, TIME, LOCATION, EMAILENCODE, ALIAS, LANG, ACTIVE]; 

    connectedCallback(){
        console.log('profileId and name');
        console.log(this.profileId + ' '+ this.profileName);
        console.log('recordId');
        console.log(this.contactId);
 
    }
     fieldInputs = [  
         {"fieldName": 'FirstName',"type":"string", "disabled":false,   "value":"", "id": "input_FirstName"},
         {"fieldName": 'LastName', "type":"string", "disabled":false,   "value":"", "id": "input_LastName"},
         {"fieldName": 'Email', "disabled":false,  "value":"", "id": "input_Email"},
         {"fieldName": 'Username', "type":"string", "value":"", "id": "input_Username"},
         {"fieldName": 'Phone', "type":"string", "disabled":false,  "value":"", "id": "input_Phone"},
         {"fieldName": 'CommunityNickname', "type":"string", "disabled":false, "value":"", "id": "input_CommunityNickname"},
         {"fieldName": 'TimeZoneSidKey', "type":"string", "disabled":false, "value":"", "id": "input_TimeZoneSidKey"},
         {"fieldName": 'LocaleSidKey', "type":"string", "disabled":false,  "value":"", "id": "input_LocaleSidKey"},
         {"fieldName": 'EmailEncodingKey', "type":"string", "disabled":false, "value":"", "id": "input_EmailEncodingKey"}, 
         {"fieldName": 'ProfilLanguageLocaleKeyId', "type":"string",  "disabled":false, "value":"", "id": "input_ProfilLanguageLocaleKeyId"},
         {"fieldName": 'Alias', "type":"string", "disabled":false, "value":"","id": "input_alias"},
         {"fieldName": 'LanguageLocaleKey', "type":"string", "disabled":false, "value":"", "id": "input_LanguageLocaleKey"},
         {"fieldName": 'ContactId', "disabled":false, "id": "input_ContactId"},
         {"fieldName": 'IsActive',"type":"checkbox", "disabled":false, "value":  true , "id": "input_isActive"}
    ];
}