<template>
    <!-- Участники >>> -->
    <section>
        <h4 class="title">Участники</h4>

        <v-form>

            <v-autocomplete
                    color="success"
                    outlined
                    multiple
                    chips
                    hide-no-data hide-selected
                    v-model="selectedMembers"
                    :items="members"
                    label="🌀 доступные клавиши: ↑ ↓ esc ↵ ⌫"
                    item-text="name" item-value="name"
            >

                <template v-slot:selection="selectedMembers">
                    <v-chip
                            close
                            v-bind="selectedMembers.attrs"
                            :input-value="selectedMembers.selected"
                            @click="selectedMembers.select" @click:close="remove(selectedMembers.item)"
                    >
                        <v-avatar left>
                            <v-img :src="selectedMembers.item.avatar"/>
                        </v-avatar>
                        {{ selectedMembers.item.name }}
                    </v-chip>
                </template>


                <template v-slot:item="members">

                    <template v-if="typeof members.item !== 'object'">
                        <v-list-item-content v-text="members.item"/>
                    </template>

                    <template v-else>
                        <v-list-item-avatar>
                            <img :src="members.item.avatar" alt="avatar"/>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{members.item.name}}</v-list-item-title>
                            <v-list-item-subtitle v-html="members.item.group"/>
                        </v-list-item-content>

                    </template>
                </template>


            </v-autocomplete>
        </v-form>
        <!-- <<< Участники -->
    </section>
</template>

<script>
    export default {
        data() {

            return {
                selectedMembers: ['Александр Петрович', 'Саша Грей'],
                members: [
                    {header: 'Мои соседи'},
                    {name: 'Александр Петрович', group: 'Мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
                    {name: 'Мышка', group: 'Мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
                    {name: 'Котик', group: 'Мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
                    {name: 'Смелый Гусь', group: 'Мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
                    // {divider: true},
                    {header: 'Не мои соседи'},
                    {name: 'Катя Блу', group: 'Не мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
                    {name: 'Нина Смелая', group: 'Не мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'},
                    {name: 'Иван Пупкин', group: 'Не мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
                    {name: 'Саша Грей', group: 'Не мои соседи', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
                ],

            };
        },
        created() {
        },
        methods: {
            remove(item) {
                const index = this.selectedMembers.indexOf(item.name);
                if (index >= 0) this.selectedMembers.splice(index, 1)
            },
        }

    }
</script>

<style scoped lang="scss">

</style>
