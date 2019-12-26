<template>
    <v-speed-dial class="fb"
                  v-model="expanded"
                  direction="bottom"
                  fixed top right
    >
        <template v-slot:activator>
            <v-btn fab text v-model="expanded" dark>
                <v-icon v-if="expanded">{{mdiClose}}</v-icon>
                <v-icon v-else>{{mdiChevronDoubleDown}}</v-icon>
            </v-btn>
        </template>

        <v-btn fab dark color="success" @click="edit">
            <v-icon>{{mdiPencil}}</v-icon>
        </v-btn>

        <v-btn fab dark small color="info" @click="add">
            <v-icon>{{mdiPlus}}</v-icon>
        </v-btn>
        <v-btn fab dark color="error" x-small @click="remove">
            <v-icon>{{mdiDelete}}</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
    import {mdiDelete, mdiClose, mdiPencil, mdiPlus, mdiChevronDoubleDown} from '@mdi/js'

    export default {
        data() {
            return {
                mdiChevronDoubleDown: mdiChevronDoubleDown,
                mdiPlus: mdiPlus,
                mdiPencil: mdiPencil,
                mdiClose: mdiClose,
                mdiDelete: mdiDelete,
                expanded: false,
            }
        },
        methods: {
            edit() {
                console.log('EDITED')
            },
            add() {
                console.log('ADDED')
            },
            remove() {
                console.log('REMOVED')
            },
        }

    }
</script>

<style scoped lang="scss">
    .fb {
        position: absolute;
    }
</style>
