import InputText from "../../../components/Input/Text/InputText.svelte";

export const formSteps = [
  {
    label: "Jenis kulit seperti apa yang akan kamu gunakan di produkmu nanti?",
    component: InputText,
    key: "name",
  },
  {
    label: "Slug?",
    component: InputText,
    key: "slug",
  },
];
