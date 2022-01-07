import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  kayitlar:any;
  seckayit:Kayit=new Kayit();
  sonuc: Sonuc=new Sonuc();
  ekleduzenle: boolean = false;
  detay: boolean = false;
  silme: boolean = false;
    constructor(
      public fbServis:FbServisService,
      public router:Router
    ) { }
  
    ngOnInit() {
      this.KayitListele();
    }
   KayitListele(){
    this.fbServis.KayitListele().snapshotChanges().pipe(
  
      map(changes =>    
      changes.map(c =>   
      ({ key: c.payload.key, ...c.payload.val() })    
      )
      
      )
      
      ).subscribe(data => {
      
      this.kayitlar = data;
      
      })
   }
  Kaydet(){
    var tarih=new Date();
    if (this.seckayit.key==null){
  this.seckayit.kayTarih=tarih.getTime().toString();
  this.seckayit.duzTarih=tarih.getTime().toString();
  this.seckayit.islem=false;
  this.fbServis.KayitEkle(this.seckayit).then(d=>{
    this.sonuc.islem=true;
    this.sonuc.mesaj="Kayıt Eklendi";
  });
    } else {
      this.seckayit.duzTarih=tarih.getTime().toString();
      this.seckayit.islem=false;
      this.fbServis.KayitDuzenle(this.seckayit).then(d=>{
        this.sonuc.islem=true;
        this.sonuc.mesaj="Kayıt Güncellendi";
      });
     }
   }
   KayitSec(k:Kayit){
     Object.assign(this.seckayit, k);
   }
   Sil(){
    this.fbServis.KayitSil(this.seckayit.key).then(d=>{
      this.sonuc.islem=true;
      this.sonuc.mesaj="Kayıt Silindi";
      this.silme=false;
    });
   }
   TamamlaIptal(k:Kayit,islem:boolean){
  var tarih = new Date();
  k.duzTarih=tarih.getTime().toString();
    k.islem=islem;
  this.fbServis.KayitDuzenle(this.seckayit).then(d=>{
    this.sonuc.islem=true;
    this.sonuc.mesaj="Kayıt Güncellendi";
  });
  }

  OturumuKapat(){
    this.fbServis.OturumKapat().then(()=>{
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }
   
}
  
