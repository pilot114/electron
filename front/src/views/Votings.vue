<template>
    <div>
        <h3>
            Список зарегистрированных голосований
        </h3>

        <sui-button-group icons size="small">
            <sui-button icon="download" content=" Загрузить из файла" @click="readFile($refs.readFile)"/>
            <input type="file" style="display: none;" ref="readFile">
            <sui-button icon="upload" content=" Выгрузить в файл" @click="writeFile"/>

            <sui-button icon="close" color="red" content=" Очистить список" @click="clear"/>
            <sui-button positive @click.native="toggle">Добавить вручную</sui-button>
        </sui-button-group>

        <sui-modal v-model="open">
            <sui-modal-header>Новое голосование</sui-modal-header>
            <sui-modal-content image>
                <sui-form>
                        <sui-form-field>
                            <label>Название</label>
                            <input placeholder="Название" />
                        </sui-form-field>
                        <sui-form-fields>
                            <sui-form-field>
                                <label>Начало голосования</label>
                                <sui-input placeholder="Начало" type="date" />
                            </sui-form-field>
                            <sui-form-field>
                                <label>Конец голосования</label>
                                <sui-input placeholder="Конец" type="date" />
                            </sui-form-field>
                        </sui-form-fields>
                        <sui-form-field width="five">
                            <label>Тип</label>
                            <sui-dropdown
                                placeholder="Тип"
                                selection
                                :options="types"
                                v-model="newType"
                            />
                        </sui-form-field>

                        <sui-form-field>
                            <label>Варианты</label>
                            <sui-dropdown
                                multiple
                                fluid
                                :options="(newType === 'За кандидата') ? userNames : []"
                                placeholder="Варианты"
                                search
                                selection
                                allow-additions
                                v-model="newVariants"
                            />
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
                    <sui-table-header-cell>Название</sui-table-header-cell>
                    <sui-table-header-cell>Тип</sui-table-header-cell>
                    <sui-table-header-cell>Период</sui-table-header-cell>
                    <sui-table-header-cell>Действия</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>

            <sui-table-body>
                <sui-table-row v-for="voting in votings">
                    <sui-table-cell>{{ voting.id }}</sui-table-cell>
                    <sui-table-cell>{{ voting.name }}</sui-table-cell>
                    <sui-table-cell>
                        <sui-dropdown
                            placeholder="Тип"
                            selection
                            :options="types"
                            @input="voting.type = $event"
                            :value="voting.type"
                        />
                    </sui-table-cell>
                    <sui-table-cell>{{ voting.start }} - {{ voting.end }}</sui-table-cell>

                    <sui-table-cell>
                        <sui-button v-if="voting.paused" icon="play" size="mini" color="orange" content=" Возобновить" />
                        <sui-button v-else icon="pause" size="mini" color="orange" content=" Остановить" />
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
        let votings = new repo.Votings()
        let users = new repo.Users()

        this.votings = votings.getAll()
        this.types = repo.getTypes()
        this.userNames = users.getAll().map(x => {
            return { key: x.name, text: x.name, value: x.name }
        })
    },
    data() {
        return {
            votings: [],
            userNames: [],
            types: [],

            newVariants: [],
            newType: 'За кандидата',

            open: false
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        readFile(el) {
            (new repo.PersistManager()).batchSaveVotings(el)
        },
        writeFile() {
            (new repo.PersistManager()).batchLoadVotings('votings.csv')
        },
        clear() {
            (new repo.PersistManager()).clearVotings()
        }
    }
}
</script>