<template>
    <v-container>

        <v-row align="center">

            <v-col cols="5" class="hidden-sm-and-down">
                <v-img contain max-height="65vh" :src="woman"/>
            </v-col>


            <v-col md="6" cols="12">

                <v-card elevation="10">
                    <v-card-title primary-title>
                        <div class="headline">Авторизация</div>
                    </v-card-title>


                    <v-container>
                        <v-form ref="form" v-model="valid" lazy-validation>

                            <v-text-field v-model="userPrincipal.email"
                                          :rules="emailRules" label="E-mail" clearable required/>

                            <v-text-field
                                    v-model="userPrincipal.password"
                                    :rules="[rules.required, rules.min]"
                                    label="Пароль"
                                    :append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
                                    :type="showPassword ? 'text' : 'password'"
                                    @click:append="showPassword = !showPassword">
                            </v-text-field>

                        </v-form>
                    </v-container>

                    <v-container id="actions">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-btn elevation="10" color="secondary" block @click="login" :disabled="!valid">Войти
                                </v-btn>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-btn block :href="googleLink" color="blue-grey" class="white--text">Google
                                    <v-icon right>{{mdiGoogle}}</v-icon>
                                </v-btn>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-btn block :href="facebookLink" color="indigo" class="white--text ">Facebook
                                    <v-icon right>{{mdiFacebook}}</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <v-btn block @click="register" outlined :disabled="!valid">Регистрация</v-btn>
                            </v-col>
                        </v-row>

                        <v-row justify="center">
                            <v-btn small text @click="recover" color="accent" class="ma-2" v-show="needRecovery">
                                Воставновить
                            </v-btn>
                        </v-row>

                    </v-container>
                </v-card>
            </v-col>

            <v-spacer/>

        </v-row>

        <v-snackbar v-model="snackbarError.show" :timeout="snackbarError.timeout" :color="snackbarError.color" top
                    multi-line>
            {{ snackbarError.snackbarText }}
            <v-btn text @click="snackbarError.show = false">Закрыть</v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
    import Cookie from "js-cookie";
    import {mdiEyeOutline, mdiEyeOffOutline, mdiGoogle, mdiFacebook} from '@mdi/js'

    export default {
        async mounted() {
            Cookie.set('Referer', location.origin + this.$route.path);
            const token = this.$route.query.token;
            if (token) {
                const result = await this.$axios.post(process.env.RECOVERY_URL + '/' + token);
                if (result.status !== 200) {
                    console.error('NOT VALID TOKEN: ');
                    /** TODO
                     Ссылка устарела. На вашу почту было отправлено повторное письмо с подтверждением.
                     Ссылка действительна в течении 30 минут.
                     vuetifyjs.com/ru/components/dialogs
                     **/
                }
            }
        },

        data() {
            const baseUrl = process.env.API_URL;
            return {
                mdiEyeOutline: mdiEyeOutline,
                mdiEyeOffOutline: mdiEyeOffOutline,
                mdiFacebook: mdiFacebook,
                mdiGoogle: mdiGoogle,
                woman: require('assets/svg/woman.svg'),
                valid: true,
                needRecovery: false,
                showPassword: false,
                googleLink: baseUrl + process.env.GOOGLE_URL,
                facebookLink: baseUrl + process.env.FACEBOOK_URL,
                userPrincipal: {
                    email: null,
                    password: null
                },
                nameRules: [
                    v => !!v || 'Имя обязательно',
                    v => (v && v.length <= 10) || 'Имя должно быть короче 10-ти символов',
                ],
                emailRules: [
                    v => !!v || 'E-mail обязателен',
                    v => /.+@.+\..+/.test(v) || 'Введите правильный e-mail'
                ],
                rules: {
                    required: value => !!value || 'Обязательное поле',
                    min: v => (v == null || v.length >= 4) || 'Минимум 4 символа'
                },
                snackbarError: {
                    show: false,
                    timeout: 2500,
                    snackbarText: 'error',
                    color: 'error'
                },
            };
        },
        methods: {
            async isUsernameExist() {
                return (await this.$axios.get('/guest/' + this.userPrincipal.email)).data;
            },
            async validate() {
                this.valid = this.$refs.form.validate();
                return this.valid;
            },
            async login() {
                if (this.validate()) {
                    try {
                        if (await this.isUsernameExist()) {
                            await this.$auth.loginWith('local', {data: this.userPrincipal});
                        } else {
                            this.needRecovery = false;
                            this.showErrorSnackbar('Пользователь с таким email не зарегистрирован');
                        }
                    } catch (e) {
                        this.needRecovery = true;
                        this.showErrorSnackbar('Неправильный логин, либо пароль');
                    }
                }
            },
            showErrorSnackbar(text) {
                this.snackbarError.snackbarText = text;
                this.snackbarError.show = true;
                // this.snackbarError.color = this.$vuetify.theme.themes.light.error;
            },
            async register() {
                if (this.validate()) {
                    try {
                        if (await this.isUsernameExist()) {
                            this.showErrorSnackbar('Пользователь с таким email уже зарегистрирован');
                        } else {
                            await this.$axios.post(process.env.REGISTRATION_URL, this.userPrincipal)
                                .then(() => this.login())
                        }
                    } catch (e) {
                        this.showErrorSnackbar('Упс. Что-то пошло не так 🥺');
                    }
                }
            },
            async recover() {
                await this.$axios.post(process.env.RECOVERY_URL, this.userPrincipal.email, {headers: {'Content-Type': 'text/plain'}});
            },
            clear() {
                this.userPrincipal = {};
                this.$refs.form.reset();
            },
        }
    }
    ;
</script>

<style scoped>

</style>
