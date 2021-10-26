<script lang="ts">
  import touchEvents from "./lib";

  const touchEnter = () => {
    console.log("touchenter");
  };
  const touchLeave = () => {
    console.log("touchleave");
  };
  const tap = () => {
    console.log("tap");
  };
</script>

<app
  use:touchEvents
  on:touchenter={touchEnter}
  on:touchleave={touchLeave}
  on:tap={tap}
>
  <div>Hello world!</div>
</app>

<style>
  app div {
    border: 1px solid red;
    padding: 10px;
    margin: auto;
  }
</style>
