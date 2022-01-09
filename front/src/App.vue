<template>
    <div id="app">
        <Menu/>
        <sui-segment>
            <router-view/>
        </sui-segment>
    </div>
</template>

<script>
import Menu from "./components/Menu";
export default {
    name: 'PointingMenuExample',
    components: {Menu},
    created() {
        // создаем объект пользователя
        let anon = {
            id: null,
            accessLevel: 10,
            name: 'Гость'
        }
        this.$root.user = anon
    },
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.name || 'Приложение для голосования';
            }
        },
    }
}
</script>
