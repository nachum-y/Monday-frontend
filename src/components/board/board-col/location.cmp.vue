<template>
    <div v-if="task" class="task-location">
        <div class="input-container">
            <input class="input-location" :id="row.id" type="text"
                :placeholder="[task.value ? task.value.title : 'Type address...']" />
            <div class="icon-v2-line-location"></div>
        </div>
        <div class="m-6" ref="mapDiv" style="width: 95%; height: 400px"></div>
    </div>
</template>
<script>
/* eslint-disable no-undef */
import { computed, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useGeolocation } from '../../../services/useGeolocation'
import { GOOGLE_MAPS_API_KEY } from '../../../services/apiKey'
export default {
    emits: ['updateTask'],
    name: ['location'],
    props: {
        task: Object,
        labels: {
            type: Array,
            required: true
        },
        row: Object,
        status: Array,
        priority: Array,
        boardMembers: Array

    },

    created() {
        //saber la accion del navegador, reload, navigate, back_forward
        if (performance.getEntriesByType('navigation')[0].type === 'reload') {
            sessionStorage.clear()
        }

    },
    setup(props, { emit }) {
        const { coords } = useGeolocation()
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude
        }))

        function doEmit(newData) {
            emit('updateTask', newData)
        }



        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY, libraries: ['places']
        })
        // let mapDiv = ref(null)
        let map = ref(null)
        let marker = ref(null)

        let resul_lat = ref(null)
        let resul_lng = ref(null)

        let placeDet = ref({
            exterior: '',
            interior: '',
            street: '',
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
                document.getElementById(props.row.id).value = sessionStorage.getItem('placeInput')
                resul_lng.value = center.lng
                resul_lat.value = center.lat
            } else {
                center = currPos.value
                resul_lng.value = center.lng
                resul_lat.value = center.lat
            }



            marker = new google.maps.Marker({
                map: map.value,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: center
            })

            google.maps.event.addListener(marker, 'dragend', function () {
                resul_lat.value = marker.getPosition().lat()
                resul_lng.value = marker.getPosition().lng()
                center = {
                    lat: resul_lat.value,
                    lng: resul_lng.value
                }
                sessionStorage.setItem('center', JSON.stringify(center))
            })

            //autocompletar
            const placeInput = document.getElementById(props.row.id)
            const options = {
                types: ['geocode']
            }
            const autocomplete = new google.maps.places.Autocomplete(placeInput, options)
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                let place = autocomplete.getPlace()

                sessionStorage.setItem('placeInput', placeInput.value)
                let location = {}
                console.log(place)
                location.title = place.formatted_address
                location.lnglat = place.geometry.location
                let newCol = { type: props.task.type, value: location }
                let newData = { newCol, taskId: props.row.id, groupId: props.row.groupId }

                doEmit(newData)
                this.value = place.address_components[0].short_name
                center = place.geometry.location
                sessionStorage.setItem('center', JSON.stringify(center))

                sessionStorage.setItem('map', map.value)
                sessionStorage.setItem('marker', marker.value)


                resul_lat.value = center.lat()
                resul_lng.value = center.lng()

                //limpiar todo


                placeDet.value = {
                    exterior: '',
                    interior: '',
                    street: '',
                    CP: '',
                    localidad: '',
                    municipio: '',
                    estado: '',
                }

                //guardar detalles
                let detalles = place.address_components
                for (let i = 0; i < detalles.length; i++) {
                    var d = detalles[i]
                    switch (d.types[0]) {
                        case "street_number":
                            placeDet.value.exterior = d.long_name
                            break
                        case "route":
                            placeDet.value.street = d.long_name
                            break
                        case "postal_code":
                            placeDet.value.CP = d.long_name
                            break
                        case "locality":
                            placeDet.value.municipio = d.long_name
                            break
                        case "administrative_area_level_1":
                            placeDet.value.estado = d.long_name
                            break
                        case 'country':
                            break
                    }
                }
                sessionStorage.setItem('placeDet', JSON.stringify(placeDet.value))
            })

        })


        return {
            //mapa
            // mapDiv,
            //coordenadas
            resul_lat, resul_lng,
            placeDet,
            value: 'Type address...',
            location: null,
            latLng: null,
            value2: ''
        }
    },

    computed: {
        locationToDisplay() {
            if (!this.task.value) return ''
            return this.task.value
        },

    },



}
</script>
<style>
.input-location {
    display: flex;
    max-width: 100%;
    padding-left: 20px;

}

.task-location {
    width: 100%;
}

.input-container input {
    border: none;
    height: 100%;
}
</style>

