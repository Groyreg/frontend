<template>
  <section class="profile">
      <header class="profile__header">
          <div class="profile__avatar">
              <img :src="test" alt="" class="profile__avatar-img">
          </div>
          <div>
              <div class="profile__name">Дмитрий Колтович</div>
              <div class="profile__address">Москва тверская 23</div>
          </div>
      </header>
      <div class="profile__control">
          <button type="button" class="profile__control-btn">Обсуждения({{messages.length}})</button>
          <button type="button" class="profile__control-btn">Показать все</button>
      </div>

      <ul class="profile__list">
          <li class="profile__item" v-for="item in messages">
              <div class="profile__item-options">
                  <v-tooltip v-model="isShown" right>
                      <div class="options">
                          <p class="options__item">Завершить</p>
                          <p class="options__item">Удалить</p>
                          <p class="options__item">Возобновить</p>
                      </div>
                  </v-tooltip>
              </div>
              <div class="profile__item-header">
                  <div class="profile__item-notification">{{item.count}}</div>
                  <div class="profile__item-title">{{item.title}}</div>
              </div>
              <div class="profile__item-container">
                  <p class="profile__item-message">
                      <b class="profile__item-author">{{item.author}}: </b>
                      {{item.message}}
                  </p>
              </div>
          </li>
      </ul>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        test: 'https://www.kinonews.ru/insimgs/2016/newsimg/newsimg59861.jpg',
        messages: [
          {
            id: 0,
            count: 1,
            title: 'Установить шлакбаум',
            author: 'Даша Желобова',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cumque est maiores minus ratione reiciendis reprehenderit sit tempora, tenetur veritatis. Dignissimos dolores doloribus et magni modi molestiae nam quibusdam vitae.'
          },
          {
            id: 1,
            count: 1,
            title: 'Пойти погулять',
            author: 'Даша Другая',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cumque est maiores minus ratione reiciendis reprehenderit sit tempora, tenetur veritatis. Dignissimos dolores doloribus et magni modi molestiae nam quibusdam vitae.'
          },
          {
            id: 2,
            count: 1,
            title: 'Го в плойку',
            author: 'Вика Желобова',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cumque est maiores minus ratione reiciendis reprehenderit sit tempora, tenetur veritatis. Dignissimos dolores doloribus et magni modi molestiae nam quibusdam vitae.'
          },
        ]
      };
    },
  }
</script>
