<template>
    <div class="colaba-widgets">
        <header class="colaba-widgets__header">
            <template v-for="widget in widgets">
                <div class="colaba-widgets__heading">
                    <div class="colaba-widgets__heading-icon" />
                    <p class="colaba-widgets__heading-text">{{widget}}</p>
                </div>
            </template>
        </header>

        <div class="colaba-widgets__heading _with-margin">
            <div class="colaba-widgets__heading-icon" />
            <p class="colaba-widgets__heading-text">{{widgets[0]}}</p>
        </div>

        <div class="colaba-widgets__poll">
            <header class="colaba-widgets__poll-header">
                <div class="colaba-widgets__poll-photo" />
                <p class="colaba-widgets__poll-photo-name">Дмитрий Колтович</p>
            </header>
            <span class="colaba-widgets__poll-description">Хотите ли вы, чтоб я сам выбрал
                подрядчиков для установки шлакбаума</span>
            <div class="colaba-widgets__control">
                <v-btn color="primary" class="colaba-widgets__control-btn">нет</v-btn>
                <v-btn color="accent" class="colaba-widgets__control-btn _success">да</v-btn>
            </div>
        </div>

        <div class="colaba-widgets__heading _with-margin">
            <div class="colaba-widgets__heading-icon" />
            <p class="colaba-widgets__heading-text">{{widgets[1]}}</p>
        </div>

        <div class="colaba-widgets__vote">
            <input type="text" class="colaba-widgets__vote-input" placeholder="Напишите что-нибудь" />
            <ul class="colaba-widgets__vote-list" >
                <li class="colaba-widgets__vote-item" v-for="item in voteList">{{item}}</li>
            </ul>
            <button class="colaba-widgets__vote-btn">
                <span class="colaba-widgets__vote-btn-icon" />
                <span class="colaba-widgets__vote-btn-text">Добавить шаг</span>
            </button>
        </div>

        <div class="colaba-widgets__heading _with-margin">
            <div class="colaba-widgets__heading-icon" />
            <p class="colaba-widgets__heading-text">{{widgets[2]}}</p>
        </div>

        <div class="colaba-widgets__photos">
            <label :for="i" class="colaba-widgets__photos-label" v-for="i in 6">
                <input :id="i" :name="i" type="file" class="colaba-widgets__photos-input" />
            </label>
        </div>

        <div class="colaba-widgets__heading _with-margin">
            <div class="colaba-widgets__heading-icon" />
            <p class="colaba-widgets__heading-text">{{widgets[3]}}</p>
        </div>

        <div class="colaba-widgets__map" />
    </div>
</template>
<script>
  export default {
    data() {
      return {
        widgets: ['Опрос', 'Голосование', 'Фото/Видео', 'Локация'],
        voteList: ['Опрос', 'Голосование', 'Фото/Видео', 'Локация']
      };
    }
  }
</script>
