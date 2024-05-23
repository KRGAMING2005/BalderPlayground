<script lang="ts">
    import Tab from "$lib/tab.svelte";

    let tabs: Tab[] = [];

</script>

<nav>
    <Tab />
    <button on:click={() => {
        console.log("Hello World");
    }}>Add</button>
</nav>

<style>
    nav {
        width: 100%;
        height: 30px;
    }
    button {
        height: 100%;
        padding: 0px 15px 0px 15px;
    }
</style>