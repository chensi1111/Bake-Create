import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC-GevEgwAGp1WclK7I1dk9diJKFultZrY',
  authDomain: 'dessert-80fca.firebaseapp.com',
  projectId: 'dessert-80fca',
  storageBucket: 'dessert-80fca.appspot.com',
  messagingSenderId: '723341599737',
  appId: '1:723341599737:web:3afd6cc9ed513dfe5ad328',
  measurementId: 'G-GCY2197RKT'
}

export default defineNuxtPlugin((nuxtApp: any) => {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  nuxtApp.provide('firebaseApp', app)
  nuxtApp.provide('firebaseDb', db)
})
