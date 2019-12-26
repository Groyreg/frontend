<template>
    <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact class="radius">

            <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
                <v-list-item-title v-text="item.title"/>
            </v-list-item-content>

        </v-list-item>
    </v-list>
</template>

<script>
    import {mdiHomeAutomation, mdiBullseye, mdiContacts, mdiSettings, mdiMapMarker} from '@mdi/js'

    export default {
        data() {
            return {
                items: [
                    {
                        icon: mdiHomeAutomation,
                        title: 'Новости',
                        to: '/news'
                    },
                    {
                        icon: mdiBullseye,
                        title: 'Мои колабы',
                        to: '/user'
                    },
                    {
                        icon: mdiContacts,
                        title: 'Контакты',
                        to: '/contacts'
                    },
                    {
                        icon: mdiSettings,
                        title: 'Настройки',
                        to: '/settings'
                    },
                    {
                        icon: mdiMapMarker,
                        title: 'Карта',
                        to: '/map'
                    }
                ],
                errored: false
            };
        },
        methods: {}

    }
</script>


<style scoped lang="scss">
    /* TODO: Tabs with Round Out Borders - https://css-tricks.com/better-tabs-with-round-out-borders/
    .v-list-item--active {
        color: black;
        background: var(--v-primary-base);
    }
    .v-list-item__content {
        color: black;
    }
    */
</style>
