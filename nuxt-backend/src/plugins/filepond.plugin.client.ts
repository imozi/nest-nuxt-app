import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import ru_Ru from 'filepond/locale/ru-ru';
import { setOptions } from 'filepond';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const FilePondComponent = vueFilePond(FilePondPluginFileValidateType);
    setOptions(ru_Ru);

    nuxtApp.vueApp.component('FilePondComponent', FilePondComponent as Component);
  }
});
