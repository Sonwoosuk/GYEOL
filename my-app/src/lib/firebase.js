import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 환경변수에 BOM(U+FEFF)이나 공백이 섞이면 auth/network-request-failed가 발생하므로 제거
const clean = (value) => (value || '').replace(/﻿/g, '').trim()

const firebaseConfig = {
  apiKey: clean(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: clean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: clean(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: clean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: clean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: clean(import.meta.env.VITE_FIREBASE_APP_ID)
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)
export const firebaseApp = isFirebaseConfigured ? initializeApp(firebaseConfig) : null
export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null
export const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : null
export const googleProvider = firebaseApp ? new GoogleAuthProvider() : null
