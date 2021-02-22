<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>New Todo</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="save()">Save</ion-button>
        <ion-button @click="close()">Dismiss</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="ion-padding">
      <h1>Add a new Todo Item</h1>
    </div>
    <ion-list>
      <ion-item>
        <ion-label position="stacked">Task</ion-label>
        <ion-input v-model="localTodo.title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Notes?</ion-label>
        <ion-textarea
          v-model="localTodo.note"
          placeholder="Enter any notes here..."
        ></ion-textarea>
      </ion-item>
    </ion-list>
  </ion-content>
</template>
<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButtons,
  IonButton,
  modalController,
} from '@ionic/vue';
import { defineComponent, PropType, onMounted, ref } from 'vue';
import { useStore, Todo, MUTATIONS } from '@/store';

export default defineComponent({
  name: 'TodoModal',
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButtons,
    IonButton,
  },
  props: {
    todo: {
      type: Object as PropType<Todo>,
      default: null,
    },
  },
  setup(props) {
    const store = useStore();
    const isEdit = ref(false);
    const localTodo = ref<Todo>({ title: '', note: '', id: Math.random() });

    onMounted(() => {
      const { todo } = props;
      if (Object.entries(todo).length !== 0) {
        localTodo.value = todo;
        isEdit.value = true;
      }
    });
    const close = () => modalController.dismiss();
    const save = () => {
      if (isEdit.value) {
        store.commit(MUTATIONS.EDIT_TODO, localTodo.value);
      } else {
        store.commit(MUTATIONS.ADD_TODO, localTodo.value);
      }
      close();
    };

    return { close, save, localTodo };
  },
});
</script>
