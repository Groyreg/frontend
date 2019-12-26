<template>
    <v-container grid-list-lg>

        <v-flex xs12 sm6 offset-sm3 v-show="!$auth.loggedIn">
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Востановление пароля</div>
                    </div>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">

                    <v-text-field
                            label="Новый пароль"
                            v-model="password"
                            :append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
                            :type="show ? 'text' : 'password'"
                            :rules="[rules.required, rules.min]"
                            hint="Минимум 4 символа"
                            @click:append="show = !show"
                    >
                    </v-text-field>

                    <v-text-field
                            :type="'password'"
                            v-model="passwordConfirmation"
                            label="Еще раз"
                            :rules="[rules.required, rules.passwordMatch]"
                    >
                    </v-text-field>

                </v-card-text>

                <v-card-actions>
                    <v-btn @click="changePassword" color="red">Сменить пароль</v-btn>

                </v-card-actions>

            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import {mdiEyeOutline, mdiEyeOffOutline} from '@mdi/js'

    export default {
        auth: false,

        async validate({params, redirect, app}) {
            if (app.$auth.loggedIn) redirect('/');
            const recoveryToken = params.id;
            const result = await app.$axios.get(process.env.RECOVERY_URL + '/' + recoveryToken);
            if (result.status !== 200) redirect('/login?token=' + recoveryToken);
            return /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(recoveryToken)
        },

        data() {
            return {
                mdiEyeOutline: mdiEyeOutline,
                mdiEyeOffOutline: mdiEyeOffOutline,
                show: false,
                password: null,
                passwordConfirmation: null,
                rules: {
                    required: value => !!value || 'Обязательное поле',
                    min: v => (v == null || v.length >= 4) || 'Минимум 4 символа',
                    passwordMatch: p => p === this.password || 'Пароли не совпадают'
                },
            };
        },

        methods: {
            async changePassword() {
                const response = await this.$axios.post(process.env.PASSWORD_URL, this.password, {headers: {'Content-Type': 'text/plain'}});
                const userPrincipal = {email: response.data, password: this.password};
                this.$auth.loginWith('local', {data: userPrincipal});
                this.$router.push('/')
            },
            clear() {
                this.password = null;
                this.passwordConfirmation = null;
                this.$validator.reset();
            }
        }
    };
</script>

<style scoped>

</style>
