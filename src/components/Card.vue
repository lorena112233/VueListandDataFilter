<template>
  <!-- Link to profile details  -->
  <!-- <router-link
		class="event-link"
		:to="{
			name: 'About',
			params: { id: event.id }
		}"
	> -->

  <!-- 1 Main Container -->
  <div class="card h-100">
    <!-- 1.1 - Title -->
    <div class="card-header">
      <h5 class="card-title">{{ event.fullname }} ({{ event.type }})</h5>
    </div>

    <!-- 1.2 Body -->
    <div class="card-body row">
      <!-- 1.2.1 Col(1) - img container -->
      <div
        v-if="
          event.image !=
          'https://www.nuffieldhealth.com/_image/thumbnail/240x250%5E/?url='
        "
        class="col-lg-5 col-md-6"
        style="text-align: left"
      >
        <img :src="event.image" class="card-img-top profilePicture" />
      </div>
      <div v-else class="col-lg-5 col-md-6" style="text-align: left">
        <img
          src="../assets/profilePicDefault.png"
          class="card-img-top profilePictureEmpty"
          style="border: none"
        />
      </div>

      <!-- 1.2.2 Col(2) - img container -->
      <div class="col-lg-7 col-md-6" style="text-align: left">
        <!-- 1.2.2.1 Specialties -->
        <div class="specialtiesContainer">
          <div v-if="Array.isArray(event.specialties)">
            <h5>Specialties</h5>
            <p v-for="(val, index) in event.specialties" :key="index">
              <img class="icon" src="../assets/icons/first-aid-kit.png" />
              {{ val }}
            </p>
          </div>

          <div v-else-if="event.specialties">
            <h5>Specialties</h5>
            <p>
              <img class="icon" src="../assets/icons/first-aid-kit.png" />
              {{ event.specialties }}
            </p>
          </div>
        </div>

        <!-- 1.2.2.2 Location -->
        <div class="locationsContainer">
          <div v-if="Array.isArray(event.locations)">
            <h5 style="border-top: lightgrey thin solid; padding-top: 10px">
              Locations
            </h5>

            <div v-for="(val, index) in event.locations" :key="index">
              <img class="icon" src="../assets/icons/pin.png" />
              <p>{{ val }}</p>
            </div>
          </div>
          <div v-else-if="event.locations">
            <h5 style="border-top: lightgrey thin solid; padding-top: 10px">
              Locations
            </h5>
            <img class="icon" src="../assets/icons/pin.png" />
            <p>{{ event.locations }}</p>
          </div>
        </div>
      </div>

      <!-- 1.2.3 Row - Bookable -->
      <div
        v-if="event.bookable != 'false'"
        class="row w-100 pt-1"
        style="align-content: flex-end; justify-content: right"
      >
        <button-custom class="col-sm-6" type="outline">Book</button-custom>
      </div>
    </div>

    <!-- 1.3 Footer -->
    <div class="card-footer text-muted">
      Last Updated:&nbsp;{{ event.updated_at.split("T")[0] }}
    </div>
  </div>
  <!-- </router-link> -->
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      status: this.event,
    };
  },
  computed: {},
};
</script>
