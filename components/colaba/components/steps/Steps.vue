<template>
    <section class="colaba-steps" v-model="activePanel" :dark="!isDark">
        <!--             TODO добавить логику активного и выполненного шага. Для активного класс _active, для выполненного: _done -->

        <div class="colaba-steps__item-container" v-for="(step, i) in steps"
             :key="i"
            :class="{_active: i === 1, _done: i === 0}" >
            <p class="colaba-steps__item-step">Шаг {{i+1}}</p>
            <div class="colaba-steps__item">
                <div class="colaba-steps__item-wrapper _sb">
                    <p class="colaba-steps__item-title">{{step.title}}</p>
                    <div class="colaba-steps__item-wrapper">
<!--                        TODO хз не отображаются иконки -->
<!--                        <v-icon color="#fff" left>fas fa-check</v-icon>-->
                        <span class="colaba-steps__item-status">Завершено!</span>
                        <div class="colaba-steps__options" @click="isShown = !isShown">
                            <span class="colaba-steps__options-item" />
                            <span class="colaba-steps__options-item" />
                            <span class="colaba-steps__options-item" />
                            <v-tooltip v-model="isShown" right>
                                <div class="options">
                                    <p class="options__item">Завершить</p>
                                    <p class="options__item">Удалить</p>
                                    <p class="options__item">Возобновить</p>
                                </div>
                            </v-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="colaba-steps__item-control" />
        </div>
        <div class="colaba-steps__admin" v-if="isAdmin">
            <button type="button" class="colaba-steps__btn">
                <span class="colaba-steps__btn-icon">
                    <!--                        TODO иконку плюсика -->
                    <!--                        <v-icon color="#fff" left>fas fa-check</v-icon>-->
                </span>
                <span class="colaba-steps__btn-text">Добавить шаг</span>
            </button>
        </div>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        isAdmin: true,
        isShown: false,
        activeStepIndex: null,
        activePanel: null,
        steps: [
          {
            current: false,
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
            current: false,
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
