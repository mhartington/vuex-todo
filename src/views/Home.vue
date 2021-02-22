<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Todo</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openModal()">
            <ion-icon :icon="add" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Todo</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list ref="listEl">
        <ion-item-sliding v-for="todo in todos" :key="todo.id">
          <ion-item @click="openModal(todo)">
            <ion-label>{{ todo.title }}</ion-label>
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option @click="complete(todo)">
              <ion-icon slot="icon-only" :icon="checkmark"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  modalController,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
} from '@ionic/vue';
import { add, checkmark } from 'ionicons/icons';
import { defineComponent, ref, toRaw } from 'vue';
import Modal from '../components/Modal.vue';
export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
  },
  setup() {
    const listEl = ref();
    const todos = ref([
      {
        title: 'Learn Vue',
        note: 'https://v3.vuejs.org/guide/introduction.html',
        id: 0,
      },
      {
        title: 'Learn TypeScript',
        note: 'https://www.typescriptlang.org',
        id: 1,
      },
      { title: 'Learn Vuex', note: 'https://next.vuex.vuejs.org', id: 2 },
    ]);
    const openModal = async (todo = null) => {
      const modal = await modalController.create({
        component: Modal,
        componentProps: { todo },
      });
      await modal.present();
    };
    const complete = (todo: any) => {
      listEl.value.$el.closeSlidingItems();
      todos.value = todos.value.filter(t => t.id !== todo.id)
    };
    return { add, openModal, todos, complete, checkmark, listEl };
  },
});
</script>
