<template>
    <v-container>
        <v-btn @click="edit" color="error">Сделать ошибку</v-btn>
    </v-container>
</template>


<script>
    export default {
        middleware: 'auth',

        data() {
            return {
                errored: false
            };
        },
        methods: {
            async edit() {
                let failedRequest = await this.$axios.$get('/errors')
                    .catch(e => {
                        const exception = e.response;
                        console.log('Причина (exception.data): ' + exception.data);
                        this.errored = true;
                    });
                if (this.errored && !failedRequest) console.log('Тест ошибки прошел успешно')
            },
        }

    }
</script>

<style scoped lang="scss">

</style>
