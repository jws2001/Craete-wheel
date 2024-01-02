<script>
  import MoveFocus from "./plugins/move-focus/index";
  import { onMount } from "svelte";

  const indexList = [0, 1, 2, 3, 4];
  let moveFocus;

  onMount(() => {
    moveFocus = new MoveFocus({
      index: 0,
      indexList,
      scollWrapper: null,
      scollItem: null,
    });
  });
</script>

<main>
  {#each indexList as item}
    <div class="item">{item}</div>
  {/each}
</main>

<style>
  main {
    width: 500px;
    margin: 200px auto;
    border: 1px solid black;
    padding: 10px;
  }
  main .item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: brown;
    height: 50px;
    border: 1px solid saddlebrown;
    margin-bottom: 10px;
  }
</style>
