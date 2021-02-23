import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, MutationTree, ActionTree, } from 'vuex';

// interfaces for our State and todos
export type Todo = { id: number; title: string; note?: string };
export type State = { todos: Todo[] };

export const key: InjectionKey<Store<State>> = Symbol();
const state: State = {
  todos: [
    { title: 'Learn Vue', note: 'https://v3.vuejs.org/guide/introduction.html', id: 0, },
    { title: 'Learn TypeScript', note: 'https://www.typescriptlang.org', id: 1, },
    { title: 'Learn Vuex', note: 'https://next.vuex.vuejs.org', id: 2 },
  ],
};

/*
 * Mutations
 * How we mutate our state.
 * Mutations must be synchronous
 */
export const enum MUTATIONS {
  ADD_TODO =  'ADD_TODO',
  DEL_TODO =  'DEL_TODO',
  EDIT_TODO = 'EDIT_TODO'
}
const mutations: MutationTree<State> = {
  [MUTATIONS.ADD_TODO](state, newTodo: Todo) {
    state.todos.push({ ...newTodo });
  },
  [MUTATIONS.DEL_TODO](state, todo: Todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },
  [MUTATIONS.EDIT_TODO](state, todo: Todo) {
    state.todos.splice(state.todos.indexOf(todo), 1, todo);
  },
};

/*
 * Actions
 * Perform async tasks, then mutate state
 */

export const enum ACTIONS { ADD_RND_TODO = 'ADD_RND_TODO' }
const actions: ActionTree<State, any> = {
  [ACTIONS.ADD_RND_TODO](store) {
    fetch('https://fakerapi.it/api/v1/texts?_quantity=1')
      .then((res) => res.json())
      .then(({ data }) => {
        const newTodo: Todo = {
          title: data[0].title,
          id: Math.random(),
          note: data[0].content,
        };
        store.commit(MUTATIONS.ADD_TODO, newTodo);
      });
  },
};

export const store = createStore<State>({ state, mutations, actions });

// our own useStore function for types
export function useStore() {
  return baseUseStore(key);
}
