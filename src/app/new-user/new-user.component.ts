import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.initForm();
  }

  // On initialise le formulaire avec des valeurs par défaut
  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      drinkPreference: ['', Validators.required],
      hobbies: this.formBuilder.array([])
  });
}

  // Méthode appelée à la validation du formulaire
  onSubmitForm() 
  {
    // On récupère les infos du User à ajouter depuis le formulaire
    const formValue = this.userForm.value;
    // On crée un new User avec ces infos + les hobbies SI ajoutés par le User
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );
    // On l'ajoute à la liste des Users
    this.userService.addUser(newUser);
    // On affiche cette liste
    this.router.navigate(['/users']);
  }

  // Méthode pour avoir accès aux controls à l'intérieur de l'array
  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  // Méthode pour ajouter un FormControl au FormArray 'hobbies'
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }

}