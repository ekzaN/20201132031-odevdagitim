import { Uye } from './../../models/uye';
import { Sonuc } from './../../models/sonuc';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  sonuc: Sonuc = new Sonuc();
  secUye: Uye = new Uye();
  seckayit:Kayit=new Kayit();
  
  constructor(
    public fbservis:FbServisService,
    public router:Router
  ) { }

  ngOnInit() {
  }
KayitYap(){
  this.fbservis.UyeOl(this.secUye).then(d=>{
    d.user.updateProfile({
      displayName:this.secUye.adsoyad
    });
    this.secUye.uid=d.user.uid;
    localStorage.setItem("user", JSON.stringify(d.user));
    this.UyeEkle();
  }),err=> {
    this.sonuc.islem=false;
    this.sonuc.mesaj = "Hata Oluştu! Tekrar Deneyiniz..."
  }};
  UyeEkle(){
    this.fbservis.UyeEkle(this.secUye).then(d=>{
      this.router.navigate(['/'])
    });
  }
}

