import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { expand, takeWhile, mergeMap, take, combineAll } from 'rxjs/operators';
import * as faker from 'faker'; // optional
import 'rxjs/add/operator/mergeMap';
import { MyCompanyModel } from './mycompanymodel';

@Injectable()
export class MyCompanyServices {
    private mycompanylink = 'mycompany';
    private singleRef = this.afs.collection(this.mycompanylink).doc('super');

    constructor(private afs: AngularFirestore) { }

    getOne() {
        this.singleRef.ref.get().then(doc => {
            if (!doc.exists) {
                this.generateOne();
                this.getOne();
            }
        });
        return this.afs.collection('mycompany', ref => ref.where('permission', '==', 'superadmin')
            .limit(1)).valueChanges().flatMap(result => result);
    }

    addOne(data: MyCompanyModel) {
        if (data) {
            this.singleRef.set(data);
        }
    }
    generateOne() {
        const company: MyCompanyModel = {
            id: 'super',
            imgpath: 'https://anewtech.files.wordpress.com/2014/11/anewtech-systems-logo.jpg?w=848',
            permission: 'superadmin',
            name: 'Anewtech Systems Pte Ltd',
            desc: 'Leading IPC Supplier and Solutions Provider',
            remark: `We are well established company in South East Asia providing world class services
            and solutions to manufacturing and medical industry
            with clear objectives and success stories to follow.`,
            address: `62 Ubi Road 1, #04-14
            Oxley Bizhub 2,
            Singapore 408734`,
            tel: '+6562920801',
            fax: '+656292 0831',
            cemail: 'support0414@anewtech.com.sg',
            homelink: 'http://www.anewtech.net/',
            fblink: 'https://www.facebook.com/anewtech.net/',
            googlelink: 'https://www.google.com/search?q=anewtech+systems',
        };
        this.singleRef.set(company);
    }
    updateOne(data: MyCompanyModel) {
        if (data) {
            this.singleRef.update({
                id: 'super',
                imgpath: data.imgpath,
                permission: data.permission,
                name: data.name,
                desc: data.desc,
                remark: data.remark,
                address: data.address,
                tel: data.tel,
                fax: data.fax,
                cemail: data.cemail,
                homelink: data.homelink,
                fblink: data.fblink,
                googlelink: data.googlelink,
            });
        }
    }
}
