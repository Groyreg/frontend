<template>
    <v-card class="card">
        <FloatingAction/>

        <v-list-item two-line :dark="!isDark" class="card__header-wrapper">
            <header class="card__header">
                <p class="card__header-label">Коллаба</p>
                <v-text-field class="card__header-title" label="Введите название" />
            </header>
        </v-list-item>

        <v-container class="card__body">
            <!-- Описание >>> -->
            <h4 class="card__body-title">Описание</h4>
            <Description />
            <!-- Описание >>> -->

            <!-- План >>> -->
            <h4 class="card__body-title">План коллабы</h4>
            <Steps />
            <!-- План >>> -->

            <!-- Участники >>> -->
            <Members />
            <!-- <<< Участники -->

            <!-- Виджеты >>> -->
            <h4 class="card__body-title">Виджеты</h4>
            <Widgets />
            <!-- Виджеты >>> -->

            <!-- Виджеты >>> -->
<!--            <h4 class="card__body-title">Обсуждение</h4>-->
            <Discussion />
            <!-- Виджеты >>> -->

            <v-btn block x-large color="primary">Создать коллабу</v-btn>

        </v-container>
    </v-card>
</template>

<script>

    import Description from '~/components/colaba/components/description/Description.vue'
    import Discussion from '~/components/colaba/components/discussion/Discussion.vue'
    import Members from '~/components/colaba/components/members/Members.vue'
    import Steps from '~/components/colaba/components/steps/Steps.vue'
    import Widgets from '~/components/colaba/components/widgets/Widgets.vue'
    import {
        mdiCheckboxBlankCircle, mdiPercent, mdiChevronDown, mdiCheckboxBlankOutline, mdiCheckboxMarkedOutline
    } from '@mdi/js'

    export default {
        components: {
          Description,
          Discussion,
          Members,
          Steps,
          Widgets
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
