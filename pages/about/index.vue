<template>
    <section>
        Подробности
    </section>
</template>


<script>
    export default {
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
