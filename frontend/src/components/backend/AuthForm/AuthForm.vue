<script setup lang="ts">
import { string, object } from 'zod';
import { useForm } from 'vee-validate';
import type { IFetchError } from 'ofetch';

const { setToken } = useTokenStore();

const isLoading = ref<boolean>(false);

const formSchema = toTypedSchema(
  object({
    username: string({ required_error: 'Поле не должно быть пустым' })
      .trim()
      .min(1, 'Поле не должно быть пустым'),
    password: string({ required_error: 'Поле не должно быть пустым' })
      .trim()
      .min(1, 'Поле не должно быть пустым'),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const { accessToken } = await $fetchSecure<{ accessToken: string }>('auth/signin', {
      method: 'POST',
      body: values,
    });
    setToken(accessToken);

    navigateTo('/dashboard/home');
  } catch (error) {
    isLoading.value = false;
    const err = (error as IFetchError<ResponseError>).data;

    throw createError({ message: err?.message, statusCode: err?.statusCode });
  }
});
</script>

<template>
  <UiCard class="auth-card">
    <UiCardHeader class="auth-card__header">
      <Logo class="auth-card__logo" />
      <UiCardTitle class="auth-card__title">Вход в систему</UiCardTitle>
      <UiCardDescription class="auth-card__description">
        электронного документооборота: полезные ресурсы и инструменты
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="auth-card__content">
      <form class="auth-card__form form" @submit="onSubmit">
        <div class="form__fields">
          <UiFormField v-slot="{ componentField }" name="username">
            <UiFormItem v-auto-animate="{ duration: 200 }" class="form__row">
              <div class="form__label">
                <UiFormLabel>Логин</UiFormLabel>
              </div>
              <div class="form__input">
                <UiFormControl>
                  <UiInput
                    type="text"
                    placeholder="Email или короткое имя"
                    v-bind="componentField"
                  />
                </UiFormControl>
              </div>
              <UiFormMessage class="form__error" />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="password">
            <UiFormItem v-auto-animate="{ duration: 200 }" class="form__row">
              <div class="form__label">
                <UiFormLabel>Пароль</UiFormLabel>
              </div>
              <div class="form__input">
                <UiFormControl>
                  <UiInput type="password" v-bind="componentField" />
                </UiFormControl>
              </div>
              <UiFormMessage class="form__error" />
            </UiFormItem>
          </UiFormField>
        </div>
        <div class="form__submit">
          <UiButton :loading="isLoading" type="submit" :disabled="isLoading">
            <span v-if="!isLoading">Войти</span>
            <span v-else>Пожалуйста подождите</span>
          </UiButton>
        </div>
      </form>
    </UiCardContent>
  </UiCard>
</template>

<style lang="scss">
.auth-card {
  @apply w-full min-w-60 max-w-80 font-lato;

  &__header {
    @apply flex flex-col items-center gap-1;
  }

  &__logo {
    @apply mb-1;
  }

  &__title {
    @apply text-2xl font-black;
  }

  &__description {
    @apply text-center;
  }

  &__form {
    @apply flex flex-col gap-10;

    & .from__fields {
      @apply flex flex-col gap-3;
    }

    & .form__row {
      @apply flex flex-col gap-2;
    }
  }
}
</style>
