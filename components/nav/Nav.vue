<template>
    <nav class="nav">
        <header class="nav__header">
            <img src="" alt="logo" class="nav__logo">
            <p class="nav__heading">colaba</p>
        </header>
        <v-btn color="primary" x-large class="nav__add">Создать колабу</v-btn>
        <ul class="nav__list">
            <li class="nav__item" v-for="tab in tabs" :class="tab.active && '_active'">{{tab.name}}</li>
        </ul>
    </nav>
</template>
<script>
  export default {
    data() {
      return {
        tabs: [
          {
            id: 0,
            name: 'Colaba',
            active: true,
          },
          {
            id: 1,
            name: 'Контакты',
            active: false,
          },
          {
            id: 2,
            name: 'Настройки',
            active: false,
          },
          {
            id: 3,
            name: 'Выйти',
            active: false,
          }
        ],
      };
    },
  }
</script>
