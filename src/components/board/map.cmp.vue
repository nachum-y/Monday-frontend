<script>
/* eslint-disable no-undef */
import { computed, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useGeolocation } from '../../services/useGeolocation'
import {GOOGLE_MAPS_API_KEY} from '../../services/apiKey'
export default {
    props: {
        taskLocation: Object
    },
    name: 'mapPage',
    //setup se inicia mucho antes
    created() {
        //saber la accion del navegador, reload, navigate, back_forward
        //console.log(performance.getEntriesByType('navigation')[0].type)
        if (performance.getEntriesByType('navigation')[0].type === 'reload') {
            sessionStorage.clear()
        }
    },
    setup(props) {
        const { coords } = useGeolocation()
        const currPos = {
            lat: props.taskLocation.location.value.lnglat.lat,
            lng: props.taskLocation.location.value.lnglat.lng,

        }
        // console.log(props.taskLocation)
        // console.log()
        const contentString =`
            <div id="content"> 
            <div id="siteNotice"> 
            </div> 
            <h1 id="firstHeading" class="firstHeading">${props.taskLocation.task.cols[0].value}</h1> 
            <div id="bodyContent"> 
            <p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " 
            "sandstone rock formation in the southern part of the " 
            "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " 
            "south west of the nearest large town, Alice Springs; 450&#160;km " 
            "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " 
            "features of the Uluru - Kata Tjuta National Park. Uluru is " 
            "sacred to the Pitjantjatjara and Yankunytjatjara, the " 
            "Aboriginal people of the area. It has many springs, waterholes, " 
            "rock caves and ancient paintings. Uluru is listed as a World " 
            "Heritage Site.</p>" 
            <p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' 
            "https://en.wikipedia.org/w/index.php?title=Uluru</a> " 
            "(last visited June 22, 2009).</p>" 
            "</div>" 
            "</div>"`






        /*
        //forma directa y sencilla
        const success =(position) => {
            console.log(position)
        }
        const error = (error) => {
            console.log(error)
        }
        navigator.geolocation.getCurrentPosition(success, error);
        */

        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY, libraries: ['places']
        })
        let mapDiv = ref(null)
        let map = ref(null)
        let marker = ref(null)

        let resul_lat = ref(null)
        let resul_lng = ref(null)

        let placeDet = ref({
            exterior: '',
            interior: '',
            calle: '',
            colonia: '',
            CP: '',
            localidad: '',
            municipio: '',
            estado: ''
        })


        //initMap

        loader.load().then(() => {
            let center

            if (sessionStorage.getItem('center')) {
                console.log('session')
                center = JSON.parse(sessionStorage.getItem('center'))
                placeDet.value = JSON.parse(sessionStorage.getItem('placeDet'))
                // document.getElementById('place-input').value = sessionStorage.getItem('placeInput')
                resul_lng.value = center.lng
                resul_lat.value = center.lat
            } else {
                center = currPos
                resul_lng.value = currPos.lng
                resul_lat.value = currPos.lat

            }
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            })
            map.value = new google.maps.Map(mapDiv.value, {
                //centrado en posicion actual
                center: center,
                zoom: 10
            })

            marker = new google.maps.Marker({
                map: map.value,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: center,
                title: "Uluru (Ayers Rock)",
            })

            google.maps.event.addListener(marker, 'click', function () {
                //alert(marker.getPosition())
                console.log(marker)
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                })
                // resul_lat.value = marker.getPosition().lat()
                // resul_lng.value = marker.getPosition().lng()
                // center = {
                //     lat: resul_lat.value,
                //     lng: resul_lng.value
                // }
                //guardar center por arrastre
                // sessionStorage.setItem('center', JSON.stringify(center))
            })

            //autocompletar
            // const placeInput = document.getElementById("place-input")
            // const options = {
            // componentRestrictions: { country: "mx" },
            // types: ['geocode']
            // }
            // const autocomplete = new google.maps.places.Autocomplete(placeInput, options)
            // google.maps.event.addListener(autocomplete, 'place_changed', function () {
            //     //obtener el lugar
            //     let place = autocomplete.getPlace()

            //     sessionStorage.setItem('placeInput', placeInput.value)

            //     center = place.geometry.location
            //     //guardar center por busqueda plces
            //     sessionStorage.setItem('center', JSON.stringify(center))
            //     //centrar el mapa en el lugar
            //     map.value.setCenter(center)
            //     //poner marcador en ese lugar
            //     marker.setPosition(center)

            //     sessionStorage.setItem('map', map.value)
            //     sessionStorage.setItem('marker', marker.value)


            //     resul_lat.value = center.lat()
            //     resul_lng.value = center.lng()

            //     //limpiar todo
            //     exterior.value = ''
            //     calle.value = ''
            //     colonia.value = ''
            //     CP.value = ''
            //     municipio.value = ''
            //     estado.value = ''

            //     placeDet.value = {
            //         exterior: '',
            //         interior: '',
            //         calle: '',
            //         colonia: '',
            //         CP: '',
            //         localidad: '',
            //         municipio: '',
            //         estado: '',
            //     }

            //     //guardar detalles
            //     let detalles = place.address_components
            //     for (let i = 0; i < detalles.length; i++) {
            //         var d = detalles[i]
            //         switch (d.types[0]) {
            //             case "street_number":
            //                 placeDet.value.exterior = d.long_name
            //                 //alert('numero exterior '+d.long_name)
            //                 break
            //             case "route":
            //                 placeDet.value.calle = d.long_name
            //                 //alert('numero exterior '+d.long_name)
            //                 break
            //             case "sublocality_level_1":
            //                 placeDet.value.colonia = d.long_name
            //                 //alert('la colonia es ' + d.long_name)
            //                 break
            //             case "postal_code":
            //                 placeDet.value.CP = d.long_name
            //                 //alert('la colonia es ' + d.long_name)
            //                 break
            //             case "locality":
            //                 placeDet.value.municipio = d.long_name
            //                 //alert('municipio es ' + d.long_name)
            //                 break
            //             case "administrative_area_level_1":
            //                 placeDet.value.estado = d.long_name
            //                 //alert('estado es ' + d.long_name)
            //                 break
            //             case 'country':
            //                 //alert('el pais es ' + d.long_name)
            //                 break
            //         }
            //     }
            //     sessionStorage.setItem('placeDet', JSON.stringify(placeDet.value))
            // })

        })

        return {
            tasksLocation: null,
            //mapa
            mapDiv,
            //coordenadas
            resul_lat, resul_lng,
            placeDet
        }
    }

}
</script>

<template>
    <div class="map-location">
        <div class="m-6" ref="mapDiv" style="width: 95%; height: 400px" />
        <a v-if="resul_lng != null" class="text-blue-600 no-underline hover:underline"
            :href="`https://www.google.com/maps/search/${resul_lat},${resul_lng}`">
            View in Google Maps</a>
    </div>
</template>
<style>
</style>

<!-- created() {
            this.tasksLocation = this.$store.getters.getAllTasksLocation
        }, -->