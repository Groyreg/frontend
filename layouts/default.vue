<template>
    <v-app id="inspire" :dark="setTheme" class="app">

        <!-- LEFT NAVIGATION-->
        <v-navigation-drawer v-model="drawer" clipped app dark class="gradient"><!-- or `temporary` except `clipped`-->
            <!--Avatar-->
            <v-img :aspect-ratio="4/3" :src="avatar" alt="avatar"/>

            <!--Menu-->
            <MenuList/>

            <!--Action Buttons-->
            <template v-slot:append>
                <div class="mx-3">
                    <v-switch label="темная тема" v-model="goDark"/>

                    <aside v-show="$auth.loggedIn">
                        <v-btn color="accent" block v-show="$auth.hasScope('GUEST')" :href="mailServicesLink">
                            Подтвердить почту
                        </v-btn>

                        <v-btn :elevation="10" color="black" block @click="getPangramms()" class="my-2">Создать колабу
                        </v-btn>

                        <v-btn outlined block @click="logout">ВЫЙТИ</v-btn>
                    </aside>

                    <span>{{$store.state.helloMessage}} </span>

                </div>
            </template>
        </v-navigation-drawer>

        <!--TOOLBAR-->
        <v-app-bar app clipped-left>
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>{{mdiMenu}}</v-icon>
            </v-btn>

            <nuxt-link to="/" exact style="text-decoration: none;">
                <v-toolbar-title class="accent--text myfont ml-2">КОЛАБА</v-toolbar-title>
            </nuxt-link>

            <v-spacer/>


            <div>
                <v-btn text icon v-show="!$auth.loggedIn" nuxt-link to="/login">
                    <v-icon>{{ mdiLoginVariant }}</v-icon>
                </v-btn>
                <v-btn text icon v-show="$auth.loggedIn">
                    <v-icon>{{mdiCommentProcessingOutline}}</v-icon>
                </v-btn>
            </div>

        </v-app-bar>


        <v-content class="content">
            <Nav />
            <nuxt />
            <Profile />
        </v-content>

        <!--FOOTER-->
        <v-footer dark padless>
            <v-card class="flex" text tile>
                <v-card-title> &copy;2019 — colaba
                    <v-spacer/>
                    <v-btn v-for="icon in footerIcons" :key="icon" class="mx-3" icon>
                        <v-icon size="2rem">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-footer>

    </v-app>
</template>

<script>
    // import {mapGetters} from 'vuex';
    import MenuList from '~/components/navigation/MenuList.vue'
    import Nav from '~/components/nav/Nav.vue'
    import Profile from '~/components/profile/Profile.vue'
    import {mdiLoginVariant, mdiCommentProcessingOutline, mdiFacebook, mdiInstagram, mdiMenu} from '@mdi/js'

    export default {
        components: {
            MenuList,
            Nav,
            Profile
        },
        created() {
            this.$store.dispatch('baseUrlForStatic');
        },
        computed: {
            /*mapGetters(['avatar']) , */
            mailServicesLink() {
                const clientId = this.$auth.user ? this.$auth.user.id : null;
                return (clientId && clientId.includes('@')) ? ("http://" + clientId.replace(/.*@/, '')) : null;
            },
            avatar() {
                if (this.$auth.user) {
                    const avatarUrl = this.$auth.user.avatar;
                    return avatarUrl.startsWith("http") ? avatarUrl
                        : (this.$store.state.baseUrlForStatic + avatarUrl)
                } else return require('assets/images/man.png')
            },
            setTheme() {
                this.$vuetify.theme.dark = this.goDark;
            }
        },
        data() {
            return {
                mdiCommentProcessingOutline: mdiCommentProcessingOutline,
                mdiLoginVariant: mdiLoginVariant,
                mdiInstagram: mdiInstagram,
                mdiFacebook: mdiFacebook,
                mdiMenu: mdiMenu,
                goDark: false,
                drawer: false,
                footerIcons: [mdiFacebook, mdiInstagram]
            }
        },
        methods: {
            logout() {
                this.$auth.logout();
                this.$router.push('/')
            },
            async getPangramms() {
                let pangramms = await this.$axios.$get('/pangrammas/by');
                this.$store.commit('SET_HELLO_MESSAGE', pangramms[0]);
                return pangramms;
            },
        }

    }
</script>

<style scoped lang="scss">
    .gradient {
        background: rgb(108, 30, 180);
        background: linear-gradient(to top, rgba(108, 30, 180, 1) 0%, rgba(101, 96, 245, 1) 40%);
    }

    .radius {
        border-radius: 0 2rem 0 0;
    }

    .myfont {
        text-decoration: none;
        font-family: 'Amatic', cursive;
        font-size: 2rem;
    }

</style>
