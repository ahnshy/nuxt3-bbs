<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h1>{{ modalTitle }}</h1>
          </div>

          <div class="modal-body">
            <md-field :class="{ 'md-invalid': errors.title }">
              <label>{{ $t('modal.title') }}</label>
              <md-input v-model="source.title"/>
              <span class="md-error">{{ errors.title }}</span>
            </md-field>
            <md-field :class="{ 'md-invalid': errors.author }">
              <label>{{ $t('modal.author') }}</label>
              <md-input v-model="source.author"/>
              <span class="md-error">{{ errors.author }}</span>
            </md-field>
            <md-field :class="{ 'md-invalid': errors.email }">
              <label>{{ $t('modal.email') }}</label>
              <md-input v-model="source.email"/>
              <span class="md-error">{{ errors.email }}</span>
            </md-field>
            <md-field :class="{ 'md-invalid': errors.content }">
              <label>{{ $t('modal.content') }}</label>
              <md-textarea v-model="source.content"/>
              <span class="md-error">{{ errors.content }}</span>
            </md-field>
          </div>

          <div class="modal-footer">
            <md-button @click="$emit('close-modal')">
              {{ $t('button.close') }}
            </md-button>
            <md-button @click="submitData">
              {{ modalTitle }}
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalArticl",
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      errors: {},
      errMessage: {
        title: this.$t("error.requiredTitle"),
        author: this.$t("error.requiredAuthor"),
        email: this.$t("error.requiredEmail"),
        invalidEmail: this.$t("error.invalidEmailFormat"),
        content: this.$t("error.requiredContent")
      }
    }
  },
  computed: {
    modalTitle: function() {
      return this.source._id
        ? this.$t("modal.updateArticle")
        : this.$t("modal.addArticle")
    }
  },
  methods: {
    submitData: function() {
      if (this.isFormValid(this.source)) {
        const data = {
          title: this.source.title,
          author: this.source.author,
          email: this.source.email,
          content: this.source.content,
          viewCount: this.source.viewCount
        }

        if (this.source._id) {
          data._id = this.source._id
        }
        this.$emit("submit-article", data)
      }
    },
    isFormValid: function({ title, author, email, content }) {
      this.errors = {}
      if (!title) {
        this.errors["title"] = this.errMessage.title
      }

      if (!author) {
        this.errors["author"] = this.errMessage.author
      }

      if (!email) {
        this.errors["email"] = this.errMessage.email
      } else if (!this.validEmail(email)) {
        this.errors["email"] = this.errMessage.invalidEmail
      }

      if (!content) {
        this.errors["content"] = this.errMessage.content
      }

      if (
        this.errors.title ||
        this.errors.author ||
        this.errors.email ||
        this.errors.content
      ) {
        return false
      }

      return true
    },
    validEmail: function(email) {
      const emailPattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return emailPattern.test(email)
    }
  }
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
