<template>
    <div>
        <h3>
            Список зарегистрированных пользователей
        </h3>

        <sui-button-group icons size="small">
            <sui-button icon="download" content=" Загрузить из файла"/>
            <sui-button icon="upload" content=" Выгрузить в файл" />
            <sui-button icon="close" content=" Очистить список" />
            <sui-button positive @click.native="toggle">Добавить вручную</sui-button>
        </sui-button-group>

        <sui-modal v-model="open">
            <sui-modal-header>Новый пользователь</sui-modal-header>
            <sui-modal-content image>
                <sui-form>
                    <sui-form-field>
                        <label>Полное имя</label>
                        <input placeholder="Имя" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>UUID</label>
                        <input placeholder="UUID" />
                    </sui-form-field>
                </sui-form>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive @click.native="toggle">
                    Добавить
                </sui-button>
            </sui-modal-actions>
        </sui-modal>

        <sui-table celled>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>ID</sui-table-header-cell>
                    <sui-table-header-cell>UUID</sui-table-header-cell>
                    <sui-table-header-cell>Имя</sui-table-header-cell>
                    <sui-table-header-cell>Роли</sui-table-header-cell>
                    <sui-table-header-cell>Действия</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>

            <sui-table-body>
                <sui-table-row v-for="user in users">
                    <sui-table-cell>{{ user.id }}</sui-table-cell>
                    <sui-table-cell>{{ user.uuid }}</sui-table-cell>
                    <sui-table-cell>{{ user.name }}</sui-table-cell>
                    <sui-table-cell>
                        <sui-dropdown
                            fluid
                            multiple
                            :options="roles"
                            placeholder="Роли"
                            selection
                            @input="user.roles = $event"
                            :value="user.roles"
                        />
                    </sui-table-cell>
                    <sui-table-cell>
                        <sui-button icon="exclamation" size="mini" color="orange" content=" Блокировать" />
                        <sui-button icon="dont" size="mini" color="red" content=" Удалить" />
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>
    </div>
</template>

<script>
import repo from '../repo.js'

export default {
    created() {
        let users = new repo.Users()
        this.users = users.getAll()
    },
    data() {
        return {
            users: [],
            roles: [
                { key: 'User', text: 'User', value: 'User' },
                { key: 'Candidate', text: 'Candidate', value: 'Candidate' },
                { key: 'Moderator', text: 'Moderator', value: 'Moderator' },
                { key: 'Admin', text: 'Admin', value: 'Admin' },
            ],
            open: false
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
    }
}
</script>