let app = Vue.createApp({});

app.component("create-avatar", {
  data() {
    return {
      imgUrl: "",
      commanderName: "",
      isVisible: true,
    };
  },
  methods: {
    fetchAvatar() {
      cardName = this.$refs.commanderInput.value;

      fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`)
        .then((response) => response.json())
        .then((result) => {
          this.commanderName = result.name;
          this.imgUrl = result.image_uris.art_crop;
        })
        .catch((error) => console.log(error));
      this.toggleInput();
    },
    enterSearch(event) {
      if (event.key === "Enter") {
        this.fetchAvatar();
      }
    },
    toggleInput() {
      this.isVisible = !this.isVisible;
    },
  },
  template: `
  <div class="avatar-section">
  <input ref="commanderInput" class="avatar-input" type="text" @keydown="enterSearch" name="" v-if="isVisible" placeholder="Who's yo commander?"/>
  <img ref="avatarImg" class="avatar-img" :src="imgUrl" :alt="commanderName" @click="toggleInput">
  </div>
  `,
});

app.component("life-counter", {
  data() {
    return { counter: this.start };
  },
  methods: {
    lifeUp(n) {
      this.counter = this.counter + n;
    },
    lifeDown(n) {
      this.counter = this.counter - n;
    },
  },
  props: ["start"],
  template: `
        <div class="life-counter">
        <input class="life-button" type="button" value="-5" @click="lifeDown(5)" />
        <input class="life-button" type="button" value="-1" @click="lifeDown(1)"/>
        <p class="life-amount">{{counter}}</p>
        <input class="life-button" type="button" value="+1" @click="lifeUp(1)"/>
        <input class="life-button" type="button" value="+5" @click="lifeUp(5)"/>
        </div>`,
});

app.mount("#app");

// boh

/* let search = function () {
    cardName = document.getElementById("search").value;

    fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`)
      .then((response) => response.json())
      .then((data) => {
        //skapar en tom div med en klass
        const newCard = document
          .getElementById("counter-section")
          .appendChild(document.createElement("section"));
        newCard.classList.add(`commander-container`);

        const name = data.name;
        const img = data.image_uris.art_crop;
        newCard.innerHTML = `
                <img class="commander-img" src="${img}" alt="${name.toUpperCase()}">
                `;
      })
      .catch((error) => console.log(error));
    cardName = document.getElementById("search").value = "";
  };

  function enterSearch(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  document.getElementById("search").addEventListener("keydown", enterSearch); */
