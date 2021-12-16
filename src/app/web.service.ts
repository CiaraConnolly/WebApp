import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    imagePath: any = [];
    image_list: any = [];
    filePath: any = [];
    posts_list: any = [];
    users_list: any = [];
    user: any = [];
    loggeduser: any = [];
    replies_list: any =[];
    reply: any;
    following: any = [];
    str: any;

    
    //Retrive All images - test
    RAI = "https://prod-10.eastus.logic.azure.com:443/workflows/3c4baba5d2e0486991b63e0f54e44836/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=r7vYI59v2SbN1oKq5jTl1rYag1LiHVTXi3nob5UrWKE";
    //Half of the link for image
    BLOB_ACCOUNT = "https://blobcom682.blob.core.windows.net";
    //Image Upload Api with second part of Image link stored
    IUPS = "https://prod-65.eastus.logic.azure.com:443/workflows/3b91c2d0f1c341d88c56870a09600916/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tVxHOGWXIveKfquWVhR97o4U4SapoA008MDsEVseEVc";
    // Retrieve All Posts Api
    RAP = "https://prod-58.eastus.logic.azure.com:443/workflows/07035e2da3a7456386e534061e062ea3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MGPe_1X3SSAEFrGnHpYCAE5IuHUfp74XLNCRXMAn-nE";
    // Retrive All Users Api
    RAU = "https://prod-54.eastus.logic.azure.com:443/workflows/0c092afa071a466ea83a7579aeeffd14/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1u9qQKYw2cRUJMPEJ-GMyu0ff_JZBWsl1Lk4DKcmq-I";
    //Part 1 to get one user api - Retrieve Individual User 1
    RIU1 = "https://prod-21.eastus.logic.azure.com/workflows/5cc2ff447b6346c8ae76b728d17bb17f/triggers/manual/paths/invoke/user/";
    //Part 2 to get one user api - Retrieve Individual User 2
    RIU2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=U2C0eZaDr1Nrt8T9jvyuZ02Z4QsD1PdtfgMHLw6Da8g";
    //Retrive All login details
    RLD1 = "https://prod-69.eastus.logic.azure.com/workflows/470d765f1d584c0ea0c7ed546d5e7568/triggers/manual/paths/invoke/login/";
    RLD2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lb9HnFvio8efYIaKJmntLn4iK8lJNuIeGpgc6jaZFv8";
    //Retrieve all replies For Individual post
    RARFIP1 = "https://prod-89.eastus.logic.azure.com/workflows/508aaf27a7b94980b4c319b63873122d/triggers/manual/paths/invoke/replies/";
    RARFIP2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xa9dCx-X5ORwDd66xIKLWQJbwYWefaf2VzTo1Ux5q5Q";
    //Retrieve all followers for the 1 user logged in
    RAFFIU1 = "https://prod-92.eastus.logic.azure.com/workflows/4c905e06e7be435c90b6b15d45628d7d/triggers/manual/paths/invoke/followers/";
    RAFFIU2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=usi5J0ZCzUovT048S9qUZ6eSbIP-s_kd25IhtkgSUgY";
    //follower feed retrieval
    RFP1 = "https://prod-43.eastus.logic.azure.com/workflows/d13ce02004c34b8582ba9e76721d6281/triggers/manual/paths/invoke/feed/"
    RFP2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RNUqazfbgxRTlmX83KJENo19p8FZDl0Gl8znb79vnJg";
    //retrieve 1 reply
    RIC1 = "https://prod-26.eastus.logic.azure.com/workflows/f27d577f2ae04518bf0a9ac6bd263d92/triggers/manual/paths/invoke/replies/";
    RIC2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KxRVnk8dhnVeLDzvE4cginbd990A8L29UktS78H5fMw";

 constructor(private http: HttpClient) {

 }

getImages() { 
    return this.http.get(this.RAI).subscribe((response: any) => {
        this.imagePath = this.BLOB_ACCOUNT;
        this.image_list = response;
        })
}

getPosts() { 
    return this.http.get(this.RAP).subscribe((response: any) => {
        this.imagePath = this.BLOB_ACCOUNT;
        this.posts_list = response;
        })
    }

getUsers() { 
    return this.http.get(this.RAU).subscribe((response: any) => {
        this.users_list = response;
        })
    }

getOneUser(id: any){
    return this.http.get(this.RIU1 + id + this.RIU2).subscribe((response: any) => {
        this.user= response;
})
}

getLoginDetails(userName: any, pass: any){
    return this.http.get(this.RLD1 + userName + "/" + pass + this.RLD2).subscribe((response: any) => {
        this.loggeduser= response;
        console.log(this.RLD1 + userName + "/" + pass + this.RLD2);
        console.log(this.loggeduser)
        sessionStorage.setItem('loginId',this.loggeduser[0].id);
        console.log(this.loggeduser[0].id)
})
}

getAllComments(id: any){
    return this.http.get(this.RARFIP1 + id + this.RARFIP2).subscribe((response: any) => {
        this.replies_list = response;
        console.log(response)
    })
}

getOneComment(id: any){
    return this.http.get(this.RIC1 + id + this.RIC2).subscribe((response: any) => {
        this.reply = response;
        console.log(response)
    })
}

getALLFollowers(){
    return this.http.get(this.RAFFIU1 + sessionStorage.getItem('loginId') + this.RAFFIU2).subscribe((response: any) => {
        //this.following = response;
        //console.log(response)
        this.following = response[0].followers
        //console.log(this.following)
        var test = this.following.split('+');
        //console.log(test)
        this.str = test.join('","');
        //console.log(this.str)
        this.getFollowerFeed()
})
}
getFollowerFeed(){
    console.log(this.str)
    return this.http.get(this.RFP1 + this.str + this.RFP2).subscribe((response: any) => {
        this.following = response;
        //console.log(response)
        //console.log(this.following)
        //var test = this.following.split('+');
        //console.log(response)
        //var str = test.join('","');
        //console.log(str)
})
}
}