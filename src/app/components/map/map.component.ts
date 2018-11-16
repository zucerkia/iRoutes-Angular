import { Component,Input, NgZone, OnInit,ViewChild, Output, EventEmitter } from '@angular/core';
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
  @Output() mapEmitEvent:EventEmitter<any> = new EventEmitter<any>();
  geocoder:any;
  address:string;

  public zoom = 16;
  public radius = 500;

  public origin: any = {
    location:{
      lat:0,
      lng:0
    },
    nearRoutes:[],
    routeNames:[]
  }

  public destiny: any = {
    location:{
      lat:0,
      lng:0,
      visibility:false
    },
    nearRoutes:[],
    routeNames:[]
  }

  public center: any = {
    lat: 0,
    lng: 0,
  };

  public commonRoutes:any = [];
 
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

  ngOnInit() {
    this.getUserLocation();
  }
  
  searchRoutes(item:any){
    this.geocoderService.getRoutes(this.radius,item.location.lat,item.location.lng)
    .subscribe((data:any)=>{
      data.forEach(element => {
       
        item.routeNames.push(element["Nombre"]);
        item.nearRoutes.push(element);
      });

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
   
    // this.setDestinyLocation(this.address);

    console.log(this.origin.routeNames);
    console.log(this.destiny.routeNames);

    let commonRoutes = [];
    let names = this.origin.routeNames.concat(this.destiny.routeNames);
    let arrRoutes = this.origin.nearRoutes.concat(this.destiny.nearRoutes);

    let commonRoutesNames = this.findDuplicated(names);
    commonRoutesNames.forEach(common => {
      for(let i = 0;i<arrRoutes.length;i++){
        if(arrRoutes[i]["Nombre"]==common){
          commonRoutes.push(arrRoutes[i]);
          break;
        }
      }  
    });

    this.commonRoutes = commonRoutes;
    this.setRandomColor();
    if(commonRoutes.length==0){
      // alert("No se encontraron rutas que coincidan con los puntos");
    }
    console.log(commonRoutes);
    this.mapEmitEvent.emit(commonRoutes);
    this.destiny.routeNames=[];
    this.destiny.nearRoutes=[];
  }

  getRandomColor(){
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);

  }

  setRandomColor() {
   
    for (let index = 0; index < this.commonRoutes.length; index++) {
      this.commonRoutes[index].color = this.getRandomColor();
    }
  }

  getUserLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async pos=>{
        this.origin.location.lat = await pos.coords.latitude;
        this.origin.location.lng = await pos.coords.longitude;

        this.center = Object.assign({},this.origin.location);

        console.log("coordenada de origen: ");
        console.log(this.origin.location);
        this.searchRoutes(this.origin);
      })
    }
  }

  setDestinyLocation(address){
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()

    // let tempStr = {'address': address + ' Medellín'};
    
    // this.geocoder.geocode( tempStr ).subscribe(
    //   result => console.log( "-> RESULT ", result),
    //   error => console.log("something weird is happening here")
    // )

    this.geocoder.geocode({
      'address': address + ' Medellín' 
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0].geometry.location) {
          this.destiny.location.lat = results[0].geometry.location.lat();
          this.destiny.location.lng = results[0].geometry.location.lng();
          this.destiny.location.status = true;
          
          console.log("coordenada de Destino: ");
          console.log(this.destiny.location);

          this.searchRoutes(this.destiny);

          setTimeout(()=>{
            this.getCommonRoutes();
          },1000)
          this.setMiddlePoint();

        }
      } else {
        alert("Intenta con otra dirección");
      }
    })
  }

  setMiddlePoint(){
    this.zoom = 18;
    this.center.lat = (this.origin.location.lat + this.destiny.location.lat)/2;
    this.center.lng = (this.origin.location.lng + this.destiny.location.lng)/2;
    this.zoom = 14;
    this.map.triggerResize();

  }

  // getRandomColor(){
  //   var color = Math.floor(0x1000000 * Math.random()).toString(16);
  //   return '#' + ('000000' + color).slice(-6);
  // }

}
