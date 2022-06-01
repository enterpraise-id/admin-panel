import * as y from "yup";

export const formValidation = {
  name: y.string().required('This field is required')
}