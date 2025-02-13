import { useEffect, useState } from 'react';
import { QRCodeCanvas } from "qrcode.react";

export default function App() {
    const [EtatBouton, SetEtatBouton] = useState("actif")
    const [Url, SetUrl] = useState("")
    const [QrCodeVisible, SetQrCodeDisabled] = useState(true)

    
    const EtatsBouton = {
      actif: { label: "Générer", color: "bg-blue-500 hover:bg-blue-600", disabled: false },
      chargement: { label: "Chargement...", color: "bg-gray-400 cursor-not-allowed", disabled: true },
      succes: { label: "Votre QR Code est généré !", color: "bg-green-500", disabled: false },
      affichage: { label: "Affichage du QR Code", color: "bg-green-500", disabled: true },
      erreur: { label: (<> Erreur, Veuillez réessayer  <i className='fa-solid fa-rotate-right'></i> </>), color: "bg-red-500", disabled: false },
      noturl: { label: (<> <i className='pr-2 fa-solid fa-rotate-right'></i>Erreur, aucune URL saisie </>), color: "bg-red-500", disabled: false },

    }
    //
    // useEffect(() => {
    // }, [Url])

    const ValidationUrl = (url) => {
      try {
        new URL(url);
        return true
      } catch (error) {
        return false
      }
    }

    const GenerationQrcode = (event) => {

      event.preventDefault()
      const UrlUser = event.target.urlchoisie.value

      if (EtatBouton === "erreur" || EtatBouton === "noturl") {
        SetEtatBouton("actif")
        return
      }

      if (!UrlUser && EtatBouton === "actif") {
        SetEtatBouton("noturl")
        return
      }
      else {
        ValidationUrl(UrlUser) ? ShowQrCode(UrlUser) : SetEtatBouton("erreur")
        return
      }
    }

    const ShowQrCode = (UrlUser) => {
      SetEtatBouton("succes")
      SetUrl(UrlUser)
      setTimeout( () => {
        SetEtatBouton("affichage")
        SetQrCodeDisabled()
      }, 500);

      return
    }

  return(
    <div className='flex justify-center items-center h-screen flex-col'>
      <form onSubmit={GenerationQrcode} className={EtatsBouton[EtatBouton].disabled ? "hidden" : ""}>
        <input onC name="urlchoisie" type="text" placeholder="Entrer une URL" className='border rounded-md px-4 py-3 bg-zinc-800 text-white' />
        <button type="submit" disabled={EtatsBouton[EtatBouton].disabled} className={`text-white border rounded-md px-4 py-3 ${EtatsBouton[EtatBouton].color}`}>
          {EtatsBouton[EtatBouton].label}
        </button>
      </form>

      <div className={`${QrCodeVisible ? "hidden" : ""} flex flex-col justify-center items-center`}>
        <h1 className='text-black font-bold text-2xl pr-4 pb-4'>QR Code :</h1>
        <QRCodeCanvas value={Url} />
        <p className='pt-4 text-black'>Lien du QR Code : {Url}</p>
      </div>

    </div>
  )
}