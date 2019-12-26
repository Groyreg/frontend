<template>
    <v-container fluid no-gutters>

        <v-row align="center">

            <v-spacer/>

            <v-col md="6" cols="11" >
                <!-- HEADER -->
                <v-row>
                    <h1 class="display-1 font-weight-light mb-5">Еще никогода не было так просто</h1>
                </v-row>

                <!-- CTA -->
                <v-row>
                    <v-tabs v-model="tab" background-color="transparent" color="secondary" grow>
                        <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item v-for="(tab, index) in tabs" :key="tab">
                            <v-card flat >
                                <v-card-text>{{ text[index] }}</v-card-text>
                            </v-card>
                        </v-tab-item>

                    </v-tabs-items>
                </v-row>

                <!-- ACTIONS -->
                <v-row>
                    <v-btn text nuxt-link to="/about">Хочу знать больше</v-btn>
                    <v-btn elevation="10" color="accent" nuxt-link to="/user">Начать</v-btn>
                </v-row>

                <!-- RATING -->
                <v-row align="center" class="pt-5">
                    <v-rating
                            :empty-icon="emptyIcon"
                            :full-icon="fullIcon"
                            readonly
                            :value="4" dense color="orange" background-color="orange" hover class="pr-3"/>
                    <h4 class="font-weight-medium">Лучшее приложение по моей версии</h4>
                </v-row>
            </v-col>


            <!-- IMAGE -->
            <v-col md="4" class="hidden-sm-and-down">
                <v-img contain max-height="60vh" :src='building'>
                    <!-- <v-row class="fill-height" align="center" justify="center">-->
                    <!--    <h1 class="display-2 font-weight-light white&#45;&#45;text ">КОЛАБА</h1><br>-->
                    <!-- </v-row>-->
                </v-img>
            </v-col>

            <v-spacer/>

        </v-row>
    </v-container>
</template>


<script>
    import {mdiHeartOutline, mdiHeart} from '@mdi/js'

    export default {
        // transition(to, from) {
        //   if (!from) return 'slide-left';
        //   return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
        // },

        data() {
            return {
                emptyIcon: mdiHeartOutline,
                fullIcon: mdiHeart,
                building: require('assets/images/building.png'),
                tab: null,
                tabs: [
                    'ОБЩИЕ ЦЕЛИ', 'ВОЗМОЖНОСТИ', 'ОБМЕН ЗНАНИЯМИ'
                ],
                text: [
                    'Коллаборация, или сотрудничество — процесс совместной деятельности в какой-либо сфере двух и более людей или организаций для достижения общих целей, при которой происходит обмен знаниями, обучение и достижение согласия.',
                    'Как правило, этот процесс требует наличия руководящего органа, при этом форма руководства может быть и общественной при сотрудничестве равноправных членов децентрализованного сообщества.  ',
                    'Коллаборация может существовать и при противоположности целей. Считается, что участники коллаборации могут получить больше возможностей достижения успеха в условиях конкуренции за ограниченные ресурсы.',
                ]
            };
        },

        methods: {}

    }
</script>

<style scoped lang="scss">
    .radius {
        border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
    }
</style>
