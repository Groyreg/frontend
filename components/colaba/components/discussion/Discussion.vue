<template>
    <div class="colaba-discussion">
        <header class="colaba-discussion__header">
            <h4 class="colaba-discussion__title">Обсуждение</h4>
            <span class="colaba-discussion__comments-count">{{comments.length}} комментария</span>
        </header>

        <ul class="colaba-discussion__list">
            <li class="colaba-discussion__item" v-for="comment in comments">
                <span class="colaba-discussion__photo" />
                <span class="colaba-discussion__content">
                    <span class="colaba-discussion__message">
                        <b class="colaba-discussion__message-author">{{comment.author}}</b>
                        &nbsp;
                        <span class="colaba-discussion__message-text">{{comment.message}}</span>
                    </span>
                    <span class="colaba-discussion__control">
                        <button class="colaba-discussion__control-btn">Нравится</button>
                        <button class="colaba-discussion__control-btn">Ответить</button>
                        <span class="colaba-discussion__control-time">3&nbsp;ч</span>
                    </span>
                </span>
            </li>
        </ul>

        <div class="colaba-discussion__add">
            <span class="colaba-discussion__photo" />
            <div class="colaba-discussion__add-container">
                <input id="discussion" type="text" class="colaba-discussion__add-input">
                <label for="discussion" class="colaba-discussion__add-label">Напишите комментарий</label>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
            comments: [
              {
                author: 'Слава Лысенко',
                message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ducimus ex excepturi fugit in, iure molestiae nesciunt nobis quo quod ratione recusandae repellat sapiente sit sunt tempore? Quae, voluptate.',
                date: Date.now(),
              },
              {
                author: 'Влад Блад',
                message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore ducimus ex excepturi fugit in, iure molestiae nesciunt nobis quo quod ratione recusandae repellat sapiente sit sunt tempore? Quae, voluptate.',
                date: Date.now(),
              }
            ]
          }
        }
    }
</script>
