<template>
    <div class="container">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/profile">Профиль</router-link> |
            <router-link to="/messages">Диалоги</router-link> |
            <router-link to="/groups">Группы</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

body, html {
    margin: 0;
    padding: 0;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

.list {
    text-align: left;

    .list-item {
        margin: 4px 0;
        padding: 4px 0;
        border-bottom: 1px solid #ccc;

        a {
            // color: #333;
            text-decoration: none;

            &:hover {
                color: #2196F3;
            }
        }
    }
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
