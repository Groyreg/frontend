require('dotenv').config();
const webpack = require('webpack');
import pkg from './package';
import ru from 'vuetify/es5/locale/ru';
import en from 'vuetify/es5/locale/en';
import colors from 'vuetify/lib/util/colors';
import overriddenMdiIcons from './assets/mdiJsSvgIcons';

export default {
    mode: 'universal',
    head: {
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
            },
            {name: 'yandex-verification', content: '0f0fcbfb95f22d90'},
            {hid: 'description', name: 'description', content: pkg.description}
        ],
        link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
    },
    loading: {color: '#3B8070'},
    css: ['~assets/fonts/fonts.css' /*'~/assets/style/route_transitions.scss' */],

    vuetify: {
        treeShake: true,
        defaultAssets: false,
        icons: {iconfont: 'mdiSvg', values: overriddenMdiIcons},
        lang: {locales: {ru, en}, current: 'ru'},
        customVariables: ['~/assets/style/variables.scss'],
        theme: {
            options: {customProperties: true},
            themes: {
                light: {
                    // https://vuetifyjs.com/ru/customization/theme
                    secondary: colors.indigo.accent1,
                    accent: colors.deepOrange.accent2,
                    darken: colors.grey.darken3,
                    /*
                    primary: colors.blue.lighten5,
                    info: colors.teal.lighten1,
                    */
                },
                dark: {
                    darken: colors.grey.lighten3,
                }
            }
        }
    },
    modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
    buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment', '@nuxtjs/dotenv'],
    plugins: ['@/plugins/axios'],
    axios: {debug: true /* , https: true */},
    // router: {middleware: ['auth']},
    auth: {
        scopeKey: 'authorities',
        localStorage: false,
        strategies: {
            local: {
                endpoints: {
                    login: {url: '/auth/login', propertyName: false},
                    user: {url: '/user', method: 'post', propertyName: false},
                    logout: {url: '/logout', method: 'post'}
                }
            }
        }
    },
    build: {
        transpile: ['vuetify/lib'],
        plugins: [new webpack.ProvidePlugin({mapboxgl: 'mapbox-gl', geocoder: '@mapbox/mapbox-gl-geocoder'})]
    }
}
