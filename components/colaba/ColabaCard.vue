<template>
    <v-card>
        <FloatingAction/>

        <v-list-item two-line :dark="!isDark" class="py-5 grey darken-3">

            <v-list-item-content>
                <v-list-item-subtitle class="pb-2 text-uppercase font-weight-light">Колаба</v-list-item-subtitle>
                <v-list-item-title class="headline">Установка шлагбаума</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-container>
            <h4 class="mb-3 title">План действий</h4>

            <!-- ПАНЕЛЬ >>> -->
            <v-expansion-panels v-model="activePanel" :dark="!isDark">
                <v-expansion-panel v-for="(step, i) in steps" :key="i"
                                   hide-actions
                                   :readonly="isStepDone(i)"
                                   :class="{success: isStepDone(i)}">

                    <!-- HEADER >>> -->
                    <v-expansion-panel-header :expand-icon=mdiChevronDown>
                        <v-row align="center" class="spacer" no-gutters>
                            <v-col cols="4" class="font-weight-light">
                                <span v-if="isStepDone(i)" class="font-italic">Завершено</span>
                                <v-row v-else>
                                    <v-col cols="1">
                                        <v-icon small v-if="i === activeStepIndex" color="accent">
                                            {{mdiCheckboxBlankCircle}}
                                        </v-icon>
                                    </v-col>
                                    <v-col>Шаг {{i +1}}</v-col>
                                </v-row>
                            </v-col>
                            <v-divider class="mr-3" vertical/>
                            <strong v-html="step.title"/>
                        </v-row>
                    </v-expansion-panel-header>
                    <!-- <<< HEADER-->

                    <!-- КОНТЕНТ >>> -->
                    <v-expansion-panel-content>
                        <v-divider/>
                        <v-card-text style="white-space: pre-line;" color="white">
                            <!--TODO - delete v-if-->
                            <div v-if="i !== activeStepIndex">

                                <v-row align="center">

                                    <v-col cols="2" class="hidden-sm-and-down">
                                        <v-img :src='image' alt="Sunny image" width="45"/>
                                    </v-col>

                                    <v-col>Нужно: {{total}} ₽</v-col>

                                    <v-col>Собрано: {{currentBalance}} ₽</v-col>

                                    <v-col>
                                        <v-checkbox input-value="true" label="Уже оплатил" color="success"/>
                                    </v-col>

                                </v-row>

                                <v-slider
                                        v-model="percentOfDone"
                                        thumb-label="always"
                                        thumb-color="accent"
                                        color="success"
                                        :prepend-icon="mdiPercent"
                                        readonly
                                />
                            </div>
                            <!--TODO - delete v-if-->
                            <div v-else>
                                <h4 class="title mt-2">Сделай выбор</h4>
                                <v-list>
                                    <v-list-item-group v-model="selection" mandatory>
                                        <template v-for="(item, i) in variants">
                                            <v-list-item :key="`item-${i}`" :value="item">

                                                <template v-slot:default="{ active, toggle }">
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="item"/>
                                                    </v-list-item-content>

                                                    <v-list-item-action>
                                                        <v-checkbox
                                                                :input-value="active" :true-value="item"
                                                                @click="toggle"/>
                                                    </v-list-item-action>
                                                </template>
                                            </v-list-item>
                                        </template>
                                    </v-list-item-group>
                                </v-list>
                            </div>
                            <!--TODO - delete v-if-->

                            {{steps[i].text}}
                        </v-card-text>
                    </v-expansion-panel-content>
                    <!-- КОНТЕНТ  -->

                </v-expansion-panel>
            </v-expansion-panels>
            <!-- <<< ПАНЕЛЬ -->

            <!--            <v-btn text class="my-2" color="accent">➕ добавить шаг</v-btn>-->
            <v-btn text class="my-2">редактировать</v-btn>

            <v-divider class="my-2"/>

            <!-- Участники >>> -->
            <Members/>
            <!-- <<< Участники -->

            <section>
                <h4 class="title mb-2">Обсуждение</h4>
                <v-textarea
                        solo filled auto-grow clearable counter label="Оставьте сообщение"
                        hint="Ваше сообщение закрепится в топе обсуждения"
                        :value="text"/>
            </section>

            <v-divider/>

            <v-btn block color="accent" class="my-5">Опубликовать</v-btn>

        </v-container>
    </v-card>
</template>

<script>
    import Members from '~/components/colaba/Members.vue'
    import FloatingAction from '~/components/colaba/FloatingAction.vue'
    import {
        mdiCheckboxBlankCircle, mdiPercent, mdiChevronDown, mdiCheckboxBlankOutline, mdiCheckboxMarkedOutline
    } from '@mdi/js'

    export default {
        components: {
            Members, FloatingAction
        },
        data() {
            return {
                mdiCheckboxMarkedOutline: mdiCheckboxMarkedOutline,
                mdiCheckboxBlankOutline: mdiCheckboxBlankOutline,
                mdiCheckboxBlankCircle: mdiCheckboxBlankCircle,
                mdiChevronDown: mdiChevronDown,
                mdiPercent: mdiPercent,
                fab: false,
                text: null,
                selection: 'Первый подрядчик',
                variants: ['Первый подрядчик', 'Ну такое 🥺...', 'Длинное название подрядчика',],
                image: require('assets/images/chemodan.png'),
                currentBalance: 1456,
                total: 2000,
                percentOfDone: 0,
                activeStepIndex: null,
                activePanel: null,
                steps: [
                    {
                        title: 'Обсуждение',
                        text: 'Благодарим вас за присоединение к нам',
                    },
                    {
                        current: true,
                        title: 'Выбор подрядчика',
                        text: 'Одним из важнейших моментов в строительстве является выбор подрядчика, ведь именно от правильности вашего выбора зависит в конечном итоге не только сроки завершения работ, но и финансовый аспект стройки.\n' +
                            'Где найти подрядчика?\n' +
                            'Возникает закономерный вопрос, а где же найти качественного подрядчика, который является профи в своей узкоспециализированной нише? Существует несколько способов поиска, каждый из который имеет свои преимущества и недостатки.',
                    },
                    {
                        title: 'Сбор средств',
                        text: 'Осталось собрать совсем немного средств.',
                    },
                ],
                lorem: 'Коллаборация, или сотрудничество — процесс совместной деятельности в какой-либо сфере двух и более людей или организаций для достижения общих целей, при которой происходит обмен знаниями, обучение и достижение согласия.',
            };
        },
        created() {
            this.getCurrentStepIndex();
            this.computePercentOfDone();
        },
        computed: {
            isDark() {
                return this.$vuetify.theme.dark;
            }
        },
        methods: {
            remove(item) {
                const index = this.friends.indexOf(item.name);
                if (index >= 0) this.friends.splice(index, 1)
            },
            computePercentOfDone() {
                this.percentOfDone = 100 / this.total * this.currentBalance;
                return this.percentOfDone;
            },
            getCurrentStepIndex() {
                this.activePanel = this.activeStepIndex = this.steps.findIndex(message => message.current === true);
                return this.activeStepIndex;
            },
            isStepDone(stepIndex) {
                return stepIndex < this.activeStepIndex;
            },
        }

    }
</script>

<style scoped lang="scss">
    .fb {
        position: absolute;
    }
</style>
