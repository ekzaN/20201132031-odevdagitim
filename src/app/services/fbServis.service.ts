import { Uye } from './../models/uye';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Kayit } from '../models/kayit';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class FbServisService {
  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  
  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
  
  constructor(
    
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  
  )
  
  {
  
  this.kayitRef = db.list(this.dbKayit);
  this.uyeRef = db.list(this.dbUye);
  
  }
  OturumAc(mail:string,parola:string){
    return this.afAuth.signInWithEmailAndPassword(mail,parola);
  }

  OturumKapat(){
    return this.afAuth.signOut();
  }

  KayitListele(){
    return this.kayitRef;
  }
  KayitEkle(k: Kayit){
    return this.kayitRef.push(k);
  }
  KayitDuzenle(k: Kayit){
    return this.kayitRef.update(k.key, k);
  }
  KayitSil(key:string){
    return this.kayitRef.remove(key);
  }
  UyeOl(uye:Uye){
    return this.afAuth.createUserWithEmailAndPassword(uye.mail,uye.parola);
  }
  UyeEkle(uye:Uye){
  return this.uyeRef.push(uye);
  }
  OturumKontrol(){
    if (localStorage.getItem("user")){
      return true;
    } else{
      return false;
    }
  }
}
