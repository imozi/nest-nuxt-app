<script setup lang="ts">
import { string, object } from 'zod';
import { useForm } from 'vee-validate';
import type { IFetchError } from 'ofetch';

const { setToken } = useTokenStore();

const isLoading = ref<boolean>(false);

const formSchema = toTypedSchema(
  object({
    username: string({ required_error: 'Поле не должно быть пустым' }).trim().min(1, 'Поле не должно быть пустым'),
    password: string({ required_error: 'Поле не должно быть пустым' }).trim().min(1, 'Поле не должно быть пустым'),
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

    navigateTo('/home');
  } catch (error) {
    isLoading.value = false;
    const err = (error as IFetchError<ResponseError>).data;

    throw createError({ message: err?.message, statusCode: err?.statusCode });
  }
});
</script>

<template>
  <div class="auth auth-wrapper">
    <UiCard class="auth__card">
      <UiCardHeader class="auth__card-header">
        <Logo class="auth__card-logo" />
        <UiCardTitle class="auth__card-title">Вход в систему</UiCardTitle>
        <UiCardDescription class="auth__card-description">
          электронного документооборота: полезные ресурсы и инструменты
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="auth__card-content">
        <form class="form" @submit="onSubmit">
          <div class="form__fields">
            <UiFormField v-slot="{ componentField }" name="username">
              <UiFormItem v-auto-animate="{ duration: 200 }" class="form__row">
                <div class="form__label">
                  <UiFormLabel>Логин</UiFormLabel>
                </div>
                <div class="form__input">
                  <UiFormControl>
                    <UiInput type="text" placeholder="Email или короткое имя" v-bind="componentField" />
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
  </div>
</template>

<style lang="scss">
.auth {
  &-wrapper {
    @apply relative flex h-dvh items-center justify-center bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] p-5 [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] sm:p-10 sm:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)] lg:p-16;
  }

  &__card {
    @apply w-full min-w-60 max-w-80;

    &-header {
      @apply flex flex-col items-center gap-1;
    }

    &-logo {
      @apply mb-1;
    }

    &-title {
      @apply text-2xl font-black;
    }

    &-description {
      @apply text-center;
    }
  }

  & .form {
    @apply flex flex-col gap-10;

    &__fields {
      @apply flex flex-col gap-3;
    }

    &__row {
      @apply flex flex-col gap-2;
    }
  }
}
</style>
