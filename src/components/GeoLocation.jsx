import React, { useEffect, useState } from 'react'

 function GeoLocation() { 

    const [geo, setGeo] = useState("")
    const [plats, setPlats] = useState ({
        lat: "" ,lng: "", 
        loaded: false, });



     const onSucces = plats => {
        setPlats({
            loaded: true,
            coordinates: {
                lat: plats.coords.latitude,
                lng: plats.coords.longitude,
            },
            
        })

     fetch (`https://geocode.xyz/${plats.coords.latitude},${plats.coords.longitude}auth=757785921191286686676x117863?geoit=json`)
        .then(res => res.json())
        .then(data => setGeo(data.city))
        
      
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
      
    
    return (
        <div>
            <p>{geo}</p>
        </div>
    )
       
 
  
}

export default GeoLocation

