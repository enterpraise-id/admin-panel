<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import InputText from "../components/Input/Text/InputText.svelte";
  import Select from "../components/Input/Select/Select.svelte";
  import { get, writable } from "svelte/store";

  let currentStep = 0;
  const state = writable({
    name: "",
    category: "",
    price: "",
  });

  const steps = [
    {
      label: "Hallo Dikry, mau di kasih nama apa nih produk ini?",
      component: InputText,
      key: "name",
    },
    {
      label: "Produk ini termasuk dalam kategori apa sih Dikry?",
      component: Select,
      key: "category",
    },
    {
      label: "Kira-kira, berapa harga yang cocok untuk produk ini?",
      component: InputText,
      key: "price",
    },
  ];

  function next() {
    currentStep += 1;
  }

  function back() {
    if (currentStep > 0) {
      currentStep -= 1;
    }
  }

  function submit() {
    const data = get(state);
    alert(JSON.stringify(data));
  }
</script>

<div class="root fixed top-0 bottom-0 right-0 left-0 p-5 flex flex-row-reverse">
  <div class="h-full rounded p-10 flex flex-col justify-center w-[700px]">
    {#each steps as step, index}
      {#if index === currentStep}
        <div
          in:slide={{ delay: 600, duration: 300, easing: quintOut }}
          out:slide={{ duration: 300, easing: quintOut }}
          class="flex flex-col justify-center items-center w-full"
        >
          <label for="#" class="text-5xl font-bold text-white"
            >{step.label}</label
          >
          <svelte:component
            this={step.component}
            bind:value={$state[step.key]}
          />
        </div>
      {/if}
    {/each}
  </div>

  {#if currentStep > 0}
    <button
      disabled={currentStep === 0}
      class="absolute bottom-10 left-15 bg-white px-5 py-2 h-15 rounded text-red-500 font-bold uppercase"
      class:bg-gray-300={currentStep === 0}
      class:text-gray-500={currentStep === 0}
      on:click={back}>Kembali</button
    >
  {/if}

  {#if currentStep < steps.length - 1}
    <button
      disabled={currentStep === steps.length - 1}
      class="absolute bottom-10 right-15 bg-white px-5 py-2 h-15 rounded text-red-500 font-bold uppercase"
      class:bg-gray-300={currentStep === steps.length - 1}
      class:text-gray-500={currentStep === steps.length - 1}
      on:click={next}>Selanjutnya</button
    >
  {/if}

  {#if currentStep === steps.length - 1}
    <button
      class="absolute bottom-10 right-15 bg-white px-5 py-2 h-15 rounded text-red-500 font-bold uppercase"
      on:click={submit}>Simpan</button
    >
  {/if}
</div>

<style>
  .root {
    background-image: url("https://img.freepik.com/free-photo/flat-lay-desk-arrangement-with-copy-space_23-2148928165.jpg?w=2000");
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
