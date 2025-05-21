import { useTranslations } from "next-intl";
import * as yup from "yup";

export const getCustomerSchema = (t: ReturnType<typeof useTranslations>) =>
  yup.object().shape({
    name: yup.string().required(t("errorRequired")),
    email: yup
      .string()
      .email(t("errorInvalidEmail"))
      .required(t("errorRequired")),
    phone: yup
      .string()
      .matches(/^\d{7,15}$/, t("errorInvalidPhone"))
      .required(t("errorRequired")),
    countrycode: yup
      .string()
      .matches(/^\+?\d+$/, t("errorInvalidCountryCode"))
      .required(t("errorRequired")),
    type: yup.string().required(t("errorRequired")),
    joindate: yup.date().required(t("errorRequired")),
  });

export type CustomerFormData = yup.InferType<
  ReturnType<typeof getCustomerSchema>
>;

export const getEmployeeSchema = (t: ReturnType<typeof useTranslations>) =>
  yup.object().shape({
    name: yup.string().required(t("required")),
    email: yup.string().email(t("invalidEmail")).required(t("required")),
    phone: yup
      .string()
      .matches(/^966\s?\d{9}$/, t("invalidPhone"))
      .required(t("required")),
    password: yup.string().required(t("required")).min(8, t("passwordMin")),
    department: yup.string().required(t("required")),
  });

export type EmployeeFormData = yup.InferType<
  ReturnType<typeof getEmployeeSchema>
>;

export const getEmployeeDetailsSchema = (
  t: ReturnType<typeof useTranslations>
) =>
  yup.object().shape({
    fullName: yup.string().required(t("required")),
    phoneNumber: yup
      .string()
      .matches(/^966\s?\d{9}$/, t("invalidPhone"))
      .required(t("required")),
    department: yup.string().required(t("required")),
    email: yup.string().optional(),
  });

export type EmployeeDetailsFormData = yup.InferType<
  ReturnType<typeof getEmployeeDetailsSchema>
>;

export const getCostsFormSchema = (t: ReturnType<typeof useTranslations>) =>
  yup.object({
    service: yup
      .string()
      .oneOf(["language", "printing", "covering"])
      .required(t("validation.required")),

    languge: yup
      .string()
      .when("service", (service, schema) =>
        (Array.isArray(service) ? service[0] : service) === "language"
          ? schema.required(t("validation.required"))
          : schema.strip()
      ),
    arabiclanguge: yup
      .string()
      .when("service", (service, schema) =>
        (Array.isArray(service) ? service[0] : service) === "language"
          ? schema.required(t("validation.required"))
          : schema.strip()
      ),
    color: yup
      .string()
      .when("service", (service, schema) =>
        (Array.isArray(service) ? service[0] : service) === "printing"
          ? schema.required(t("validation.required"))
          : schema.strip()
      ),
    arabiccolor: yup
      .string()
      .when("service", (service, schema) =>
        (Array.isArray(service) ? service[0] : service) === "printing"
          ? schema.required(t("validation.required"))
          : schema.strip()
      ),
    cover: yup
      .string()
      .when("service", (service, schema) =>
        (Array.isArray(service) ? service[0] : service) === "covering"
          ? schema.required(t("validation.required"))
          : schema.strip()
      ),
    arabiccover: yup
      .string()
      .when("service", (service, schema) =>
        (Array.isArray(service) ? service[0] : service) === "covering"
          ? schema.required(t("validation.required"))
          : schema.strip()
      ),
    cost: yup
      .number()
      .typeError(t("validation.required"))
      .required(t("validation.required")),
    id: yup.string().optional(),
    serviceType: yup.string().optional(),
  });

export type CostsFormData = yup.InferType<
  ReturnType<typeof getCostsFormSchema>
>;

export const getOrdersFormSchema = (t: ReturnType<typeof useTranslations>) =>
  yup.object({
    numberofletters: yup
      .string()
      .required(`${t("numberofletters")} ${t("isRequired")}`),
    status: yup.string().required(`${t("status")} ${t("isRequired")}`),
    cost: yup.string().required(`${t("cost")} ${t("isRequired")}`),
    id: yup.string().optional(),
  });

export type OrdersFormData = yup.InferType<
  ReturnType<typeof getOrdersFormSchema>
>;
