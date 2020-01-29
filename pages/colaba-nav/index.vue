<template>
    <section class="colaba-nav">
        <header class="colaba-nav__header">
            <ul class="colaba-nav__tabs">
                <li class="colaba-nav__tab" v-for="tab in tabs" :class="tab.active && '_active'">{{tab.name}}</li>
            </ul>
        </header>

        <ul class="colaba-nav__list">
            <li class="colaba-nav__element" v-for="colaba in colabs">
                <span class="colaba-nav__element-border">
                    <span class="colaba-nav__element-header">
                    <p class="colaba-nav__element-title">{{colaba.title}}</p>
                    <span class="colaba-nav__vote">
<!--                        TODO добавить картинку голосования -->
                        <img src="" alt="" class="colaba-nav__vote-img">
                        <span class="colaba-nav__vote-count">{{colaba.vote}}</span>
                    </span>
                </span>

                    <span class="colaba-nav__element-body">

                    <span class="colaba-nav__element-img">
<!--                        TODO добавить урлы аватарок -->
                        <img :src="colaba.photoUrl" alt="avatar">
                    </span>

                    <span class="colaba-nav__element-container _full">
                        <span class="colaba-nav__element-author">{{colaba.author}}</span>
                        <span class="colaba-nav__element-wrapper">
                            <span class="colaba-nav__element-date">Создано: {{colaba.date}}</span>

                            <span class="colaba-nav__element-container">
                                <span v-if="colaba.isDone & !colaba.isVoted" class="colaba-nav__review">
                                    <span class="colaba-nav__review-status">Завершено!</span>
                                    <span class="colaba-nav__element-container _flex">
                                        <span class="colaba-nav__review-title">Оцените колабу</span>
                                        <span class="colaba-nav__element-container _flex">
<!--                                          TODO добавить иконки звездочек и написать логику  -->
                                            <span class="colaba-nav__review-item" v-for="i in 5" />
                                        </span>
                                    </span>
                                </span>

                                <span v-if="colaba.isDone & colaba.isVoted" class="colaba-nav__review-thanks">
                                    Спасибо!
                                </span>

                                <span v-if="!colaba.isDone" class="colaba-nav__step">
                                    Шаг{{colaba.step}}: {{colaba.stepName}}
                                </span>
                            </span>
                        </span>
                    </span>
                </span>
                </span>
            </li>
        </ul>
    </section>
</template>


<script>
  export default {
    data() {
      return {
        tabs: [
          {
            id: 0,
            name: 'Все колабы',
            active: true,
          },
          {
            id: 1,
            name: 'Мои колабы',
            active: false,
          },
          {
            id: 2,
            name: 'Опросы',
            active: false,
          },
          {
            id: 3,
            name: 'Голосования',
            active: false,
          }
        ],
        colabs: [
          {
            id: 0,
            title: 'Установить шлагбаум',
            // TODO заменить урл
            photoUrl: 'https://www.kinonews.ru/insimgs/2016/newsimg/newsimg59861.jpg',
            author: 'Дмитрий Колтович',
            date: '27.12.2019',
            isDone: true,
            isVoted: true,
            step: 1,
            stepName: 'Обсуждение',
            vote: 221,
          },
          {
            id: 1,
            title: 'Построить новую площадку',
            // TODO заменить урл
            photoUrl: 'https://www.kinonews.ru/insimgs/2016/newsimg/newsimg59861.jpg',
            author: 'Вячеслав Лысенко',
            date: '27.12.2019',
            isDone: true,
            isVoted: false,
            step: 3,
            stepName: 'Принятие',
            vote: 3,
          },
          {
            id: 1,
            title: 'Убрать мусор',
            // TODO заменить урл
            photoUrl: 'https://www.kinonews.ru/insimgs/2016/newsimg/newsimg59861.jpg',
            author: 'Дмитрий Колтович',
            date: '27.12.2019',
            isDone: false,
            isVoted: false,
            step: 2,
            stepName: 'Возобновление',
            vote: 140,
          },
        ]
      };
    },
  }
</script>

