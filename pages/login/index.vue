<template>
    <v-container class="auth">

        <v-row align="center">

            <v-col md="6" cols="12">

                <v-card elevation="10" class="auth__form">
                    <v-card-title primary-title>
                        <div class="auth__form-steps">Шаг {{tabs[0].name}} из {{tabs.length}}</div>
                        <div class="auth__form-title">{{authType}}</div>
                    </v-card-title>
                    <div class="auth__progress">
                        <div class="auth__progress-item _active" />
                        <div class="auth__progress-item" />
                        <div class="auth__progress-item" />
                    </div>
                    <div class="auth__form-wrapper">
                        <v-form ref="form" v-model="valid" lazy-validation class="auth__form-form">

                            <v-text-field
                                    placeholder=" "
                                    v-model="userPrincipal.email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    clearable
                                    required
                            />

                            <v-text-field
                                    placeholder=" "
                                    v-model="userPrincipal.password"
                                    :rules="[rules.required, rules.min]"
                                    label="Пароль"
                                    :append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
                                    :type="showPassword ? 'text' : 'password'"
                                    @click:append="showPassword = !showPassword"
                            >
                            </v-text-field>
                            <v-select
                                placeholder=" "
                                :items="items"
                                label="Город для теста"
                            />

                        </v-form>
                        <div class="auth__form-buttons">
                            <a href="#" class="auth__link" @click="recover" v-show="needRecovery">Забыли пароль?</a>
                            <v-btn color="primary" block @click="login" :disabled="!valid">Далее</v-btn>
                            <v-btn block :href="facebookLink" class="_facebook">Войти через&nbsp;<strong>Facebook</strong>
                                <v-icon left>{{mdiFacebook}}</v-icon>
                            </v-btn>
                            <a href="#" class="auth__link" @click="register" :disabled="!valid">Зарегистрироваться</a>
                        </div>
                        <div class="auth__form-policy">
                            <span>Я соглашаюсь с условиями использования и подтверждаю,
                                что ознакомился с политикой конфиденциальности</span>
                        </div>
                    </div>
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
                tabs: [
                  {
                    name: '1',
                    active: true
                  },
                  {
                    name: '2',
                    active: false
                  },
                  {
                    name: '3',
                    active: false
                  }
                ],
                items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
                authType: 'Регистрация'
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
