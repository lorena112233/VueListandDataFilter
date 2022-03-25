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
    <section class="container-fluid" style="margin-top: 80px;">
      <!-- Bar containing all sort inputs -->
      <div class="row" id="sort-bar">
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
        <div
          class="col-md-5 container-fluid d-inline-flex row pb-2"
          style="flex-flow: row"
        >
          <!-- <label for="select">Choose a car:</label> -->
          <select
            class="form-control col-6"
            name="sortBy"
            id="select"
            v-model="sortBy"
          >
            <option value="byName">Sort By Name</option>
            <option value="bySpecialty">Sort By Specialty</option>
          </select>
          <button
            v-on:click="ascending = !ascending"
            class="btn btn-primary sort-button col-2"
          >
            A-Z
            <i v-if="ascending" class="fa fa-sort-up"></i>
            <i v-else class="fa fa-sort-down"></i>
          </button>
        </div>

        <!-- <input type="number" v-model="maxCookingTime" id="cooking-time-input" /> -->
      </div>

      <!-- Where the array of recipes get rendered as cards -->
      <div id="results-container" class="row">
        <h2 class="header">Results: {{ filteredConsultants.length }}</h2>
        <div
          class="card col-lg-4 col-md-6 mb-1"
          v-for="consultant in filteredConsultants"
          :key="consultant.id"
        >
          <div class="card h-100">
            <!-- Title -->
            <div class="card-header">
              <h5 class="card-title">
                {{ consultant.fullname }} ({{ consultant.type }})
              </h5>
            </div>

            <!-- profile picture -->
            <div class="card-body row">
              <div
                v-if="
                  consultant.image !=
                  'https://www.nuffieldhealth.com/_image/thumbnail/240x250%5E/?url='
                "
                class="col-lg-5 col-md-6"
                style="text-align: left"
              >
                <img
                  :src="consultant.image"
                  class="card-img-top profilePicture"
                />
              </div>
              <div v-else class="col-lg-5 col-md-6" style="text-align: left">
                <img
                  src="./assets/null.png"
                  class="card-img-top profilePicture"
                  style="border: none"
                />
              </div>

              <!-- Specialties -->
              <div class="col-lg-7 col-md-6" style="text-align: left">
                <div class="specialtiesContainer">
                  <h5>Specialties</h5>

                  <div v-if="Array.isArray(consultant.specialties)">
                    <p
                      v-for="(val, index) in consultant.specialties"
                      :key="index"
                    >
                      <img class="icon" src="./assets/first-aid-kit.png" />
                      {{ val }}
                    </p>
                  </div>

                  <div v-else-if="consultant.specialties">
                    <p>
                      <img class="icon" src="./assets/first-aid-kit.png" />
                      {{ consultant.specialties }}
                    </p>
                  </div>
                </div>

                <div class="locationsContainer">
                  <div v-if="Array.isArray(consultant.locations)">
                    <h5
                      style="
                        border-top: lightgrey thin solid;
                        padding-top: 10px;
                      "
                    >
                      Locations
                    </h5>

                    <div
                      v-for="(val, index) in consultant.locations"
                      :key="index"
                    >
                      <img class="icon" src="./assets/pin.png" />
                      <p>{{ val }}</p>
                    </div>
                  </div>
                  <div v-else-if="consultant.locations">
                    <h5
                      style="
                        border-top: lightgrey thin solid;
                        padding-top: 10px;
                      "
                    >
                      Locations
                    </h5>
                    <img class="icon" src="./assets/pin.png" />
                    <p>{{ consultant.locations }}</p>
                  </div>
                </div>
              </div>

              <div
                v-if="consultant.bookable"
                class="row w-100 pt-1"
                style="align-content: flex-end; justify-content: right"
              >
                <button-custom class="col-sm-6" type="outline"
                  >Book</button-custom
                >
              </div>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
            <div class="card-footer text-muted">
              Last Updated:&nbsp;{{ consultant.updated_at.split("T")[0] }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <PubLayout />
  </div>
</template>
<script>
import PubLayout from "./components/layouts/StdLayout";
import APITestService from "./services/TestService.js";

const APITestServ = new APITestService();
export default {
  name: "#app",
  components: { PubLayout },
  data() {
    return {
      items: [],
      items2: [],
      items_count: 0,
      info: [],
      errors: [],
      myItems: {},
      selectedSettingName: "",
      enteredSearchName: "",
      enteredSearchGroup: "",
      settings: [],
      // Show or hide update form
      formUpdate: false,
      // -------------
      ascending: true,
      sortBy: "byName",
      searchValue: "",
    };
  },
  methods: {
    async getDataAction() {
      console.log("1 - this.items", this.items);
      const response = await APITestServ.getTestByID();
      console.log("response  //   ", response);
      this.items = response.data.Data;
      console.log("2 - items  //   ", this.items[0]);
    },
  },
  created() {
    // this.getDataAction();
    // fetch('https://search-api.swiftype.com/api/v1/public/engines/search.json?engine_key=sR_cCweEaptts3ExMPzv&page=1&per_page=20')
    // .then(res => res.json())
    // .then(data => this.items = data)
    // .catch(err => console.log(err.message))

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
        // this.myItems = data.records.page.specialties;

        for (var i = 0; i < this.items_count; i++) {
          var specialties = this.items[i].specialties;
          var hasSpecialties = [];

          if (specialties == null) {
            // your code here.
            specialties = hasSpecialties;
          } else {
            if (specialties[0].length == 1) {
              hasSpecialties.push({
                specialties,
              });
            } else {
              hasSpecialties = specialties;
            }

            // console.log("specialties ", specialties);
            // console.log("specialties ", specialties.length);
            // console.log(specialties[0].length, specialties[0]);
          }

          this.myItems["ID"] = this.items[i].id;
          this.myItems["Specialties"] = hasSpecialties;
          this.myItems["LastUpdated"] = this.items[i].updated_at.split("T")[0];
          this.items2.push(this.myItems);

          // this.myItems.push({
          //   Id: this.items[i].id,
          //   Specialties: hasSpecialties,
          //   LastUpdated: this.items[i].updated_at.split("T")[0]
          // });
        }

        console.log("--- DATA  ---", data);
        console.log("---this.items ---", this.items);
        console.log("---this.2 ---", this.items2);
        console.log("---New Array (myItems) ---", this.myItems);
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
          let fa = a.fullname.toLowerCase(),
            fb = b.fullname.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;

          // Sort by Specialty
        } else if (this.sortBy == "bySpecialty") {
          // return a.cookingTime - b.cookingTime;
          let fa = a.lastname.toLowerCase(),
            fb = b.lastname.toLowerCase();

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
#results-container div.card.mb-1 {
  border-color: transparent;
}
.card.h-100 {
  border-color: #00a200;
}
.card-body.row {
  min-height: 250px;
}
img {
  border: solid 6px #005c6b;
}

img.icon {
  margin: 6px;
  height: 25px;
  width: 25px;
  border: none;
}

.profilePicture {
  background-image: url("../src/assets/null.png");
  /* width: 100px;
  height: 100px; */
  max-width: 100%;
  max-height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
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

.card-img-top {
  width: 100%;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}

img {
  max-width: 250px;
}
</style>
