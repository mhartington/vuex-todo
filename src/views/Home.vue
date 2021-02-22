<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Todo</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openModal()">
            <ion-icon :icon="add" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button @click="randomTodo()">
            <ion-icon :icon="help" slot="icon-only"></ion-icon>
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
        <ion-item-sliding v-for="todo in store.state.todos" :key="todo.id">
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
import { add, checkmark, help } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import Modal from '../components/Modal.vue';
import { useStore, Todo, MUTATIONS, ACTIONS } from '../store';
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
    const store = useStore();
    const randomTodo = () =>  store.dispatch(ACTIONS.ADD_RND_TODO)
    const openModal = async (todo: Todo | null = null) => {
      const modal = await modalController.create({
        component: Modal,
        componentProps: { todo: { ...todo } },
      });
      return await modal.present();
    };
    const complete = (todo: Todo) => {
      listEl.value.$el.closeSlidingItems();
      store.commit(MUTATIONS.DEL_TODO, todo);
    };
    return { add, openModal, complete, checkmark, listEl, store, help, randomTodo};
  },
});
</script>
