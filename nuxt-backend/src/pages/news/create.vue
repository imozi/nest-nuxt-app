<template>
  <UiCard>
    <UiCardHeader class="pb-2">
      <UiCardTitle class="text-2xl">Название новости</UiCardTitle>
      <UiCardDescription> Описание новости </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="flex flex-col gap-y-2">
      <UiFormField v-slot="{ componentField }" name="title">
        <UiFormItem>
          <UiFormLabel>Заголовок</UiFormLabel>

          <UiFormControl>
            <UiInput type="text" placeholder="Заголовок" v-bind="componentField" />
          </UiFormControl>

          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiFormField v-slot="{ componentField }" name="slug">
        <UiFormItem>
          <UiFormLabel>Алиас (ЧПУ)</UiFormLabel>

          <UiFormControl>
            <UiInput type="text" placeholder="алиас" v-bind="componentField" />
          </UiFormControl>

          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
    </UiCardContent>
  </UiCard>
</template>
