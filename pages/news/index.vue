<template>
    <v-container>
        <Peoples/>

        <v-row class="mt-5">
            <v-col md="6" cols="12" id="left">
                <List/>

                <CafeCard class="mt-5"/>
            </v-col>

            <v-col md="6" cols="12" id="right">
                <Category/>

                <Weather class="mt-5"/>
            </v-col>
        </v-row>

    </v-container>
</template>


<script>
    import Peoples from '~/components/news/Peoples.vue'
    import List from '~/components/news/List.vue'
    import Category from '~/components/news/Category.vue'
    import CafeCard from '~/components/news/CafeCard.vue'
    import Weather from '~/components/news/Weather.vue'

    export default {
        components: {
            Peoples, List, Category, CafeCard, Weather
        },
        data() {
            return {
                errored: false,

            };
        },
        methods: {
            async getPangramms() {
                let pangramms = await this.$axios.$get('/pangrammas/by');
                this.$store.commit('SET_HELLO_MESSAGE', pangramms[0]);
                return pangramms;
            }
        }

    }
</script>

<style scoped lang="scss">

</style>
