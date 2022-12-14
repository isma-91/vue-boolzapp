/*
Milestone 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato 
*/

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
    // Active index per "sincronizzare i contatti quando selezionati"
    activeIndex: 0,
    // Date per mettere date e orari "reali" e aggiornati
    data: new Date(),
    //Oggetto msg per poi esploderlo e pusharlo nell'array dei messaggi con la chiave msg collegata al campo di testo del messaggio.
    msg: {
      // Perchè scritto qui non funziona e mi tocca scriverlo sotto nei methods?
      // date: this.data.getHours() + ":" + this.data.getMinutes(),
      message: "",
      status: "sent",
    },
    //Come sopra, ma messaggio automatico del computer con timer di 1 sec dopo il mio msg
    autoMsg: {
      // Perchè scritto qui non funziona e mi tocca scriverlo sotto nei methods?
      // date: this.data.getHours() + ":" + this.data.getMinutes(),
      message: "Ok!",
      status: "received",
    },
    // Tempo per il setTimeout
    delayAnswer: 1 * 1000,
    // Valore preso dall'input per la ricerca degli amici in friendlist
    search: "",
    // Oggetto vuoto per la prova di poushare lo status del dropdown dei messaggi
    // obj: {}, (not work)

    isWriting: false,
    needAnswer: true,
  },
  methods: {
    //Funzione della libreria Luxon per le date
    getTime() {
      return luxon.DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss");
    },

    //Metodo per prendere il messaggio scritto dall'utente reale nella textarea dei messaggi, creare un oggetto, esploderlo e pusharlo nell'array dei messaggi. Si passa come argomento l'indice preso dal ciclo nell'HTML, così da sarepre in quale iesimo contatto pushare il messaggio. Con cotrollo per verificare che non venga immessa una stringa vuota, se l'utente cerca di inviare un messaggio stringa vuota, il messaggio non verrà inviato e verrà cambiato il valore alla variabile "needAnswer" in false per far sì che non parta nemmeno la risposta automatica del computer.
    newMessage(i) {
      if (this.msg.message.trim() !== "") {
        // console.log(this.msg.message);
        // console.log(this.data.getHours());
        this.msg.message = this.msg.message.trim();
        this.contacts[i].messages.push({
          ...this.msg,
          date: this.getTime(),
          isDropdownShown: false,
        });
      } else {
        return (this.needAnswer = false);
      }
      this.msg.message = "";
    },
    //TODO: Sia qui nei nuovi messaggi che nella risposta automatica del computer ho dovuto mettere manualmente il "isDropdownShown: false" è così che va fatto per forza, o cè un modo "dinamico"?

    // SetTimeout per la risposta automatica del computer, sempre passare come argomento l'indice preso dall'HTML per sapere dove mandare il messaggio. Con controllo per verificare se l'altro ha effettivamente inviato un messaggio. Utilizzando una variabile impostata da noi di default su true, la facciamo cambiare in false, mel metodo sopra, se l'utente invia un messaggio stringa vuota, quindi se questa variabile è false parte il timer per la risposta automatica, altrimenti non parte nulla e risetta la variabile detta prima su true per i prossimi messaggi.
    autoAnswerTimer(i) {
      if (this.needAnswer === true) {
        setTimeout(() => this.autoAnswer(i), this.delayAnswer);
      } else {
        this.needAnswer = true;
      }
    },

    // Metodo molto simile al metodo sopra per pushare il messaggio dell'utente solo che stavolta il messaggio è statico, ma il funzionamento è il solito, passiamo poi questo metodo nel setTimeout per farlo apparire solo poco dopo l'invio di un nostro messaggio.
    autoAnswer(i) {
      this.contacts[i].messages.push({
        ...this.autoMsg,
        date: this.getTime(),
        isDropdownShown: false,
      });
    },

    //Metodo per la ricerca degli amici in friendlist tramite l'input text cicliamo l'array di oggetti contatti, mettendo tutti in minuscolo con il "toLowerCase", poi vediamo se il testo (le lettere) scritto nel search (preso dall'HTML con la chiave sopra nei data) è incluso nell'array di oggetti.name ovviamente e cambiamo la chiave visible che è all'interno dell'oggetto per poter poi assegnargli una classe dinamica nel HTML che lo fa mostrare o meno a seconda appunto del valore della chiave visible.
    searchFriend() {
      // console.log(this.search);
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

    // Metodo per cambiare lo stato della "variabile", in modo tale che ogni volta che clicco cambia da true e false
    showDropDown(msg) {
      msg.isDropdownShown = !msg.isDropdownShown;
    },

    // Metodo per cancellare il messaggio con il dropdown
    deleteMessage(item, i) {
      item.splice(i, 1);
    },

    // Metodo per far apparire la scritta "sto scrivendo mentre scriviamo qualcosa nella textarea, cambiando il valore della proprietà esressa nei data."
    showWriting() {
      if (this.msg.message !== "") {
        this.isWriting = true;
      } else {
        this.isWriting = false;
      }
    },
  },

  // Created per ciclare il dropdown ed assegnarlo ad ogni messaggio individualmente in maniera dinamica. Doppio ciclo innestato per entrare prima nel array di oggetti contacts e poi per entrare nei messages dei contacts dove vorremo mettere la nuova chiave valore
  created() {
    this.contacts.forEach((contact, i) => {
      // console.log(contact);
      contact.messages.forEach((message) => {
        Vue.set(message, "isDropdownShown", false);
      });
      // console.log(contact);
    });
  },
});

///////////////////////////////////////////////////////////////////////////////////
// APPUNTI / ALTERNATIVE

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

// Data brutta fatta a mano con JS
// `${this.data.getDate()}/${this.data.getMonth()}/${this.data.getFullYear()}
// ${("0" + this.data.getHours()).slice(-2)}:${(
//   "0" + this.data.getMinutes()
// ).slice(-2)}:${("0" + this.data.getSeconds()).slice(-2)}`,

// Data Bella base con JS
// date: new Date();
// date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
// '19/11/2022 10:25:41
