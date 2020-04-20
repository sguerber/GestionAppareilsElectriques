import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  defaultOnOff = 'éteint';

  constructor( private appareilService : AppareilService, private router : Router ) { }

  ngOnInit(): void {
  }

  // Méthode appelée à la validation/l'envoi du formulaire pris en paramètre
  onSubmit(form: NgForm) {
    // On récupère les infos dans des constantes 
    const name = form.value['name'];
    const status = form.value['status'];
    // On appelle la méthode d'jout d'un appareil de AppareilService en mettant ces constantes en paramètres
    this.appareilService.addAppareil(name, status);
    // On redirige sur la page des appareils pour visualiser la nouvelle liste de nos appareils
    this.router.navigate(['/appareils']);
  }

}
