<script>
import { computed, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useGeolocation } from '../../services/useGeolocation'
import { GOOGLE_MAPS_API_KEY } from '../../services/apiKey'
export default {
    props: {
        taskLocation: Object
    },
    name: 'mapPage',
    created() {
        if (performance.getEntriesByType('navigation')[0].type === 'reload') {
            sessionStorage.clear()
        }
        console.log(this.taskLocation)
    },
    setup(props) {
        const { coords } = useGeolocation()
        const currPos = {
            lat: props.taskLocation.location.value.lnglat.lat,
            lng: props.taskLocation.location.value.lnglat.lng,

        }
        const contentString = `
            <div id="content"> 
            <div id="siteNotice"> 
            </div> 
            <h2 id="firstHeading" class="firstHeading">${props.taskLocation.location.value.title}</h2> 
            <div id="bodyContent"> 
            <h3>
            ${props.taskLocation.task.cols[0].value}
            </3>
           <p></p>
            </div>
            </div>`



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
                center = JSON.parse(sessionStorage.getItem('center'))
                placeDet.value = JSON.parse(sessionStorage.getItem('placeDet'))
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
                center: center,
                zoom: 18
            })

            marker = new google.maps.Marker({
                map: map.value,
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: center,
                title: "Uluru (Ayers Rock)",
            })

            google.maps.event.addListener(marker, 'click', function () {
                console.log(marker)
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                })

            })

        })

        return {
            tasksLocation: null,
            mapDiv,
            resul_lat, resul_lng,
            placeDet
        }
    }

}
</script>

<template>
    <div class="map-location">
        <div class="map-location-title"> <span>Map</span> <a v-if="resul_lng != null" class="view-in"
                :href="`https://www.google.com/maps/search/${resul_lat},${resul_lng}`">
                View in Google Maps</a></div>
        <div class="m-6" ref="mapDiv" style="width: 100%; height: 400px" />

    </div>
</template>
<style>
h2#firstHeading {
    margin-bottom: 1rem;
}

.map-location {
    box-shadow: 0 4px 8px #0003;
}

</style>