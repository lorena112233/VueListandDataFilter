 <!-- 
- an image of the consultant,
- their fullname,
- specialties,
- locations 
- and their consultant type.

+ There should be a button that allows a user to sort the consultants by name
(ascending/descending). 
+ If time permits the user could search/filter by consultant name etc.
-->


<template>
  <div id="">
    
    <section class="container-fluid" style="margin-top: 80px">
      <!-- Bar containing all sort inputs -->
      <!-- TODO -->
      <!-- <Filters :event="this.items" /> -->
      <div class="row pt-4" id="sort-bar">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control"
            v-model="searchValue"
            placeholder="Search Consultant"
            id="search-input"
          />
          <i class="fa fa-search"></i>
        </div>
        <div class="container-fluid p-4">
          <div class="row col-md-6">
            <select
              class="col-md-6 form-control"
              name="sortBy"
              id="select"
              v-model="sortBy"
            >
              <option value="byName">Sort By Name</option>
              <option value="bySpecialty">Sort By Specialty</option>
            </select>
          </div>
          <div class="row col-md-6 pt-2">
            <button-custom
              v-on:click="ascending = !ascending"
              class="btn btn-primary sort-button col-2"
              type="outline"
            >
              <i v-if="ascending" class="fa fa-sort-up">Z-A</i>
              <i v-else class="fa fa-sort-down">A-Z</i></button-custom
            >
          </div>
        </div>
      </div>

      <!-- Display DATA: array of consultants get rendered as cards -->
      <div id="results-container" class="row">
        <h2 class="header mt-4 mb-4">
          Results: {{ filteredConsultants.length }}
        </h2>
        <div
          class="card col-lg-4 col-md-6 mb-1"
          v-for="consultant in filteredConsultants"
          :key="consultant.id"
        >
          <Card :event="consultant" />


        </div>
      </div>
    </section>

    <PubLayout />
  </div>
</template>
<script>
import PubLayout from "./components/layouts/StdLayout";
// import Filters from "./components/Filters.vue";
import Card from "./components/Card.vue";
import APITestService from "./services/Api.js";

const APITestServ = new APITestService();
export default {
  name: "#app",
  components: { PubLayout, Card },
  data() {
    return {
      items: [],

      items_count: 0,

      formUpdate: false,
      // -------------
      ascending: true,
      sortBy: "byName",
      searchValue: "",
    };
  },
  methods: {
    async getDataAction() {
      const response = await APITestServ.getTestByID();

      this.items = response.data.Data;
    },
  },
  created() {
    // GET request using fetch with error handling
    fetch(
      "https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=sR_cCweEaptts3ExMPzv&page=1&per_page=20"
    )
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.items_count = data.record_count;
        this.items = data.records.page;
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error("There was an error!", error);
      });
  },
  computed: {
    filteredConsultants() {
      let tempConsultants = this.items;

      // Process search input
      if (this.searchValue != "" && this.searchValue) {
        
        tempConsultants = tempConsultants.filter((item) => {
          return item.fullname
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }

      // Sort by Fullname: alphabetical order (asc - desc)
      tempConsultants = tempConsultants.sort((a, b) => {
        if (this.sortBy == "byName") {
          let fa = a.lastname.toLowerCase(),
            fb = b.lastname.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;

          // Sort by Specialty
        } else if (this.sortBy == "bySpecialty") {
          let fa = a.specialties ? a.specialties : "";
          let fb = b.specialties ? b.specialties : "";

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
      });

      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        tempConsultants.reverse();
      }

      return tempConsultants;
    },
  },
};
</script>


<style>
.text-left {
  text-align: left;
}
.text-left {
  text-align: right;
}
#results-container div.card.mb-1 {
  border-color: transparent;
}
.card.h-100 {
  border-color: #00a200;
}
.card-body.row {
  min-height: 250px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
