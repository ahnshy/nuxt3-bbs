<template>
  <div>
    <md-table v-model="source" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-toolbar-section-start">{{ $t('home.articleTitle') }}</h1>
      </md-table-toolbar>

      <md-table-empty-state md-label="No article found">
        <md-button class="md-primary md-raised" @click="$emit('add-article', true)">{{ $t('button.createNewArticle') }}</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell :md-label="$t('table.title')">{{ item.title }}</md-table-cell>
        <md-table-cell :md-label="$t('table.author')">{{ item.author }}</md-table-cell>
        <md-table-cell :md-label="$t('table.email')">{{ item.email }}</md-table-cell>
        <md-table-cell :md-label="$t('table.viewCount')">{{ item.viewCount }}</md-table-cell>
        <md-table-cell :md-label="$t('table.updatedDate')">{{ item.updatedDate }}</md-table-cell>
      </md-table-row>
    </md-table>
    <no-ssr>
      <table-pagination
        :total-page="totalPage"
        :row-per-page="rowPerPage"
        :label="$t('table.rowPerPage')"
        :page-number="pageNumber"
        @updateRow="setRowPerPage"
        @goPrev="goPrevPage"
        @goNext="goNextPage"/>
    </no-ssr>
    <md-snackbar :md-position="'center'" :md-duration="5000" :md-active.sync="showSnackbar" md-persistent>
      <div>
        <md-button class="md-icon-button md-primary" @click="editData">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button class="md-icon-button md-primary" @click="viewData">
          <md-icon>pageview</md-icon>
        </md-button>
        <md-button class="md-icon-button md-primary" @click="deleteData">
          <md-icon>delete</md-icon>
        </md-button>
        <span class="action-item-title">{{ selectedArticle }}</span>
      </div>
      <md-button class="md-primary" @click="showSnackbar = false">{{ $t('button.close') }}</md-button>
    </md-snackbar>
  </div>
</template>

<script>
export default {
  name: "BbsList",
  props: {
    source: {
      type: [Array, Object],
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    },
    mdPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      selected: [],
      showSnackbar: false,
      rowPerPage: 5,
      pageNumber: 1
    }
  },
  computed: {
    selectedArticle: function() {
      return this.selected ? this.selected.title : ""
    }
  },
  methods: {
    onSelect(items) {
      if (items) {
        this.selected = items
      }
      this.showSnackbar = true
    },
    deleteData() {
      this.$emit("delete-item", this.selected)
      this.showSnackbar = false
    },
    editData() {
      this.$emit("edit-item", this.selected)
      this.showSnackbar = false
    },
    viewData() {
      this.$emit("view-item", this.selected)
      this.showSnackbar = false
    },
    setRowPerPage(rowNum) {
      this.rowPerPage = rowNum
      this.pageNumber = 1
      this.$emit("paging", { page: this.pageNumber, limit: this.rowPerPage })
    },
    goPrevPage(page) {
      this.pageNumber = page
      this.$emit("paging", { page: this.pageNumber, limit: this.rowPerPage })
    },
    goNextPage(page) {
      this.pageNumber = page
      this.$emit("paging", { page: this.pageNumber, limit: this.rowPerPage })
    }
  }
}
</script>

<style lang="scss">
.md-snackbar-content .md-button {
  margin: -8px -8px -8px 0;
}

.md-snackbar-content .md-button + .md-button {
  margin-left: 0;
}

.action-item-title {
  color: #ff5252;
  line-height: 24px;
  text-transform: uppercase;
}
</style>
