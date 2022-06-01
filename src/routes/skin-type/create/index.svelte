<script>
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { useMachine } from "../../../hooks/use-machine";
  import InputText from "../../../components/Input/Text/InputText.svelte";
  import * as y from "yup";

  const [
    submit,
    {
      currentStep,
      steps,
      next,
      prev,
      state,
      isError,
      isFetching,
      isSuccess,
      errorMessage,
    },
  ] = useMachine({
    endpoint: {
      url: "/",
      method: "post",
    },
    initialValues: {
      name: "",
    },
    steps: [
      {
        key: "name",
        label:
          "Jenis kulit seperti apa yang akan kamu gunakan di produkmu nanti?",
        component: InputText,
        validation: y.string().required(),
      },
    ],
  });
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

          {#if isError}
            <span>{errorMessage}</span>
          {/if}
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
      on:click={prev}>Kembali</button
    >
  {/if}

  {#if currentStep < steps.length}
    <button
      class="absolute bottom-10 right-15 bg-white px-5 py-2 h-15 rounded text-red-500 font-bold uppercase"
      on:click={next}>Selanjutnya</button
    >
  {/if}

  {#if currentStep === steps.length}
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
