import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
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

  // On injecte HttpClient à notre service 
  constructor(private httpClient: HttpClient) { }

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

  // Méthode qui récupère les infos du formulaire et ajoute un appareil à appareils, puis màj les infos
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  // Méthode qui va enregistrer nos appareils dans la bdd au endpoint "/appareils" 
  // (envoi des données au backend)
  saveAppareilsToServer() {
    this.httpClient
      // on lance un appel post prenant comme premier argument l'url visée et comme deuxième argument le corps de l'appel, (ie: ce qu'on envoie à l'url)
      .put('https://angularocr-1ea0c.firebaseio.com/appareils.json', this.appareils)
      // l'extension .json de l'url est une spécificité de Firebase pour dire qu'on envoie des données au format json
      // la méthode post() retourne un Observable (elle ne fait pas d'appel à elle toute seule, c'est en y souscrivant qu'on lance l'appel)
      .subscribe(
        // Cas où tout fonctionne
        () => {
          console.log('Enregistrement terminé !');
        },
        // Cas où le serveur renvoit une erreur
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  // Méthode qui récupère nos appareils de la database 
  // (réception des données du backend)
  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://httpclient-demo.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}