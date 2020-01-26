<template>
    <section id="map">
    </section>
</template>

<script>
    import 'assets/style/mapbox-gl.css';
    import 'assets/style/mapbox-gl-geocoder.css'

    export default {
        // transition: 'bounce',

        middleware: 'auth',

        data() {
            return {
                mapStyle: 'mapbox://styles/mapbox/streets-v11',
                mapCenter: [37.643184, 55.813550],
                zoom: 15
            }
        },
        async mounted() {
            await this.createMap();
            document.querySelector('.mapboxgl-ctrl-geocoder input').focus();
        },

        methods: {
            async createMap() {
                const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
                const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

                mapboxgl.accessToken = process.env.MAP_API_TOKEN;

                const mapboxGeocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl,
                    countries: 'ru',
                    language: 'ru-RU',
                    placeholder: "Найти адрес"
                });

                const geolocateControl = new mapboxgl.GeolocateControl({
                    positionOptions: {enableHighAccuracy: false, timeout: 4000},
                    trackUserLocation: true,
                    fitBoundsOptions: {maxZoom: 15}
                });

                return new mapboxgl.Map({
                    container: 'map',
                    style: this.mapStyle,
                    center: this.mapCenter,
                    zoom: this.zoom
                })
                    .addControl(new mapboxgl.NavigationControl(), "top-left")
                    .addControl(mapboxGeocoder, "top-right")
                    .addControl(geolocateControl, 'bottom-left')
                    .addControl(new mapboxgl.FullscreenControl(), 'bottom-right')
            }

        }
    }
</script>

<style scoped lang="scss">

</style>
