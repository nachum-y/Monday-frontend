<script>
/* eslint-disable no-undef */
// import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useGeolocation } from './useGeolocation.js'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = 'AIzaSyBnekuAC6yqMxLABI5HI0JB5rN-PtL966g'
import { ref } from 'vue'

export default {
    name: 'map',
    data() {
        return {
            // coords: useGeolocation(),

            otherPos: null,
            loader: new Loader({ apiKey: GOOGLE_MAPS_API_KEY }),
            mapDiv: null,
            map: null,
            clickListener: null,
            line: null,
            currPos: {
                latitude: 0, longitude: 0
            }
        }
    },
    async mounted() {
        await this.loader.load()
        const mapDiv = ref(null)
        let map = ref(null)
        const { coords } = useGeolocation()
        const currPos = {
            lat: coords.value.latitude,
            lng: coords.value.longitude
        }
        const otherPos = ref(null)
        console.log(mapDiv)
        this.map.value = new google.maps.Map(mapDiv.value, {
            center: this.currPos,
            zoom: 7
        })
        // this.clickListener = map.value.addListener(
        //     'click',
        //     ({ latLng: { lat, lng } }) =>
        //         (otherPos.value = { lat: lat(), lng: lng() })
        // )
    },
    async unmounted() {
        if (this.clickListener) clickListener.remove()
    },
    computed: {
        currPos() {
            // this.lat = coords.value.latitude
            // this.lng = coords.value.longitude
        },
    }
    // let line = null
    // watch([map, currPos, otherPos], () => {
    //     if (line) line.setMap(null)
    //     if (map.value && otherPos.value != null)
    //         line = new google.maps.Polyline({
    //             path: [currPos.value, otherPos.value],
    //             map: map.value
    //         })
    // })

    // const haversineDistance = (pos1, pos2) => {
    //     const R = 3958.8 // Radius of the Earth in miles
    //     const rlat1 = pos1.lat * (Math.PI / 180) // Convert degrees to radians
    //     const rlat2 = pos2.lat * (Math.PI / 180) // Convert degrees to radians
    //     const difflat = rlat2 - rlat1 // Radian difference (latitudes)
    //     const difflon = (pos2.lng - pos1.lng) * (Math.PI / 180) // Radian difference (longitudes)

    //     const d =
    //         2 *
    //         R *
    //         Math.asin(
    //             Math.sqrt(
    //                 Math.sin(difflat / 2) * Math.sin(difflat / 2) +
    //                 Math.cos(rlat1) *
    //                 Math.cos(rlat2) *
    //                 Math.sin(difflon / 2) *
    //                 Math.sin(difflon / 2)
    //             )
    //         )
    //     return d
    // }
    // const distance = computed(() =>
    //     otherPos.value === null
    //         ? 0
    //         : haversineDistance(currPos.value, otherPos.value)
    // )
    // return { currPos, otherPos, distance, mapDiv }

    // }
}
</script>

<template>
    <div class="map">

        <div ref="mapDiv" style="width: 100%; height: 80vh" />
    </div>

</template>

