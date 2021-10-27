<script lang="ts">
  import touchEvents from "./lib";

  const tap = ({ detail }: CustomEvent) => {
    console.log("tap", detail);
  };
</script>

<app use:touchEvents on:tap={tap}>
  <div>Tap me</div>
</app>

<style>
  app div {
    border: 1px solid red;
    padding: 20px;
    margin: auto;
    display: flex;
    justify-content: center;
  }
</style>
