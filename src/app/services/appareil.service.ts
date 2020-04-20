import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppareilService {

  appareilsSubject = new Subject<any[]>();

  private appareils = [
    {
	  id: 1,
      name: 'Machine à laver',
      status: 'éteint'
	  
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'

    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'

    }
  ]

  // Méthode qui, quand le service reçoit de nouvelles données, va faire émettre ces données par le Subject 
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }
  
  // On appelle cette méthode dans chacune des méthodes qui suivent, car elles modifient l'array des appareils :
  switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé';
      this.emitAppareilSubject();
    }
  }

  switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'éteint';
      this.emitAppareilSubject();
  }}
  
  switchOnOne(i:number)
  {
    this.appareils[i].status='allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i:number)
  {
    this.appareils[i].status='éteint';
    this.emitAppareilSubject();
  }
  

  
  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
}

}