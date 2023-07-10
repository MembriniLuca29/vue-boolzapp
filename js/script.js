const { createApp } = Vue;
const { DateTime } = luxon;
createApp({
  data() {
    return {
        contacts: [
            {
            name: 'Michele',
            avatar: '../img/avatar_1.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Hai fatto',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'hai vomitato sudore e lacrime',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '10/01/2020 16:15:22',
            message: 'Tutto fatto!',
            showDropdown: false,
            status: 'received'
            }
            ],
            },
            {
            name: 'Fabio',
            avatar: '../img/avatar_2.jpg',
            visible: true,
            messages: [
            {
            date: '20/03/2020 16:30:00',
            message: 'Ciao come stai?',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '20/03/2020 16:30:55',
            message: 'Bene grazie! Stasera ci vediamo?',
            showDropdown: false,
            status: 'received'
            },
            {
            date: '20/03/2020 16:35:00',
            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
            showDropdown: false,
            status: 'sent'
            }
            ],
            },
            {
            name: 'Samuele',
            avatar: '../img/avatar_3.jpg',
            visible: true,
            messages: [
            {
            date: '28/03/2020 10:10:40',
            message: 'La Marianna va in campagna',
            showDropdown: false,
            status: 'received'
            },
            {
            date: '28/03/2020 10:20:10',
            message: 'Sicuro di non aver sbagliato chat?',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '28/03/2020 16:15:22',
            message: 'Ah scusa!',
            showDropdown: false,
            status: 'received'
            }
            ],
            },
            {
            name: 'Alessandro B.',
            avatar: '../img/avatar_4.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Lo sai che ha aperto una nuova pizzeria?',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Si, ma preferirei andare al cinema',
            showDropdown: false,
            status: 'received'
            }
            ],
            },
            {
            name: 'Alessandro L.',
            avatar: '../img/avatar_5.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ricordati di chiamare la nonna',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Va bene, stasera la sento',
            showDropdown: false,
            status: 'received'
            }
            ],
            },
            {
            name: 'Claudia',
            avatar: '../img/avatar_6.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao Claudia, hai novità?',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Non ancora',
            showDropdown: false,
            status: 'received'
            },
            {
            date: '10/01/2020 15:51:00',
            message: 'io credevo in te',
            showDropdown: false,
            status: 'sent'
            }
            ],
            },
            {
            name: 'Federico',
            avatar: '../img/avatar_7.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Fai gli auguri a Martina che è il suo compleanno!',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'Grazie per avermelo ricordato, le scrivo subito!',
            showDropdown: false,
            status: 'received'
            }
            ],
            },
            {
            name: 'Davide',
            avatar: '../img/avatar_8.jpg',
            visible: true,
            messages: [
            {
            date: '10/01/2020 15:30:55',
            message: 'Ciao, andiamo a mangiare la pizza stasera?',
            showDropdown: false,
            status: 'received'
            },
            {
            date: '10/01/2020 15:50:00',
            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
            showDropdown: false,
            status: 'sent'
            },
            {
            date: '10/01/2020 15:51:00',
            message: 'OK!!',
            showDropdown: false,
            status: 'received'
            }
            ],
            }
            ],
            selectedUser: null,
            newMessage: '' ,
            searchText: '' ,
            filteredContacts: [] 
    }
  },
  
  created() {
    if (this.contacts.length > 0) {
      this.selectedUser = this.contacts[0];
      this.filteredContacts = this.contacts;
    }
  },

  methods: {
    formatTime(dateTime) {
      const time = DateTime.fromFormat(dateTime, 'dd/MM/yyyy HH:mm:ss');
      return time.toFormat('HH:mm');
    },

    getLastMessage(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage ? lastMessage.message : '';
    },

    getLastMessageTime(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      if (lastMessage) {
        const dateTime = DateTime.fromFormat(lastMessage.date, 'dd/MM/yyyy HH:mm:ss');
        return dateTime.toFormat('HH:mm');
      }
      return '';
    },

    selectUser(user) {
      this.selectedUser = user;
    },

    sendMessage() {
      if (this.selectedUser && this.newMessage.trim() !== '') {
        const newMessageObj = {
          date: DateTime.local().toFormat('dd/MM/yyyy HH:mm:ss'),
          message: this.newMessage,
          status: 'sent',
          showDropdown: false
        };

        this.selectedUser.messages.push(newMessageObj);
        this.newMessage = '';

        setTimeout(() => {
          const autoReplyMessage = {
            date: DateTime.local().toFormat('dd/MM/yyyy HH:mm:ss'),
            message: 'Ok!',
            status: 'received',
            showDropdown: false
          };

          this.selectedUser.messages.push(autoReplyMessage);
        }, 1000);
      }
    },

    showDropdown(message) {
      this.selectedUser.messages.forEach(msg => {
        if (msg !== message) {
          msg.showDropdown = false;
        }
      });
      message.showDropdown = !message.showDropdown;

    if (message.showDropdown) {
      this.$nextTick(() => {
        document.addEventListener('click', this.hideDropdownOnClickOutside);
      });
    }
  },
  hideDropdownOnClickOutside(event) {
    const dropdownMenu = this.$refs.dropdownMenu;
    if (!dropdownMenu.contains(event.target)) {
      this.selectedUser.messages.forEach(msg => {
        msg.showDropdown = false;
      });
      document.removeEventListener('click', this.hideDropdownOnClickOutside);
    }
  },
  deleteMessage(message) {
    const messageIndex = this.selectedUser.messages.indexOf(message);
    if (messageIndex > -1) {
      this.selectedUser.messages.splice(messageIndex, 1);
    }
  },


    filterContacts(searchText) {
      if (searchText.trim() === '') {
        this.filteredContacts = this.contacts;
      } else {
        this.filteredContacts = this.contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    }
  },

  watch: {
    searchText(value) {
      this.filterContacts(value);
    }
  }

}).mount('#app');


