import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './HomePage/HomePage'
import MailingListPage from "./MailingListPage/MailingListPage";
import './App.css'

export default function App() {
  if (window.location.pathname === "/mailing-list") {
    return <MailingListPage />;
  }

  return <HomePage />;
}