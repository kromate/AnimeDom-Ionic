import "firebase/firestore";
import "firebase/auth";

/* eslint-disable */
import { createStore } from 'vuex'
import firebase from "firebase/app";

export default createStore({
  state: {
    menu:false,
    desc: null,
    selectedSavedAnime:{},
    homeCategoryView:"",
    homeCategoryViewLink:"",
    recentAnimeList:[],
    popularAnimeList:[],
    searchAnimeList:[],
    genreAnimeList:[],
    genresAnimeList:[],
    saved:[],
    SavedAnimes:[],
    SavedAnimesLoading:[],
    savedLoading:false,
    authModal: false,
    successModal: false,
    errorModal: false,
    searchTitle:"",
    user: JSON.parse(localStorage.getItem('user')),
  },
  mutations: {

    changeSavedLoading(state, payload){
      state.savedLoading = payload
    },
    changeErrorModal(state, payload){
      state.errorModal = payload
    },
    changeSuccessModal(state, payload){
      state.successModal = payload
    },
    changeAuthModal(state, payload){
      state.authModal = payload
    },

    selectedSavedAnime(state, payload){
      state.selectedSavedAnime = payload
    },

  loginUser(state, payload){
    state.user = payload
    localStorage.setItem('user', JSON.stringify(payload));
  },
    logOut(state){
      state.user = null
    localStorage.setItem('user', null);
    location.reload()
    },
    addGenresAnimeList(state, data){
      state.genresAnimeList = data
    },
    addGenreAnimeList(state, data){
      state.genreAnimeList = data
    },
    changeSearchTitle(state, data){
      state.searchTitle = data
    },
    addSearchAnimeList(state, data){
      state.searchAnimeList = data
    },
    addPopularAnimeList(state, data){
      state.popularAnimeList = data
    },
    addRecentAnimeList(state, data){
      state.recentAnimeList = data
    },
    changeMenu(state){
      const mobileCheck = ()=> {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
     
        ];
    
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }
      if(mobileCheck){
        state.menu = !state.menu
      }else{
        return null
      }
      
    },

    addsearchedRes(state, data) {
      state.searchArray = data;
    },
    updateDesc(state, data) {
      state.desc = data;
    },
    changeHomeCategoryView(state, payload){

      state.homeCategoryView = payload.name
      state.homeCategoryViewLink = payload.link
    },
  },
  actions: {
    async getSavedAnimes(context){
      context.state.SavedAnimes = [];
      context.state.SavedAnimesLoading = true
      const collection = firebase.firestore().collection("users");
      collection
        .doc(context.state.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            context.state.SavedAnimes = doc.data().saved;
            context.state.SavedAnimesLoading = false
          } else {
            context.state.SavedAnimesLoading = false
            console.log("Not Found");
          }
        });
    },
    async saveAnime(context){
      context.commit('changeSavedLoading', true)
      const collection = firebase.firestore().collection("users")
      const user = await collection.doc(context.state.user.uid).get().catch((err)=>{
        console.log(err);
        context.commit("changeErrorModal", true);
      })
      if(user.exists){
        collection
        .doc(firebase.auth().currentUser.uid)
        .update({
          saved:firebase.firestore.FieldValue.arrayUnion(context.state.selectedSavedAnime)}).then(()=>{
            context.commit('changeSavedLoading', false)
            context.commit('changeSuccessModal', true)
        }).catch((err)=>{
          context.commit("updateLoading", false);
          context.commit("changeErrorModal", true);
          console.log(err);
          context.commit("Error");
        })
      }else{
        const data =   {
          id: context.state.user.uid,
          email: context.state.user.email,
          saved: [context.state.selectedSavedAnime],
          playlist: [],

        }
        collection
        .doc(firebase.auth().currentUser.uid).set(data).then(()=>{
          context.commit('changeSavedLoading', false)
          context.commit('changeSuccessModal', true)
        }).catch((err)=>{
          context.commit("changeErrorModal", true);
          console.log(err);
          context.commit("Error");
        })
      }
    },
    async delAnime(context){
      context.commit('changeSavedLoading', true)
      const collection = firebase.firestore().collection("users")
      const user = await collection.doc(context.state.user.uid).get().catch((err)=>{
        console.log(err);
        context.commit("changeErrorModal", true);
      })
        collection
        .doc(firebase.auth().currentUser.uid)
        .update({
          saved:firebase.firestore.FieldValue.arrayRemove(context.state.selectedSavedAnime)}).then(()=>{
            context.commit('changeSavedLoading', false)
            context.commit('changeSuccessModal', true)
        }).catch((err)=>{
          context.commit("updateLoading", false);
          context.commit("changeErrorModal", true);
          console.log(err);
          context.commit("Error");
        })

    },
  },
  modules: {
  }
})
