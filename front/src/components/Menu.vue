<template>
    <sui-menu pointing>
        <template v-for="item in items">
            <a
                v-show="isVisible(item)"
                is="sui-menu-item"
                :active="isActive(item)"
                :key="item"
                :content="item"
                @click="select(item)"
            />
        </template>
    </sui-menu>
</template>

<script>
export default {
    name: "Menu",
    computed: {
        items() {
            // убираем роуты с параметрами
            let routes = this.$router.getRoutes().filter(x => !x.path.includes(':'))
            return routes.map(x => x.name)
        },
    },
    methods: {
        isActive(name) {
            return this.$route.name === name
        },
        select(name) {
            this.$router.push({ name })
        },
        isVisible(name) {
            let route = this.$router.getRoutes().filter(x => x.name === name)[0]
            let needLevel = route.meta.accessLevel
            let noCascade = route.meta.noCascade
            let currentLevel = this.$root.user.accessLevel

            if (noCascade) {
                return currentLevel === needLevel
            }

            return currentLevel >= needLevel
        }
    },
}
</script>
