<template>
  <div class="md-table-pagination">
    <span class="md-table-pagination-label">{{ label }}</span>

    <md-field>
      <md-select v-model="rowNum" md-dense md-class="md-pagination-select" @md-selected="setRowPerPage">
        <md-option v-for="number in listOptions" :key="number" :value="number">{{ number }}</md-option>
      </md-select>
    </md-field>

    <span>{{ currentPage }}/{{ totalPage }}</span>

    <md-button :disabled="currentPage === 1" class="md-icon-button md-table-pagination-previous" @click="goToPrev()">
      <md-icon>keyboard_arrow_left</md-icon>
    </md-button>

    <md-button :disabled="currentPage === totalPage" class="md-icon-button md-table-pagination-next" @click="goToNext()">
      <md-icon>keyboard_arrow_right</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: "TablePagination",
  props: {
    listOptions: {
      type: Array,
      default: () => [5, 10, 15, 20]
    },
    totalPage: {
      type: Number,
      required: true
    },
    pageNumber: {
      type: Number,
      required: true
    },
    rowPerPage: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      currentPage: this.pageNumber ? this.pageNumber : 1,
      rowNum: this.rowPerPage ? this.rowPerPage : 5
    }
  },
  watch: {
    pageNumber: function(val) {
      this.currentPage = val
    }
  },
  methods: {
    setRowPerPage: function(e) {
      this.$emit("updateRow", e)
    },
    goToPrev: function() {
      this.currentPage--
      this.$emit("goPrev", this.currentPage)
    },
    goToNext: function() {
      this.currentPage++
      this.$emit("goNext", this.currentPage)
    }
  }
}
</script>

<style lang="scss">
.md-table-pagination {
  height: 56px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid;
  font-size: 12px;

  .md-table-pagination-previous {
    margin-right: 2px;
    margin-left: 18px;
  }

  .md-field {
    width: 48px;
    min-width: 36px;
    margin: -16px 24px 0 32px;

    &:after,
    &:before {
      display: none;
    }

    .md-select-value {
      font-size: 13px;
    }
  }
}

.md-menu-content.md-pagination-select {
  max-width: 82px;
  min-width: 56px;
  margin-top: 5px;
}
</style>
