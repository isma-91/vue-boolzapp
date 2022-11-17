/*Milestone 1
● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
dall’interlocutore (bianco) assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
nome e immagine di ogni contatto

Milestone 2
● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
messaggi relativi al contatto attivo all’interno del pannello della conversazione
● Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3 (rivedere esercizio lista todo e settimeout che servirà per la risposta)
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4 (rivedere esercizio FontIcons, forse serve qualche filter o roba simile)
● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
“mar” rimangono solo Marco e Martina)

Milestone 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato */

const app = new Vue({
  el: "#root",
  data: {
    contacts: [
      {
        name: "Michele",
        avatar: "avatar_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Ricordati di stendere i panni",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            message: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "avatar_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "avatar_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            message: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro B.",
        avatar: "avatar_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro L.",
        avatar: "avatar_5",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ricordati di chiamare la nonna",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Va bene, stasera la sento",
            status: "received",
          },
        ],
      },
      {
        name: "Claudia",
        avatar: "avatar_6",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao Claudia, hai novità?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Non ancora",
            status: "received",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "Nessuna nuova, buona nuova",
            status: "sent",
          },
        ],
      },
      {
        name: "Federico",
        avatar: "avatar_7",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Fai gli auguri a Martina che è il suo compleanno!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Grazie per avermelo ricordato, le scrivo subito!",
            status: "received",
          },
        ],
      },
      {
        name: "Davide",
        avatar: "avatar_8",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao, andiamo a mangiare la pizza stasera?",
            status: "received",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "OK!!",
            status: "received",
          },
        ],
      },
    ],
    activeIndex: 0,
    data: new Date(),
    msg: {
      // Perchè scritto qui non funziona e mi tocca scriverlo sotto nei methods?
      // date: this.data.getHours() + ":" + this.data.getMinutes(),
      message: "",
      status: "sent",
    },
    autoMsg: {
      // Perchè scritto qui non funziona e mi tocca scriverlo sotto nei methods?
      // date: this.data.getHours() + ":" + this.data.getMinutes(),
      message: "Ok!",
      status: "received",
    },
    delayAnswer: 1 * 1000,
    isShown: false,
    search: "",
    obj: {},
  },
  methods: {
    newMessage(i) {
      if (this.msg.message.trim()) {
        // console.log(this.msg.message);
        // console.log(this.data.getHours());
        this.msg.message = this.msg.message.trim();
        this.contacts[i].messages.push({
          ...this.msg,
          date: `${this.data.getDate()}/${this.data.getMonth()}/${this.data.getFullYear()} 
          ${("0" + this.data.getHours()).slice(-2)}:${(
            "0" + this.data.getMinutes()
          ).slice(-2)}:${("0" + this.data.getSeconds()).slice(-2)}`,
        });
        this.msg.message = "";
      }
    },

    autoAnswerTimer(i) {
      setTimeout(() => this.autoAnswer(i), this.delayAnswer);
    },

    autoAnswer(i) {
      this.contacts[i].messages.push({
        ...this.autoMsg,
        date: `${this.data.getDate()}/${this.data.getMonth()}/${this.data.getFullYear()} 
        ${("0" + this.data.getHours()).slice(-2)}:${(
          "0" + this.data.getMinutes()
        ).slice(-2)}:${("0" + this.data.getSeconds()).slice(-2)}`,
      });
    },

    showDropDown() {
      this.isShown = !this.isShown;
    },

    searchFriend() {
      console.log(this.search);
      this.contacts.forEach((e, i) => {
        if (
          this.contacts[i].name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        ) {
          this.contacts[i].visible = true;
        } else {
          this.contacts[i].visible = false;
        }
      });
    },
  },
  created() {
    for (let i = 0; i < this.contacts.length; i++) {
      this.obj = this.contacts[i];
      // console.log(this.obj);
      for (let y = 0; y < this.obj.messages[this.obj.messages.length]; y++) {
        menuOpen = false;
      }
      console.log(this.obj.messages[this.obj.messages.length]);
    }
    // console.log(this.obj[this.obj.message.length].message);
  },
});

// Ciclo Brutto
// for (let i = 0; i < this.contacts.length; i++) {
//   if (
//     this.contacts[i].name
//       .toLowerCase()
//       .includes(this.search.toLowerCase())
//   ) {
//     this.contacts[i].visible = true;
//   } else {
//     this.contacts[i].visible = false;
//   }
// }
