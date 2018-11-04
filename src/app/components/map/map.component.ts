import { Component,Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { GeocoderService } from '../../services/geocoder.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  geocoder:any;
  address:string;

  public zoom = 16;
  public userLocation: any = {
    lat: 0,
    lng: 0
  };

  public destinyLocation: any = {
    lat: 0,
    lng: 0,
    status: false
  };

  public center: any = {
    lat: 0,
    lng: 0,
  };

  public routes:any = [];
  public routesNames:any[] =[];
  
  @ViewChild(AgmMap) map: AgmMap;
 
  constructor(private geocoderService: GeocoderService,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private mapsApiLoader: MapsAPILoader){
    
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
    this.geocoder = new google.maps.Geocoder();
    });
  
   }

   async ngOnInit() {

    await this.getUserLocation()
    // this.status = true;
  }
  
  searchRoutes(position:any){
    this.geocoderService.getRoutes(500,position.lat,position.lng)
    .toPromise().then((data:any)=>{
      // this.routes = data;
      // console.log(data);
      data.forEach(element => {
        this.routesNames.push(element["Nombre"]);
        this.routes.push(element);
      });

      return data;
    })
  }

  findDuplicated(arr:any[]){
    let n = 0;
    let duplicated = [];
    arr.sort();
    while (n < arr.length) {
      let item;
      item = arr[n+1] == arr[n] ? duplicated.push(arr.splice(n,1)) : n++;
    }

    return duplicated;
  }

  getCommonRoutes(){
   
    console.log(this.routesNames);

    let commonRoutes = [];
    let commonRoutesNames = this.findDuplicated(this.routesNames);
    commonRoutesNames.forEach(common => {
      for(let i = 0;i<this.routes.length;i++){
        if(this.routes[i]["Nombre"]==common){
          commonRoutes.push(this.routes[i]);
          break;
        }
      }  
    });

    console.log(commonRoutes);
    this.routesNames=[];
  }

  getUserLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        this.userLocation.lat = pos.coords.latitude;
        this.userLocation.lng = pos.coords.longitude;

        this.center = Object.assign({},this.userLocation);
        console.log("coordenada de origen: ");
        console.log(this.userLocation);
        this.searchRoutes(this.userLocation);
      })
    }
  }

  setDestinyLocation(address){
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()

    this.geocoder.geocode({
      'address': address + ' Medellín' 
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0].geometry.location) {
          this.destinyLocation.lat = results[0].geometry.location.lat();
          this.destinyLocation.lng = results[0].geometry.location.lng();
          this.destinyLocation.status = true;
          
          console.log("coordenada de Destino: ");
          console.log(this.destinyLocation);
          this.setMiddlePoint();
          this.searchRoutes(this.destinyLocation);
        }
        // this.map.triggerResize()
        this.zoom = 14;
      } else {
        alert("Intenta con otra dirección");
      }
    })
  }

  setMiddlePoint(){

    this.center.lat = (this.userLocation.lat + this.destinyLocation.lat)/2;
    this.center.lng = (this.userLocation.lng + this.destinyLocation.lng)/2;
  }

}
