import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class GeocoderService {

  private geocoder: any;
  private latLng:any;


  constructor(private http:HttpClient, private mapLoader: MapsAPILoader) {}

  getRoutes(radio:number,lat:number,lng:number){
    const url = `http://iroutes.azurewebsites.net/api/Ruta?radio=${radio}&lat=${lat}&lng=${lng}`;
    return this.http.get(url);
  }
  initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }
  geocoderAddress(location:string){
      let latLng;
      this.geocoder.geocode({'address':location},(results, status)=>{
        if(status == google.maps.GeocoderStatus.OK){

           latLng = {
            lat: results[0].geometry.location.lat(), 
            lng: results[0].geometry.location.lng()
          }
        }
        return latLng;

      });


   }

   getUserLocation(){

    let coords;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( async pos=>{

        coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        console.log(coords);
        return coords;
      });
    }
  }
}
