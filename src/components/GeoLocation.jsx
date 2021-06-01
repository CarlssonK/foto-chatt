import React, { useEffect, useState } from 'react'

function GeoLocation() {
    const [plats, setPlats] = useState ({
        loaded: true, 
        lat: "", lng: ""});


    const onSucces = plats => {
        setPlats({
            loaded: true,
            coordinates: {
                lat: plats.coords.latitude,
                lng: plats.coords.longitude,
            },
        })
        console.log(plats)
    }
    const onError = error => {
        setPlats({
            loaded: false,
            error, 
        });
    }



    useEffect( () => {
        if(!("Geolocation" in navigator)){
            onError({
                code:0,
                message: "Geolocation off"
            })
        }
      navigator.geolocation.getCurrentPosition(onSucces, onError);
    },[]);

    
  

    return plats; 
       
  
}

export default GeoLocation

