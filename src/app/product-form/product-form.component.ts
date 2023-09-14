import { Component, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, collectionData, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import {  getDoc , getDocs } from "firebase/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { where, query } from 'firebase/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';
interface Product {
  id?: string,
  name: string;
  price: number;
  img: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})


export class ProductFormComponent {
  id: string = ''
  productList: any[] = []
  productForm: any = {}
  //  constructor(public id: number, public name: string, public price: number) {}
  constructor(private fbs: Firestore) {
    this.getData()
    // this.getOneData("2nz7wm0XCRda8opWk3s7")
  }

  createData(f: any) {
    const collectionT = collection(this.fbs, 'product')
    addDoc(collectionT, f.value).then(result => console.log(result))
  }

  async getData() {
    const collectionT = collection(this.fbs, 'product')
    const q = query(collectionT);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const productItem = {
        id: doc.id,
        ...doc.data()
      }
      this.productList.push(productItem)
    });
  }

  async getOneData (id: any) {
    const collectionT = collection(this.fbs, 'product')
    const q = query(collectionT, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // this.productList.push()
      console.log(doc.data())
    });
  }
  updateData(f: any) {
    console.log(f.value)
    const docIstance = doc(this.fbs, 'product', this.id)
    const updateData = {
      name: f.value.name,
      price: f.value.price,
      img: f.value.img
    }

    updateDoc(docIstance, updateData).then(result => {
      console.log(result);
    })
  }

  async selectData(id: string) {
    this.id = id
    const docIstance = doc(this.fbs, 'product', id)
    const docSnap = await getDoc(docIstance);
    this.productForm = {
      ...docSnap.data()
    }
  }

  deleteData(id: string) {
    const docIstance = doc(this.fbs, 'product', id)
    deleteDoc(docIstance).then(result => {
      console.log("delete success");
    })

  }
}
