<template>
    <div>
        <h3>
            Список зарегистрированных пользователей
        </h3>

        <sui-button-group icons size="small">
            <sui-button icon="download" content=" Загрузить из файла" @click="readFile($refs.readFile)"/>
            <input type="file" style="display: none;" ref="readFile">
            <sui-button icon="upload" content=" Выгрузить в файл" @click="writeFile"/>

            <sui-button icon="close" color="red" content=" Очистить список" @click="clear"/>
            <sui-button positive @click.native="toggle">Добавить вручную</sui-button>
        </sui-button-group>

        <sui-modal v-model="open">
            <sui-modal-header>Новый пользователь</sui-modal-header>
            <sui-modal-content image>
                <sui-form>
                    <sui-form-field>
                        <label>Полное имя</label>
                        <input placeholder="Имя" v-model="newUser.name" />
                    </sui-form-field>
                    <sui-form-field>
                        <label>UUID</label>
                        <input placeholder="UUID" v-model="newUser.uuid" />
                    </sui-form-field>
                </sui-form>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive @click.native="saveNew">
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
                <sui-table-row v-for="user in users" :key="user.id">
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
        this.users = (new repo.Users()).getAll()
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
            open: false,
            newUser: {id: null, uuid: null}
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        readFile(el) {
            (new repo.PersistManager()).batchSaveUsers(el)
        },
        writeFile() {
            (new repo.PersistManager()).batchLoadUsers('users.csv')
        },
        clear() {
            (new repo.PersistManager()).clearUsers()
        },
        saveNew() {
            (new repo.PersistManager()).addUser(this.newUser)
            this.toggle()
        }
    }
}
</script>