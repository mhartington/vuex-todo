<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>New Todo</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="create()">Create</ion-button>
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
} from "@ionic/vue";
import { defineComponent, PropType, onMounted, ref } from "vue";

interface Todo {
  title: string;
  note?: string;
  id: number;
}
export default defineComponent({
  name: "TodoModal",
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
    todo: Object as PropType<Todo>,
  },
  setup(props) {
    const localTodo = ref<Todo>({ title: "", note: "", id: Math.random() });
    onMounted(() => {
      const { todo } = props;
      if (todo) localTodo.value = { ...todo };
    });
    const create = () => {
      console.log(localTodo.value);
    };

    const close = async () => {
      await modalController.dismiss();
    };

    return { close, create, localTodo };
  },
});
</script>
