<template>
    <v-container>
        <v-col md="6" cols="12" id="left">

            <ColabaCard/>

        </v-col>
    </v-container>
</template>


<script>
    import ColabaCard from '~/components/colaba/ColabaCard.vue'

    export default {
        // middleware: 'auth',
        components: {
            ColabaCard
        },
        data() {
            return {
                errored: false
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
