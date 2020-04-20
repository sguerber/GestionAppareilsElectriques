import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// on importe la méthode interval () qui crée un Observable et retourne un chiffre croissant à intervalles réguliers
// le paramètre de cette méthode est le nombre de millisecondes définissant l'intervalle
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  secondes: number;
  counterSubscription: Subscription;

  constructor() {
  }
  
  ngOnInit() {
    // Création de l'Observable
    const counter = Observable.interval(1000);
    // Souscription à l'Observable (1 à 3 fonction(s) anonymes: 
    // dans le cas d'un retour de valeur, erreur ou message complete de la part de l'Observable)
    // On stocke la souscription dans une variable de type Subscription (c'est notre Observer)
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  } 

  // Méthode appelée quand le component est détruit
  ngOnDestroy() {
    // Destruction de la souscription et empêche les comportements inattendus liés aux Observables infinis
    this.counterSubscription.unsubscribe();
  }
  
}