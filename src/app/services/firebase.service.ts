import { Fireuser } from './../interface/fireuser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auten: AngularFireAuth, private database: AngularFirestore, private loading: LoadingController, private toastController :ToastController) { }

  //data = objeto , patch= coleccion, id=id
  createDoc(data:any, patch: string, id: string){
    const collection = this.database.collection(patch);
    return collection.doc(id).set(data);
  }

  getdoc<tipo>(patch: string, id: string){
    const collection = this.database.collection<tipo>(patch);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(patch: string, id: string){
    const collection = this.database.collection(patch);
    return collection.doc(id).delete();
  }

  getId(){
    return this.database.createId();
  }

  getCollection<tipo>(patch: string){
    const collection = this.database.collection<tipo>(patch);
    return collection.valueChanges();
  }
  

  async mensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      //position: 'top', 'middle', 'bottom'
    });

    await toast.present();
  }

  loadingAux: any;
  
  async cargarLoading(mensaje: string){
    this.loadingAux = await this.loading.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      //duration: 2000
    });

    await this.loadingAux.present();
  }

  async cerrarLoading() {
    await this.loadingAux.dismiss();
  }

  async login(correo: string, pass: string){
    const { user } = await this.auten.signInWithEmailAndPassword(correo, pass);
    return user;
  }

  async logout(){
    await this.auten.signOut()
    }

  async verificar(){
    return (await this.auten.currentUser).sendEmailVerification();
  }

  async registro(correo: string, pass: string){
    const { user } = await this.auten.createUserWithEmailAndPassword(correo, pass);
    await this.verificar();
    return user;
  }

  async recuperar(correo: string){
    return this.auten.sendPasswordResetEmail(correo);
  }

  async obtenerUsuario(){
    const aux: Fireuser = await this.auten.currentUser;
    return aux;
  }

  async obtenerEmail(){
    return (await this.auten.currentUser).email;
  }

  async loginGoogle(){
    return this.auten.signInWithPopup( new GoogleAuthProvider())
  }

  async loginGit(){
    return this.auten.signInWithPopup( new GithubAuthProvider())
  }

  async getUid(){
    const user = await this.auten.currentUser;
    if (user === null) {
      return null;
    } else{
      return user.uid;
    }
  }
}
