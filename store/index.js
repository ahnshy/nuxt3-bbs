import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)

const API_URL = "http://localhost:3000/api"

const createStore = () => {
  return new Vuex.Store({
    state: {
      articleList: [],
      pageCount: null,
      detailArticle: {},
      showErrModal: false,
      serverErr: null,
      locales: ["en", "vn"],
      locale: "en"
    },
    actions: {
      LOAD_ARTICLE_LIST: async function(
        { commit },
        query = { page: 1, limit: 5 }
      ) {
        try {
          const { data } = await axios.get(
            `${API_URL}/articles?page=${query.page}&limit=${query.limit}`
          )
          commit("SET_ARTICLE_LIST", { list: data })
        } catch (err) {
          commit("SET_SHOW_ERR", "Cannot get Article list")
        }
      },
      LOAD_AN_ARTICLE: async function({ commit }, id) {
        try {
          const { data } = await axios.get(`${API_URL}/article/${id}`)
          commit("SET_DETAIL_ARTICLE", data)
        } catch (err) {
          commit("SET_SHOW_ERR", `Cannot get Article with id ${id}`)
        }
      },
      POST_NEW_ARTICLE: function({ commit, dispatch }, data) {
        console.warn(data)
        axios
          .post(`${API_URL}/article`, data)
          .then(() => {
            dispatch("LOAD_ARTICLE_LIST")
          })
          .catch(() => {
            commit("SET_SHOW_ERR", `Cannot create new article`)
          })
      },
      UPDATE_AN_ARTICLE: function({ commit, dispatch }, data) {
        axios
          .put(`${API_URL}/article/${data._id}`, data)
          .then(() => {
            dispatch("LOAD_ARTICLE_LIST")
          })
          .catch(() => {
            commit("SET_SHOW_ERR", `Cannot edit article id ${data._id}`)
          })
      },
      DELETE_AN_ARTICLE: function({ commit, dispatch }, id) {
        axios
          .delete(`${API_URL}/article/${id}`)
          .then(() => {
            dispatch("LOAD_ARTICLE_LIST")
          })
          .catch(() => {
            commit("SET_SHOW_ERR", `Cannot delete article id ${id}`)
          })
      },
      SET_VIEW_ARTICLE: function({ commit }, id) {
        commit("UPDATE_VIEW_ARTICLE", id)
      },
      SET_HIDE_ERR: function({ commit }) {
        commit("SET_HIDE_ERR")
      }
    },
    mutations: {
      SET_ARTICLE_LIST: (state, { list }) => {
        state.articleList = list.data
        state.pageCount = list.pageCount
      },
      SET_DETAIL_ARTICLE: (state, article) => {
        state.detailArticle = article
      },
      SET_SHOW_ERR: (state, text) => {
        state.showErrModal = true
        state.serverErr = text
      },
      SET_HIDE_ERR: state => {
        state.showErrModal = false
        state.serverErr = null
      },
      SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      }
    },
    getters: {
      articleList: state => {
        return state.articleList
      },
      totalPage: state => {
        return state.pageCount
      },
      detailArticle: state => {
        return state.detailArticle
      },
      isServerErr: state => state.showErrModal,
      serverErrMessage: state => state.serverErr
    }
  })
}

export default createStore
